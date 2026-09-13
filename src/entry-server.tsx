import { StrictMode } from "react";
import { StaticRouter } from "react-router-dom";
import { prerenderToNodeStream } from "react-dom/static";
import { AppProviders, AppInner } from "./App";
import { getRouteMeta, type RouteMeta } from "./lib/routeMeta";

export { getIndexableRoutePaths } from "./lib/routeMeta";

/**
 * Server-only render entry, invoked by scripts/prerender.mjs against the SSR
 * bundle. Mirrors main.tsx's client tree exactly (same providers, same
 * AppInner) but swaps BrowserRouter (needs the browser `history` API) for
 * StaticRouter pinned to the URL being prerendered.
 *
 * prerenderToNodeStream (not renderToPipeableStream) is used deliberately: it
 * waits for all Suspense boundaries -- including every React.lazy() section on
 * the homepage -- to fully resolve before producing HTML, so the prerendered
 * output always contains complete, crawlable markup rather than fallbacks.
 */
export async function render(url: string): Promise<{ html: string; meta: RouteMeta }> {
  const pathname = url.split("?")[0].split("#")[0];

  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <AppProviders initialPath={pathname}>
        <StaticRouter location={url}>
          <AppInner />
        </StaticRouter>
      </AppProviders>
    </StrictMode>
  );

  let html = "";
  for await (const chunk of prelude) {
    html += typeof chunk === "string" ? chunk : Buffer.from(chunk).toString("utf-8");
  }

  return { html, meta: getRouteMeta(pathname) };
}
