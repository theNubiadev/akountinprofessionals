import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminPosts, type Post } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type Tab = "all" | "published" | "draft";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      const data = await adminPosts.list();
      setPosts(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  function toast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  }

  async function toggleStatus(post: Post) {
    const next = post.status === "published" ? "draft" : "published";
    try {
      const updated = await adminPosts.update(post.id, { status: next });
      setPosts((prev) => prev.map((p) => (p.id === post.id ? updated : p)));
      toast(next === "published" ? "Post published." : "Moved to drafts.");
    } catch (e) {
      toast((e as Error).message);
    }
  }

  async function handleDelete(id: string) {
    try {
      await adminPosts.delete(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setDeletingId(null);
      toast("Post deleted.");
    } catch (e) {
      toast((e as Error).message);
    }
  }

  async function handleLogout() {
    await logout();
    navigate("/admin/login");
  }

  const visible = posts
    .filter((p) => tab === "all" || p.status === tab)
    .filter(
      (p) =>
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );

  const counts = {
    all: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
    ai: posts.filter((p) => p.author === "ai").length,
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] flex flex-col">

      {/* ── Top nav ── */}
      <header className="bg-[#14213D] text-white px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-8">
          <div>
            <p className="text-[#C9A227] text-[10px] uppercase tracking-[0.15em] font-medium">
              Akountin Professionals
            </p>
            <p className="font-serif text-lg leading-tight">Blog Dashboard</p>
          </div>
          <nav className="hidden md:flex items-center gap-1">
         
         <Link to='/admin/dashboard'> 
            <span className="text-white/90 text-sm px-3 py-1.5 rounded bg-white/10">Posts</span>
         </Link>
            
            <Link
              to="/admin/posts/new"
              className="text-white/60 hover:text-white text-sm px-3 py-1.5 rounded transition-colors"
            >
              New post
            </Link>
            <Link
              to="/admin/generate"
              className="text-white/60 hover:text-white text-sm px-3 py-1.5 rounded transition-colors"
            >
              AI generate
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/50 text-sm hidden md:block">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="text-white/60 hover:text-white text-sm transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* ── Status strip ── */}
      <div className="bg-white border-b border-[#E3DFD6] px-6 md:px-12 py-3 flex items-center gap-6 text-sm overflow-x-auto">
        <Stat label="Total" value={counts.all} />
        <div className="w-px h-4 bg-[#E3DFD6] flex-shrink-0" />
        <Stat label="Published" value={counts.published} dot="bg-green-500" />
        <div className="w-px h-4 bg-[#E3DFD6] flex-shrink-0" />
        <Stat label="Drafts" value={counts.draft} dot="bg-[#C9A227]" />
        <div className="w-px h-4 bg-[#E3DFD6] flex-shrink-0" />
        <Stat label="AI-generated" value={counts.ai} dot="bg-violet-400" />
        <div className="flex-1" />
        <Link
          to="/admin/posts/new"
          className="flex-shrink-0 bg-[#C9A227] hover:bg-[#B8941F] text-[#14213D] text-xs font-semibold px-4 py-1.5 rounded-md transition-colors"
        >
          + New post
        </Link>
        <Link
          to="/admin/generate"
          className="flex-shrink-0 bg-[#14213D] hover:bg-[#1a2d54] text-white text-xs font-semibold px-4 py-1.5 rounded-md transition-colors"
        >
          AI generate
        </Link>
      </div>

      <main className="flex-1 px-6 md:px-12 py-8 max-w-6xl mx-auto w-full">

        {/* ── Tabs + search ── */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex border-b border-[#E3DFD6]">
            {(["all", "published", "draft"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2.5 text-sm capitalize border-b-2 -mb-px transition-colors ${
                  tab === t
                    ? "border-[#C9A227] text-[#14213D] font-medium"
                    : "border-transparent text-[#6B6B6B] hover:text-[#14213D]"
                }`}
              >
                {t === "all" ? "All posts" : t.charAt(0).toUpperCase() + t.slice(1)}
                <span className="ml-1.5 text-xs text-[#9C9384]">
                  ({t === "all" ? counts.all : counts[t]})
                </span>
              </button>
            ))}
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts…"
            className="md:ml-auto w-full md:w-64 px-3.5 py-2 border border-[#E3DFD6] rounded-lg text-sm bg-white placeholder:text-[#B0A99A] focus:outline-none focus:border-[#14213D] transition-colors"
          />
        </div>

        {/* ── Error / loading ── */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-[#14213D] border-t-[#C9A227] rounded-full animate-spin" />
          </div>
        )}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        {/* ── Post table ── */}
        {!loading && !error && (
          visible.length === 0 ? (
            <EmptyState tab={tab} search={search} />
          ) : (
            <div className="bg-white border border-[#E3DFD6] rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E3DFD6] text-left">
                    <th className="px-5 py-3 text-xs font-semibold text-[#9C9384] uppercase tracking-wide">Title</th>
                    <th className="px-5 py-3 text-xs font-semibold text-[#9C9384] uppercase tracking-wide hidden md:table-cell">Author</th>
                    <th className="px-5 py-3 text-xs font-semibold text-[#9C9384] uppercase tracking-wide hidden md:table-cell">Status</th>
                    <th className="px-5 py-3 text-xs font-semibold text-[#9C9384] uppercase tracking-wide hidden lg:table-cell">Date</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3DFD6]">
                  {visible.map((post) => (
                    <tr key={post.id} className="hover:bg-[#F8F6F1] group transition-colors">
                      <td className="px-5 py-4">
                        <Link
                          to={`/admin/posts/${post.id}`}
                          className="font-serif text-base text-[#14213D] hover:text-[#C9A227] transition-colors leading-snug block"
                        >
                          {post.title}
                        </Link>
                        {post.excerpt && (
                          <p className="text-xs text-[#9C9384] mt-0.5 line-clamp-1">{post.excerpt}</p>
                        )}
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {post.tags.slice(0, 3).map((t) => (
                            <span key={t} className="text-[10px] text-[#C9A227] font-semibold uppercase tracking-wide">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 ${
                              post.author === "ai" ? "bg-violet-500" : "bg-[#14213D]"
                            }`}
                          >
                            {post.author === "ai" ? "✦" : post.authorName.charAt(0)}
                          </span>
                          <span className="text-[#3A3A3A] text-xs">
                            {post.author === "ai" ? "AI Draft" : post.authorName}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                            post.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              post.status === "published" ? "bg-green-500" : "bg-amber-500"
                            }`}
                          />
                          {post.status === "published" ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell text-xs text-[#9C9384] whitespace-nowrap">
                        {formatDate(post.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            to={`/admin/posts/${post.id}`}
                            className="text-xs text-[#14213D] hover:text-[#C9A227] font-medium transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => toggleStatus(post)}
                            className="text-xs text-[#14213D] hover:text-[#C9A227] font-medium transition-colors"
                          >
                            {post.status === "published" ? "Unpublish" : "Publish"}
                          </button>
                          <button
                            onClick={() => setDeletingId(post.id)}
                            className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </main>

      {/* ── Delete confirm modal ── */}
      {deletingId && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={() => setDeletingId(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-7 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-serif text-xl text-[#14213D] mb-2">Delete this post?</h2>
            <p className="text-sm text-[#6B6B6B] mb-6">
              This is permanent and cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 border border-[#E3DFD6] rounded-lg text-sm text-[#14213D] hover:bg-[#F8F6F1] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#14213D] text-white text-sm px-5 py-3 rounded-xl shadow-xl animate-fade-in">
          {toastMsg}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, dot }: { label: string; value: number; dot?: string }) {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      {dot && <span className={`w-2 h-2 rounded-full ${dot}`} />}
      <span className="font-semibold text-[#14213D]">{value}</span>
      <span className="text-[#9C9384]">{label}</span>
    </div>
  );
}

function EmptyState({ tab, search }: { tab: Tab; search: string }) {
  return (
    <div className="text-center py-20">
      <p className="font-serif text-xl text-[#14213D] mb-2">
        {search ? "No posts match that search" : tab === "draft" ? "No drafts" : "No published posts"}
      </p>
      <p className="text-sm text-[#9C9384] mb-6">
        {search ? "Try a different keyword." : "Create one manually or generate with AI."}
      </p>
      <div className="flex justify-center gap-3">
        <Link
          to="/admin/posts/new"
          className="bg-[#C9A227] hover:bg-[#B8941F] text-[#14213D] text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          Write a post
        </Link>
        <Link
          to="/admin/generate"
          className="bg-[#14213D] hover:bg-[#1a2d54] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          AI generate
        </Link>
      </div>
    </div>
  );
}