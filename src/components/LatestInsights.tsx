import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicPosts, type Post } from "@/lib/api";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function LatestInsights() {
  const [posts,   setPosts]   = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicPosts
      .list()
      .then((all) => setPosts(all.slice(0, 3))) // only 3 latest
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Don't render the section at all if no posts
  if (!loading && posts.length === 0) return null;

  return (
    <section className="bg-[#F8F6F1] px-6 md:px-16 py-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-[#C9A227] text-xs uppercase tracking-[0.15em] font-semibold mb-3">
              Insights &amp; Guidance
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#14213D] leading-tight max-w-lg">
              Practical advice for UK business owners
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#14213D] hover:text-[#C9A227] transition-colors flex-shrink-0"
          >
            View all articles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-[#E3DFD6] rounded-xl p-6 animate-pulse">
                <div className="h-3 bg-[#E3DFD6] rounded w-1/3 mb-4" />
                <div className="h-5 bg-[#E3DFD6] rounded w-full mb-2" />
                <div className="h-5 bg-[#E3DFD6] rounded w-3/4 mb-4" />
                <div className="h-3 bg-[#E3DFD6] rounded w-full mb-2" />
                <div className="h-3 bg-[#E3DFD6] rounded w-5/6 mb-2" />
                <div className="h-3 bg-[#E3DFD6] rounded w-4/6" />
              </div>
            ))}
          </div>
        )}

        {/* Posts grid */}
        {!loading && (
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post, idx) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block group"
              >
                <article className={`bg-white border border-[#E3DFD6] rounded-xl p-7 h-full flex flex-col hover:shadow-lg hover:border-[#C9A227]/40 transition-all duration-200 ${idx === 0 ? "md:col-span-1" : ""}`}>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-[0.12em] text-[#C9A227] font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl text-[#14213D] leading-snug group-hover:text-[#C9A227] transition-colors flex-1 mb-3">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-[#6B6B6B] leading-relaxed line-clamp-2 mb-6">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#E3DFD6]">
                    <div className="flex items-center gap-2">
                      {/* Author avatar */}
                      <div className="w-7 h-7 rounded-full bg-[#14213D] text-white text-xs font-serif flex items-center justify-center flex-shrink-0">
                        {post.authorName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#14213D]">{post.authorName}</p>
                        <p className="text-[10px] text-[#9C9384]">{formatDate(post.createdAt)}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#9C9384]">{post.readingMinutes} min read</span>
                  </div>

                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className="inline-block border border-[#14213D] text-[#14213D] hover:bg-[#14213D] hover:text-white text-sm font-medium px-8 py-3 rounded-lg transition-colors"
          >
            Browse all articles
          </Link>
        </div>

      </div>
    </section>
  );
}