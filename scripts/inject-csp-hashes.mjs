// Computes CSP sha256 hashes for every inline <script> in the final prerendered
// output and injects them into script-src in dist/_headers, replacing the
// placeholder base value from public/_headers.
//
// This project's prerender pipeline (React 19 streaming SSR, see
// scripts/prerender.mjs) bakes small `$RC("B:n","S:n")` Suspense-boundary-
// completion scripts directly into each route's static HTML. Their count and
// exact content depends on how many Suspense boundaries exist on that specific
// page, which shifts with ordinary component edits -- a hand-maintained hash
// list would silently go stale. Computing hashes here, from the actual final
// build output, on every build, keeps script-src accurate automatically instead.
//
// <script type="application/ld+json"> blocks are intentionally excluded: browsers
// never execute non-JS-typed <script> elements, so CSP's script-src does not
// gate them (confirmed empirically -- zero CSP violations for JSON-LD under a
// hash-only script-src with no 'unsafe-inline').
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";

const distDir = join(process.cwd(), "dist");
const headersPath = join(distDir, "_headers");

function findHtmlFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) results.push(...findHtmlFiles(full));
    else if (entry.endsWith(".html")) results.push(full);
  }
  return results;
}

const scriptTagRe = /<script([^>]*)>([\s\S]*?)<\/script>/g;

function collectInlineScriptHashes() {
  const hashes = new Set();
  for (const file of findHtmlFiles(distDir)) {
    const html = readFileSync(file, "utf-8");
    let m;
    scriptTagRe.lastIndex = 0;
    while ((m = scriptTagRe.exec(html))) {
      const [, attrs, body] = m;
      if (/\bsrc\s*=/.test(attrs)) continue; // external script, not inline
      if (/type\s*=\s*["']application\/ld\+json["']/i.test(attrs)) continue; // not executable
      if (body.trim() === "") continue;
      const digest = createHash("sha256").update(body, "utf8").digest("base64");
      hashes.add(`'sha256-${digest}'`);
    }
  }
  return [...hashes].sort();
}

const hashes = collectInlineScriptHashes();
if (hashes.length === 0) {
  throw new Error("inject-csp-hashes: found zero inline scripts across dist/**/*.html -- expected at least the consent-mode stub. Aborting build rather than shipping a possibly-broken CSP.");
}

const headersLines = readFileSync(headersPath, "utf-8").split("\n");

// Match only the real HTTP header line (starts with whitespace + the header
// name), not any mention of the placeholder text inside comments -- this
// script's own explanatory comment in public/_headers quotes the placeholder
// verbatim for documentation, which a naive whole-file string replace would
// match instead of the real line since it appears earlier in the file.
const scriptSrcPlaceholder = `script-src 'self' https://www.googletagmanager.com;`;
const headerLineIndex = headersLines.findIndex((line) => /^\s*Content-Security-Policy:/.test(line));
if (headerLineIndex === -1) {
  throw new Error("inject-csp-hashes: no line starting with 'Content-Security-Policy:' found in dist/_headers.");
}
if (!headersLines[headerLineIndex].includes(scriptSrcPlaceholder)) {
  throw new Error(
    `inject-csp-hashes: expected the Content-Security-Policy line to contain the exact placeholder\n  ${scriptSrcPlaceholder}\nbut it did not. ` +
    `The CSP's script-src directive in public/_headers may have changed shape -- update this script to match before building, rather than silently injecting hashes into the wrong place.`
  );
}

const scriptSrcReplacement = `script-src 'self' ${hashes.join(" ")} https://www.googletagmanager.com;`;
headersLines[headerLineIndex] = headersLines[headerLineIndex].replace(scriptSrcPlaceholder, scriptSrcReplacement);

writeFileSync(headersPath, headersLines.join("\n"));
console.log(`Injected ${hashes.length} CSP script-src hash(es) into dist/_headers`);
