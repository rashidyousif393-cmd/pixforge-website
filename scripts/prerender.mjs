// Runs after the client (`vite build`) and SSR (`vite build --ssr`) builds.
// Renders every indexable route to static HTML using the SSR bundle, merges
// route-specific <head> metadata into the client build's index.html template,
// and writes the result as dist/<route>/index.html (dist/index.html for "/").
// A pristine, unmodified copy of the template is also saved as
// dist/app-shell.html -- the Netlify SPA fallback for routes that were never
// prerendered (e.g. a genuinely unknown URL).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(rootDir, "dist");
const serverEntry = join(rootDir, "dist-server", "entry-server.js");

const SITE_URL = "https://pixforge.ch";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function replaceOrThrow(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`prerender: could not find "${label}" in the index.html template`);
  }
  return html.replace(pattern, replacement);
}

// This route's own declared language: every route is Italian except "/en".
// Derived from canonicalPath rather than passed separately so applyRouteMeta's
// signature (and every call site) stays unchanged.
function htmlLangFor(meta) {
  return meta.canonicalPath === "/en" ? "en" : "it";
}

// Fills the HREFLANG_PLACEHOLDER marker in index.html with this route's
// reciprocal <link rel="alternate"> tags, from routeMeta.ts's `hreflang`
// field. Left empty on routes with no second-language URL to point to,
// rather than pointing hreflang at content that doesn't exist.
function hreflangLinksFor(meta) {
  if (!meta.hreflang) return "";
  return Object.entries(meta.hreflang)
    .map(([hreflang, href]) => `<link rel="alternate" hreflang="${escapeHtml(hreflang)}" href="${escapeHtml(href)}" />`)
    .join("\n    ");
}

function applyRouteMeta(templateHtml, meta) {
  const canonicalUrl = `${SITE_URL}${meta.canonicalPath}`;
  let html = templateHtml;

  html = replaceOrThrow(html, /<html lang="[^"]*"/, `<html lang="${htmlLangFor(meta)}"`, "html lang attribute");
  html = replaceOrThrow(
    html,
    /<!-- HREFLANG_PLACEHOLDER -->/,
    hreflangLinksFor(meta),
    "HREFLANG_PLACEHOLDER"
  );

  html = replaceOrThrow(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`, "title");
  html = replaceOrThrow(
    html,
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    "meta description"
  );
  html = replaceOrThrow(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
    "canonical link"
  );
  html = replaceOrThrow(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    "og:url"
  );
  html = replaceOrThrow(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    "og:title"
  );
  html = replaceOrThrow(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    "og:description"
  );
  html = replaceOrThrow(
    html,
    /<meta name="twitter:url" content="[^"]*"\s*\/>/,
    `<meta name="twitter:url" content="${escapeHtml(canonicalUrl)}" />`,
    "twitter:url"
  );
  html = replaceOrThrow(
    html,
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    "twitter:title"
  );
  html = replaceOrThrow(
    html,
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    "twitter:description"
  );

  const jsonLdPattern = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;
  html = replaceOrThrow(
    html,
    jsonLdPattern,
    meta.jsonLd
      ? `<script type="application/ld+json">\n${JSON.stringify(meta.jsonLd)}\n</script>`
      : "",
    "JSON-LD script"
  );

  return html;
}

function injectBody(templateHtml, bodyHtml) {
  return replaceOrThrow(
    templateHtml,
    /<div id="root"><\/div>/,
    `<div id="root">${bodyHtml}</div>`,
    '<div id="root"></div>'
  );
}

function outputPathFor(routePath) {
  if (routePath === "/") return join(distDir, "index.html");
  return join(distDir, routePath.replace(/^\//, ""), "index.html");
}

async function main() {
  if (!existsSync(serverEntry)) {
    throw new Error(`prerender: SSR bundle not found at ${serverEntry}. Run the SSR build first.`);
  }

  const templatePath = join(distDir, "index.html");
  const template = readFileSync(templatePath, "utf-8");

  // Pristine SPA fallback -- served by Netlify for any route that wasn't
  // prerendered. noindex so it's never itself picked up by crawlers; every
  // real, indexable URL is served by its own prerendered index.html instead.
  const appShell = replaceOrThrow(
    template,
    /<meta name="viewport"[^>]*\/>/,
    (match) => `${match}\n    <meta name="robots" content="noindex" />`,
    "viewport meta (app-shell noindex insertion point)"
  );
  writeFileSync(join(distDir, "app-shell.html"), appShell);

  const { render, getIndexableRoutePaths } = await import(pathToFileURL(serverEntry).href);
  const routes = getIndexableRoutePaths();

  const results = [];
  for (const routePath of routes) {
    const { html: bodyHtml, meta } = await render(routePath);
    const withMeta = applyRouteMeta(template, meta);
    const finalHtml = injectBody(withMeta, bodyHtml);

    const outPath = outputPathFor(routePath);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, finalHtml);
    results.push({ routePath, outPath });
  }

  console.log(`Prerendered ${results.length} route(s):`);
  for (const { routePath, outPath } of results) {
    console.log(`  ${routePath} -> ${outPath.replace(rootDir + "/", "")}`);
  }
  console.log(`Wrote SPA fallback -> dist/app-shell.html`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
