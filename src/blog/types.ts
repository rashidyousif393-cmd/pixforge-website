export interface BlogPostMeta {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  author: string;
  /**
   * Optional fields for a real named author (job title, short bio, headshot
   * URL). Every current post leaves these unset and keeps `author: "PixelForge"`
   * as-is -- no person or credentials have been invented. When a real author is
   * assigned to a post, filling in `authorTitle` is enough to make
   * routeMeta.ts's JSON-LD switch that post's `author` from
   * `{"@type": "Organization"}` to `{"@type": "Person", jobTitle: ...}`.
   */
  authorTitle?: string;
  authorBio?: string;
  authorImage?: string;
  publishedDate: string;
  updatedDate: string;
  readingTime: string;
  coverImage: string;
  coverImageAlt: string;
  ctaHeading?: string;
}
