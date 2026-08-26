import { useParams, Navigate } from "react-router-dom";
import { getPostBySlug } from "../blog";
import BlogArticle from "../components/BlogArticle";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { getRouteMeta } from "../lib/routeMeta";

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useDocumentHead(getRouteMeta(post ? `/blog/${post.meta.slug}` : "/blog"));

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const { meta, Content } = post;

  return (
    <BlogArticle meta={meta}>
      <Content />
    </BlogArticle>
  );
}
