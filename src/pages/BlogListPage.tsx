import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { getAllPosts } from "../blog";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { getRouteMeta } from "../lib/routeMeta";

export default function BlogListPage() {
  const posts = getAllPosts();

  useDocumentHead(getRouteMeta("/blog"));

  return (
    <main className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden min-h-screen">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full radial-glow-blue opacity-[0.08] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full radial-glow-gold opacity-[0.08] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800/80 text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
            Blog PixelForge
          </div>
          <h1
            className="font-display font-extrabold text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 1rem + 3vw, 3.5rem)" }}
          >
            Guide e consigli sul <span className="text-gradient-gold">mondo digitale</span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Approfondimenti pratici su siti web, prezzi, SEO e strategie digitali per le aziende del
            Ticino.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.meta.slug}
              to={`/blog/${post.meta.slug}`}
              className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-gold-500/30 transition-all duration-500 flex flex-col"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <img
                  src={post.meta.coverImage}
                  alt={post.meta.coverImageAlt}
                  loading="lazy"
                  width={600}
                  height={375}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="font-display font-bold text-lg text-white leading-snug mb-3 group-hover:text-gold-500 transition-colors">
                  {post.meta.title}
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4 flex-1">{post.meta.excerpt}</p>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-4 border-t border-zinc-900">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(`${post.meta.publishedDate}T00:00:00`).toLocaleDateString("it-CH", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.meta.readingTime}
                  </span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-gold-500 font-semibold text-sm group-hover:gap-2.5 transition-all">
                  Leggi l'articolo <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
