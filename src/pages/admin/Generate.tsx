import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ai, adminPosts, type GeneratedDraft } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

type Tone = "professional" | "friendly" | "educational" | "concise";

const TONE_LABELS: Record<Tone, string> = {
  professional: "Professional",
  friendly:     "Friendly & approachable",
  educational:  "Educational",
  concise:      "Concise & direct",
};

const GENERATING_STEPS = [
  "Asking Claude to write your post…",
  "Drafting the introduction…",
  "Structuring key accounting points…",
  "Reviewing for UK-specific accuracy…",
  "Polishing the final draft…",
];

export default function GeneratePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Form
  const [topic,    setTopic]    = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone,     setTone]     = useState<Tone>("professional");

  // State machine: idle → generating → review
  const [phase,   setPhase]   = useState<"idle" | "generating" | "review">("idle");
  const [stepIdx, setStepIdx] = useState(0);
  const [draft,   setDraft]   = useState<GeneratedDraft | null>(null);
  const [error,   setError]   = useState("");

  // Editable review fields
  const [editTitle,   setEditTitle]   = useState("");
  const [editExcerpt, setEditExcerpt] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editTags,    setEditTags]    = useState("");
  const [editMeta,    setEditMeta]    = useState("");
  const [editAuthor,  setEditAuthor]  = useState("");

  const [saving,   setSaving]   = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  function toast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  }

  // ── Generate ────────────────────────────────────────────────────────────────
  async function generate() {
    if (!topic.trim()) { setError("Please enter a topic."); return; }
    setError("");
    setPhase("generating");
    setStepIdx(0);

    // Cycle through step labels while waiting
    const ticker = setInterval(() => {
      setStepIdx((i) => (i + 1) % GENERATING_STEPS.length);
    }, 2000);

    try {
      const kws = keywords.split(",").map((k) => k.trim()).filter(Boolean);
      const result = await ai.generate(topic, kws, tone);

      setDraft(result);
      setEditTitle(result.title);
      setEditExcerpt(result.excerpt);
      setEditContent(result.content);
      setEditTags(result.tags.join(", "));
      setEditMeta(result.metaDescription);
      setEditAuthor(user?.name ?? "Akountin Professionals");
      setPhase("review");
    } catch (e) {
      setError((e as Error).message || "Generation failed.");
      setPhase("idle");
    } finally {
      clearInterval(ticker);
    }
  }

  // ── Save helpers ────────────────────────────────────────────────────────────
  async function savePost(status: "draft" | "published") {
    if (!draft) return;
    setSaving(true);
    try {
      await adminPosts.create({
        title:           editTitle.trim(),
        slug:            draft.slug,
        excerpt:         editExcerpt.trim(),
        content:         editContent.trim(),
        tags:            editTags.split(",").map((t) => t.trim()).filter(Boolean),
        metaDescription: editMeta.trim(),
        authorName:      editAuthor.trim() || "AI Assistant",
        author:          "ai" as const,
        status,
      });
      toast(status === "published" ? "Post published!" : "Draft saved — you can edit it in Posts.");
      setTimeout(() => navigate("/admin"), 1200);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function discard() {
    setDraft(null);
    setPhase("idle");
    setTopic("");
    setKeywords("");
  }

  return (
    <div className="min-h-screen bg-[#F8F6F1] flex flex-col">
      {/* ── Nav ── */}
      <header className="bg-[#14213D] text-white px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-8">
          <div>
            <p className="text-[#C9A227] text-[10px] uppercase tracking-[0.15em] font-medium">
              Akountin Professionals
            </p>
            <p className="font-serif text-lg leading-tight">Blog Dashboard</p>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/admin" className="text-white/60 hover:text-white text-sm px-3 py-1.5 rounded transition-colors">Posts</Link>
            <Link to="/admin/posts/new" className="text-white/60 hover:text-white text-sm px-3 py-1.5 rounded transition-colors">New post</Link>
            <span className="text-white/90 text-sm px-3 py-1.5 rounded bg-white/10">AI generate</span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/50 text-sm hidden md:block">{user?.name}</span>
          <button onClick={async () => { await logout(); navigate("/admin/login"); }} className="text-white/60 hover:text-white text-sm transition-colors">Sign out</button>
        </div>
      </header>

      <main className="flex-1 px-6 md:px-12 py-10 max-w-4xl mx-auto w-full">

        {/* ── Page title ── */}
        <div className="mb-8">
          <Link to="/admin" className="text-xs text-[#9C9384] hover:text-[#14213D] transition-colors inline-flex items-center gap-1 mb-1">← All posts</Link>
          <h1 className="font-serif text-2xl text-[#14213D]">AI Post Generator</h1>
          <p className="text-sm text-[#9C9384] mt-1">
            Claude writes a full draft — you review and edit before anything goes live.
          </p>
        </div>

        {/* ────────────────────────────────────────────────────────────────────
            PHASE: idle / generating — show the form
        ──────────────────────────────────────────────────────────────────── */}
        {phase !== "review" && (
          <div className="bg-[#14213D] rounded-2xl p-8 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A227] opacity-[0.06] rounded-full translate-x-24 -translate-y-24 pointer-events-none" />

            <p className="text-[#C9A227] text-[10px] uppercase tracking-[0.18em] font-semibold mb-1">
              Powered by Claude
            </p>
            <h2 className="font-serif text-white text-xl mb-6">Generate a blog post</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {/* Topic */}
              <div className="md:col-span-2">
                <label className="ai-label">Topic *</label>
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && generate()}
                  placeholder="e.g. Self-assessment tips for UK freelancers in 2024-25"
                  className="ai-input w-full mt-1"
                  disabled={phase === "generating"}
                />
              </div>

              {/* Keywords */}
              <div>
                <label className="ai-label">Keywords <span className="text-white/30">(comma-separated, optional)</span></label>
                <input
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="HMRC, self-employed, payment on account"
                  className="ai-input w-full mt-1"
                  disabled={phase === "generating"}
                />
              </div>

              {/* Tone */}
              <div>
                <label className="ai-label">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as Tone)}
                  className="ai-input w-full mt-1"
                  disabled={phase === "generating"}
                >
                  {(Object.keys(TONE_LABELS) as Tone[]).map((t) => (
                    <option key={t} value={t}>{TONE_LABELS[t]}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <p className="mb-4 text-sm text-red-300 bg-red-900/30 border border-red-700/50 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}

            {/* Generate button / progress */}
            {phase === "idle" ? (
              <button
                onClick={generate}
                className="flex items-center gap-2 bg-[#C9A227] hover:bg-[#B8941F] text-[#14213D] font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Generate draft
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-white/5 rounded-xl px-5 py-4">
                <div className="w-5 h-5 border-2 border-[#C9A227]/30 border-t-[#C9A227] rounded-full animate-spin flex-shrink-0" />
                <p className="text-white/80 text-sm">{GENERATING_STEPS[stepIdx]}</p>
              </div>
            )}
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────────────
            PHASE: review — editable draft
        ──────────────────────────────────────────────────────────────────── */}
        {phase === "review" && draft && (
          <div className="space-y-5">

            {/* Review banner */}
            <div className="bg-white border border-[#E3DFD6] rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <span className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 text-sm font-bold flex items-center justify-center flex-shrink-0">✦</span>
                <div>
                  <p className="text-sm font-semibold text-[#14213D]">Claude's draft is ready</p>
                  <p className="text-xs text-[#9C9384]">Review and edit below — nothing is saved until you choose an action.</p>
                </div>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <button
                  onClick={discard}
                  className="px-4 py-2 border border-[#E3DFD6] rounded-lg text-sm text-[#6B6B6B] hover:text-red-600 hover:border-red-200 transition-colors"
                >
                  Discard
                </button>
                <button
                  onClick={() => savePost("draft")}
                  disabled={saving}
                  className="px-4 py-2 border border-[#14213D] rounded-lg text-sm text-[#14213D] font-medium hover:bg-[#F8F6F1] disabled:opacity-50 transition-colors"
                >
                  {saving ? "Saving…" : "Save as draft"}
                </button>
                <button
                  onClick={() => savePost("published")}
                  disabled={saving}
                  className="px-4 py-2 bg-[#C9A227] hover:bg-[#B8941F] text-[#14213D] font-semibold text-sm rounded-lg disabled:opacity-50 transition-colors"
                >
                  {saving ? "Publishing…" : "Publish"}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">

              {/* ── Editable content ── */}
              <div className="space-y-5">

                <div className="bg-white border border-[#E3DFD6] rounded-xl p-6">
                  <label className="review-label">Title</label>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="review-input font-serif text-xl mt-1"
                  />
                </div>

                <div className="bg-white border border-[#E3DFD6] rounded-xl p-6">
                  <label className="review-label">Excerpt</label>
                  <textarea
                    value={editExcerpt}
                    onChange={(e) => setEditExcerpt(e.target.value)}
                    rows={2}
                    className="review-input resize-none mt-1"
                  />
                </div>

                <div className="bg-white border border-[#E3DFD6] rounded-xl p-6">
                  <div className="flex items-center justify-between mb-1">
                    <label className="review-label">Content</label>
                    <span className="text-xs text-[#9C9384]">
                      {editContent.trim().split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={22}
                    className="review-input resize-y font-serif leading-relaxed mt-1"
                  />
                </div>

              </div>

              {/* ── Sidebar meta ── */}
              <div className="space-y-5">

                <div className="bg-white border border-[#E3DFD6] rounded-xl p-5">
                  <label className="review-label mb-2 block">URL slug</label>
                  <p className="text-xs text-[#9C9384] font-mono break-all">
                    /blog/{draft.slug}
                  </p>
                  <p className="text-xs text-[#B0A99A] mt-1">
                    Auto-generated — edit the post after saving to change it.
                  </p>
                </div>

                <div className="bg-white border border-[#E3DFD6] rounded-xl p-5">
                  <label className="review-label">Author</label>
                  <input
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)}
                    placeholder="e.g. Sarah Williams"
                    className="review-input mt-2"
                  />
                </div>

                <div className="bg-white border border-[#E3DFD6] rounded-xl p-5">
                  <label className="review-label mb-2 block">Topics / tags</label>
                  <input
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="Tag One, Tag Two"
                    className="review-input"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {editTags.split(",").map((t) => t.trim()).filter(Boolean).map((t) => (
                      <span key={t} className="text-[10px] text-[#C9A227] font-semibold uppercase tracking-wide">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-[#E3DFD6] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-1">
                    <label className="review-label">Meta description</label>
                    <span className={`text-xs ${editMeta.length > 160 ? "text-red-500" : "text-[#9C9384]"}`}>
                      {editMeta.length}/160
                    </span>
                  </div>
                  <textarea
                    value={editMeta}
                    onChange={(e) => setEditMeta(e.target.value)}
                    rows={3}
                    maxLength={165}
                    className="review-input resize-none text-xs mt-1"
                  />
                </div>

                {/* Regenerate */}
                <button
                  onClick={discard}
                  className="w-full py-2.5 border border-dashed border-[#C9A227]/50 rounded-xl text-xs text-[#C9A227] hover:bg-[#C9A227]/5 transition-colors"
                >
                  ↺ Generate a different draft
                </button>

              </div>
            </div>

            {/* Bottom action bar */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={discard}
                className="px-5 py-2.5 border border-[#E3DFD6] rounded-lg text-sm text-[#6B6B6B] hover:text-red-600 hover:border-red-200 transition-colors"
              >
                Discard
              </button>
              <button
                onClick={() => savePost("draft")}
                disabled={saving}
                className="px-5 py-2.5 border border-[#14213D] rounded-lg text-sm text-[#14213D] font-medium hover:bg-[#F8F6F1] disabled:opacity-50 transition-colors"
              >
                Save as draft
              </button>
              <button
                onClick={() => savePost("published")}
                disabled={saving}
                className="px-5 py-2.5 bg-[#C9A227] hover:bg-[#B8941F] text-[#14213D] font-semibold text-sm rounded-lg disabled:opacity-50 transition-colors"
              >
                Publish
              </button>
            </div>

          </div>
        )}
      </main>

      {/* ── Toast ── */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#14213D] text-white text-sm px-5 py-3 rounded-xl shadow-xl">
          {toastMsg}
        </div>
      )}

      <style>{`
        .ai-label     { display: block; font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.07em; }
        .ai-input     { padding: 9px 12px; border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; background: rgba(255,255,255,0.07); color: #fff; font-size: 14px; font-family: inherit; outline: none; transition: border-color .15s; }
        .ai-input:focus { border-color: #C9A227; background: rgba(255,255,255,0.1); }
        .ai-input::placeholder { color: rgba(255,255,255,0.25); }
        .ai-input option { background: #14213D; }
        .ai-input:disabled { opacity: 0.5; cursor: not-allowed; }
        .review-label { display: block; font-size: 11px; font-weight: 600; color: #6B6B6B; text-transform: uppercase; letter-spacing: 0.07em; }
        .review-input { display: block; width: 100%; padding: 9px 12px; border: 1px solid #E3DFD6; border-radius: 8px; font-size: 14px; font-family: inherit; background: #F8F6F1; color: #14213D; outline: none; transition: border-color .15s; }
        .review-input:focus { border-color: #14213D; background: #fff; }
      `}</style>
    </div>
  );
}