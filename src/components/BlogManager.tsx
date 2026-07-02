import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/ApiConfig";

export default function BlogManager({ refreshKey }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedSlug, setSelectedSlug] = useState(null);

  useEffect(() => {
    loadPosts();
  }, [refreshKey]);

  async function loadPosts() {
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest("/blog");
      setPosts(Array.isArray(data) ? data : data.posts || []);
    } catch (err) {
      setError(err.message || "Couldn't load posts.");
    } finally {
      setLoading(false);
    }
  }

  const filtered = posts.filter((post) => {
    const haystack = `${post.title} ${post.authorName || ""} ${(post.tags || []).join(" ")}`.toLowerCase();
    return haystack.includes(search.toLowerCase());
  });

  const selectedPost = posts.find((p) => p.slug === selectedSlug);

  if (selectedPost) {
    return <PostDetail post={selectedPost} onBack={() => setSelectedSlug(null)} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl text-[#14213D]">All posts</h2>
          <p className="text-sm text-[#6B6B6B] mt-1">
            {loading ? "Loading…" : `${filtered.length} post${filtered.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, author, or tag"
          className="w-64 rounded-md border border-[#E3DFD6] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 focus:border-[#C9A227]"
        />
      </div>

      {error && (
        <div className="text-sm text-[#B3261E] bg-[#B3261E]/5 border border-[#B3261E]/20 rounded-md px-3 py-2 mb-4 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={loadPosts} className="underline">
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-[#E3DFD6]/40 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-[#E3DFD6] rounded-lg">
          <p className="text-[#6B6B6B] text-sm">
            {posts.length === 0
              ? "Nothing published yet. Posts you create will show up here."
              : "No posts match that search."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((post) => (
            <button
              key={post.slug}
              onClick={() => setSelectedSlug(post.slug)}
              className="w-full text-left bg-white border border-[#E3DFD6] rounded-lg p-5 hover:border-[#C9A227] hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg text-[#14213D] truncate">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-sm text-[#6B6B6B] mt-1 line-clamp-2">{post.excerpt}</p>
                  )}
                  <div className="flex items-center gap-3 mt-3 text-xs text-[#9C9384]">
                    <span>{post.authorName || "Unknown author"}</span>
                    {post.createdAt && (
                      <>
                        <span>·</span>
                        <span>{formatDate(post.createdAt)}</span>
                      </>
                    )}
                  </div>
                </div>
                {post.tags?.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap justify-end max-w-[180px]">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] uppercase tracking-wide text-[#C9A227] font-medium whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PostDetail({ post, onBack }) {
  return (
    <div>
      <button
        onClick={onBack}
        className="text-sm text-[#6B6B6B] hover:text-[#14213D] mb-6 inline-flex items-center gap-1"
      >
        ← Back to all posts
      </button>
      <article className="bg-white border border-[#E3DFD6] rounded-lg shadow-sm p-8 max-w-3xl">
        {post.tags?.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] uppercase tracking-wide text-[#C9A227] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h1 className="font-serif text-3xl text-[#14213D] leading-tight">{post.title}</h1>
        <p className="text-sm text-[#9C9384] mt-3">
          By {post.authorName || "Unknown author"}
          {post.createdAt && <> · {formatDate(post.createdAt)}</>}
        </p>
        {post.excerpt && (
          <p className="text-[#5A5A5A] mt-5 text-base italic border-l-2 border-[#C9A227] pl-4">
            {post.excerpt}
          </p>
        )}
        <div className="mt-6 text-[#3A3A3A] text-[15px] leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
        {post.metaDescription && (
          <div className="mt-8 pt-5 border-t border-[#E3DFD6]">
            <p className="text-xs uppercase tracking-wide text-[#9C9384] mb-1">
              Meta description
            </p>
            <p className="text-sm text-[#6B6B6B]">{post.metaDescription}</p>
          </div>
        )}
      </article>
    </div>
  );
}

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}