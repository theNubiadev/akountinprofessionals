import { useEffect, useState, useCallback, type ChangeEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { adminPosts, type Post, type PostPayload } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function wordCount(s: string) {
  return s.trim() ? s.trim().split(/\s+/).length : 0;
}

function readingMins(s: string) {
  return Math.max(1, Math.round(wordCount(s) / 200));
}

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string;          // comma-separated while editing
  authorName: string;
  metaDescription: string;
  status: "draft" | "published";
}

const EMPTY: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  tags: "",
  authorName: "",
  metaDescription: "",
  status: "draft",
};

export default function PostEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [slugManual, setSlugManual] = useState(false); // user has hand-edited slug

  // ── Load existing post 
  useEffect(() => {
    if (isNew) {
      setForm({ ...EMPTY, authorName: user?.name ?? "" });
      return;
    }
    adminPosts
      .list()
      .then((posts) => {
        const post = posts.find((p) => p.id === id);
        if (!post) { navigate("/admin", { replace: true }); return; }
        setForm({
          title:           post.title,
          slug:            post.slug,
          excerpt:         post.excerpt,
          content:         post.content,
          tags:            post.tags.join(", "),
          authorName:      post.authorName,
          metaDescription: post.metaDescription,
          status:          post.status,
        });
        setSlugManual(true); // don't auto-rewrite slug on edit
      })
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, [id, isNew, navigate, user]);

  function set(field: keyof FormState) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  // Auto-generate slug from title on new posts
  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: slugManual ? prev.slug : slugify(title),
    }));
  }

  function toast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  }

  // ── Save 
  async function save(statusOverride?: "draft" | "published") {
    const status = statusOverride ?? form.status;
    setError("");
    setSaving(true);

    const payload: PostPayload = {
      title:           form.title.trim(),
      slug:            form.slug.trim(),
      excerpt:         form.excerpt.trim(),
      content:         form.content.trim(),
      tags:            form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      authorName:      form.authorName.trim() || (user?.name ?? "Akountin Professionals"),
      metaDescription: form.metaDescription.trim(),
      status,
    };

    if (!payload.title || !payload.slug || !payload.content) {
      setError("Title, slug and content are required.");
      setSaving(false);
      return;
    }

    try {
      if (isNew) {
        const created = await adminPosts.create(payload);
        toast(status === "published" ? "Post published!" : "Draft saved.");
        navigate(`/admin/posts/${created.id}`, { replace: true });
      } else {
        await adminPosts.update(id!, payload);
        setForm((prev) => ({ ...prev, status }));
        toast(status === "published" ? "Post published!" : "Saved as draft.");
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Shell>
        <div className="flex justify-center py-32">
          <div className="w-6 h-6 border-2 border-[#14213D] border-t-[#C9A227] rounded-full animate-spin" />
        </div>
      </Shell>
    );
  }

  const wc   = wordCount(form.content);
  const mins = readingMins(form.content);
  const metaLen = form.metaDescription.length;

  return (
    <Shell>
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            to="/admin"
            className="text-xs text-[#9C9384] hover:text-[#14213D] transition-colors inline-flex items-center gap-1 mb-1"
          >
            ← All posts
          </Link>
          <h1 className="font-serif text-2xl text-[#14213D]">
            {isNew ? "New post" : "Edit post"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {!isNew && (
            <a
              href={`/blog/${form.slug}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#9C9384] hover:text-[#14213D] transition-colors hidden md:block"
            >
              Preview ↗
            </a>
          )}
          <button
            onClick={() => save("draft")}
            disabled={saving}
            className="px-4 py-2 border border-[#E3DFD6] rounded-lg text-sm text-[#14213D] hover:bg-[#F8F6F1] disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving…" : "Save draft"}
          </button>
          <button
            onClick={() => save("published")}
            disabled={saving}
            className="px-4 py-2 bg-[#C9A227] hover:bg-[#B8941F] disabled:opacity-50 text-[#14213D] font-semibold text-sm rounded-lg transition-colors"
          >
            {saving ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>

      {error && (
        <p className="mb-5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

        {/* ── Main column ── */}
        <div className="space-y-5">

          {/* Title */}
          <div className="bg-white border border-[#E3DFD6] rounded-xl p-6">
            <label className="field-label">Title</label>
            <input
              value={form.title}
              onChange={handleTitleChange}
              placeholder="Post title"
              className="field-input font-serif text-xl mt-1"
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white border border-[#E3DFD6] rounded-xl p-6">
            <label className="field-label">Excerpt</label>
            <p className="text-xs text-[#9C9384] mb-2">
              Shown on the blog listing and shared in previews.
            </p>
            <textarea
              value={form.excerpt}
              onChange={set("excerpt")}
              placeholder="One or two sentences summarising the post…"
              rows={2}
              className="field-input resize-none"
            />
          </div>

          {/* Content */}
          <div className="bg-white border border-[#E3DFD6] rounded-xl p-6">
            <div className="flex items-center justify-between mb-1">
              <label className="field-label">Content</label>
              <span className="text-xs text-[#9C9384]">
                {wc.toLocaleString()} words · {mins} min read
              </span>
            </div>
            <p className="text-xs text-[#9C9384] mb-3">
              Use <code className="bg-[#F8F6F1] px-1 rounded">**Bold text**</code> for section headings. Separate paragraphs with a blank line.
            </p>
            <textarea
              value={form.content}
              onChange={set("content")}
              placeholder="Write your post here…"
              rows={22}
              className="field-input resize-y font-serif leading-relaxed"
            />
          </div>

        </div>

        {/* ── Sidebar column ── */}
        <div className="space-y-5">

          {/* Status */}
          <div className="bg-white border border-[#E3DFD6] rounded-xl p-5">
            <label className="field-label mb-3 block">Status</label>
            <div className="flex gap-2">
              {(["draft", "published"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setForm((p) => ({ ...p, status: s }))}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors capitalize ${
                    form.status === s
                      ? s === "published"
                        ? "bg-green-600 border-green-600 text-white"
                        : "bg-[#14213D] border-[#14213D] text-white"
                      : "bg-[#F8F6F1] border-[#E3DFD6] text-[#6B6B6B] hover:border-[#14213D]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Slug */}
          <div className="bg-white border border-[#E3DFD6] rounded-xl p-5">
            <label className="field-label">URL slug</label>
            <p className="text-xs text-[#9C9384] mb-2">
              /blog/<span className="font-mono text-[#14213D]">{form.slug || "your-post-slug"}</span>
            </p>
            <input
              value={form.slug}
              onChange={(e) => {
                setSlugManual(true);
                set("slug")(e);
              }}
              placeholder="url-friendly-slug"
              className="field-input font-mono text-xs"
            />
          </div>

          {/* Author */}
          <div className="bg-white border border-[#E3DFD6] rounded-xl p-5">
            <label className="field-label">Author name</label>
            <input
              value={form.authorName}
              onChange={set("authorName")}
              placeholder="e.g. Sarah Williams"
              className="field-input mt-1"
            />
          </div>

          {/* Tags */}
          <div className="bg-white border border-[#E3DFD6] rounded-xl p-5">
            <label className="field-label">Topics / tags</label>
            <p className="text-xs text-[#9C9384] mb-2">Comma-separated</p>
            <input
              value={form.tags}
              onChange={set("tags")}
              placeholder="Self Assessment, HMRC, Tax Planning"
              className="field-input"
            />
            {form.tags && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {form.tags.split(",").map((t) => t.trim()).filter(Boolean).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] uppercase tracking-wide text-[#C9A227] font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Meta description */}
          <div className="bg-white border border-[#E3DFD6] rounded-xl p-5">
            <div className="flex items-center justify-between mb-1">
              <label className="field-label">Meta description</label>
              <span className={`text-xs ${metaLen > 160 ? "text-red-500" : "text-[#9C9384]"}`}>
                {metaLen}/160
              </span>
            </div>
            <textarea
              value={form.metaDescription}
              onChange={set("metaDescription")}
              placeholder="SEO description shown in search results…"
              maxLength={165}
              rows={3}
              className="field-input resize-none text-xs"
            />
          </div>

          {/* Bottom save buttons (repeated for convenience) */}
          <div className="flex gap-3">
            <button
              onClick={() => save("draft")}
              disabled={saving}
              className="flex-1 py-2.5 border border-[#E3DFD6] rounded-lg text-sm text-[#14213D] hover:bg-[#F8F6F1] disabled:opacity-50 transition-colors"
            >
              Save draft
            </button>
            <button
              onClick={() => save("published")}
              disabled={saving}
              className="flex-1 py-2.5 bg-[#C9A227] hover:bg-[#B8941F] text-[#14213D] font-semibold text-sm rounded-lg disabled:opacity-50 transition-colors"
            >
              Publish
            </button>
          </div>

        </div>
      </div>

      {/* ── Toast ── */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#14213D] text-white text-sm px-5 py-3 rounded-xl shadow-xl">
          {toastMsg}
        </div>
      )}
    </Shell>
  );
}

// ── Shared shell (matches Dashboard nav) ──────────────────────────────────────
function Shell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F6F1] flex flex-col">
      <header className="bg-[#14213D] text-white px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-8">
          <div>
            <p className="text-[#C9A227] text-[10px] uppercase tracking-[0.15em] font-medium">
              Akountin Professionals
            </p>
            <p className="font-serif text-lg leading-tight">Blog Dashboard</p>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/admin"
              className="text-white/60 hover:text-white text-sm px-3 py-1.5 rounded transition-colors"
            >
              Posts
            </Link>
            <span className="text-white/90 text-sm px-3 py-1.5 rounded bg-white/10">Editor</span>
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
            onClick={async () => { await logout(); navigate("/admin/login"); }}
            className="text-white/60 hover:text-white text-sm transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 md:px-12 py-8 max-w-5xl mx-auto w-full">
        {children}
      </main>

      <style>{`
        .field-label  { display: block; font-size: 11px; font-weight: 600; color: #6B6B6B; text-transform: uppercase; letter-spacing: 0.07em; }
        .field-input  { display: block; width: 100%; padding: 9px 12px; border: 1px solid #E3DFD6; border-radius: 8px; font-size: 14px; font-family: inherit; background: #F8F6F1; color: #14213D; outline: none; transition: border-color .15s; }
        .field-input:focus { border-color: #14213D; background: #fff; }
        .field-input::placeholder { color: #B0A99A; }
      `}</style>
    </div>
  );
}