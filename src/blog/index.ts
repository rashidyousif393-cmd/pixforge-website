import type { ComponentType } from "react";
import type { BlogPostMeta } from "./types";
import { meta as costoSitoWebTicino2026Meta, default as CostoSitoWebTicino2026Content } from "./posts/costo-sito-web-ticino-2026";
import { meta as comeScegliereWebAgencyTicinoMeta, default as ComeScegliereWebAgencyTicinoContent } from "./posts/come-scegliere-web-agency-ticino";
import { meta as seoLocaleTicinoMeta, default as SeoLocaleTicinoContent } from "./posts/seo-locale-ticino";
import { meta as setteErroriSitoWebAziendaleMeta, default as SetteErroriSitoWebAziendaleContent } from "./posts/7-errori-sito-web-aziendale";
import { meta as sitoWebLentoMeta, default as SitoWebLentoContent } from "./posts/sito-web-lento-velocita-seo-conversioni";
import { meta as aumentareConversioniMeta, default as AumentareConversioniContent } from "./posts/aumentare-conversioni-sito-web-ticino";

export interface BlogPostEntry {
  meta: BlogPostMeta;
  Content: ComponentType;
}

const blogPosts: BlogPostEntry[] = [
  { meta: costoSitoWebTicino2026Meta, Content: CostoSitoWebTicino2026Content },
  { meta: comeScegliereWebAgencyTicinoMeta, Content: ComeScegliereWebAgencyTicinoContent },
  { meta: seoLocaleTicinoMeta, Content: SeoLocaleTicinoContent },
  { meta: setteErroriSitoWebAziendaleMeta, Content: SetteErroriSitoWebAziendaleContent },
  { meta: sitoWebLentoMeta, Content: SitoWebLentoContent },
  { meta: aumentareConversioniMeta, Content: AumentareConversioniContent },
];

export function getAllPosts(): BlogPostEntry[] {
  return [...blogPosts].sort((a, b) => (a.meta.publishedDate < b.meta.publishedDate ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPostEntry | undefined {
  return blogPosts.find((post) => post.meta.slug === slug);
}
