import { useState, useMemo } from "react";
import { apiRequest } from "@/lib/ApiConfig";

const MAX_META_LENGTH = 160;

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function CreatePublication({ onPublished }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [metaDescription, setMetaDescription] = useState("");
  const [authorName, setAuthorName] = useState("");

  const [status, setStatus] = useState("idle"); // idle | saving | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const wordCount = useMemo(
    () => content.trim().split(/\s+/).filter(Boolean).length,
    [content]
  );
  const readingMinutes = Math.max(1, Math.round(wordCount / 200));

  function handleTitleChange(value) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function handleSlugChange(value) {
    setSlugTouched(true);
    setSlug(slugify(value));
  }

  function addTag(raw) {
    const cleaned = raw.trim().replace(/,$/, "");
    if (!cleaned) return;
    if (tags.includes(cleaned)) {
      setTagInput("");
      return;
    }
    setTags([...tags, cleaned]);
    setTagInput("");
  }

  function handleTagKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    }
    if (e.key === "Backspace" && !tagInput && tags.length) {
      setTags(tags.slice(0, -1));
    }
  }

  function removeTag(tag) {
    setTags(tags.filter((t) => t !== tag));
  }

  function resetForm() {
    setTitle("");
    setSlug("");
    setSlugTouched(false);
    setExcerpt("");
    setContent("");
    setTags([]);
    setTagInput("");
    setMetaDescription("");
    setAuthorName("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !slug || !content || !authorName) {
      setStatus("error");
      setErrorMessage("Title, slug, content, and author name are required.");
      return;
    }

    setStatus("saving");
    setErrorMessage("");

    try {
      await apiRequest("/admin/create-blog", {
        method: "POST",
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          tags,
          metaDescription,
          authorName,
        }),
      });

      setStatus("success");
      resetForm();
      onPublished?.();

      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong while publishing.");
    }
  }

  const metaLength = metaDescription.length;
  const metaOver = metaLength > MAX_META_LENGTH;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Editor column */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="font-serif text-2xl text-[#14213D]">New publication</h2>
          <p className="text-sm text-[#6B6B6B] mt-1">
            Fill in the details below. The preview on the right updates as you type.
          </p>
        </div>

        <Field label="Title" required>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="What's the Spring Budget mean for small businesses?"
            className={inputClass}
          />
        </Field>

        <Field label="Slug" required hint="Used in the URL. Auto-generated from the title.">
          <div className="flex items-center gap-1 text-sm">
            <span className="text-[#9C9384] whitespace-nowrap">/blog/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="spring-budget-small-businesses"
              className={`${inputClass} font-mono text-sm`}
            />
          </div>
        </Field>

        <Field label="Excerpt" hint="A one or two sentence teaser shown in blog listings.">
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="A short summary readers see before they click in."
            className={inputClass}
          />
        </Field>

        <Field label="Content" required hint={`${wordCount} words · ~${readingMinutes} min read`}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={14}
            placeholder="Write the full post here. Markdown is fine if your renderer supports it."
            className={`${inputClass} font-mono text-sm leading-relaxed`}
          />
        </Field>

        <Field label="Tags" hint="Press Enter or comma to add a tag.">
          <div className={`${inputClass} flex flex-wrap gap-2 items-center min-h-[44px]`}>
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-[#14213D]/5 text-[#14213D] text-xs px-2.5 py-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-[#14213D]/50 hover:text-[#B3261E]"
                  aria-label={`Remove tag ${tag}`}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              onBlur={() => addTag(tagInput)}
              placeholder={tags.length ? "" : "tax, hmrc, smes..."}
              className="flex-1 min-w-[100px] bg-transparent outline-none text-sm"
            />
          </div>
        </Field>

        <Field
          label="Meta description"
          hint={
            <span className={metaOver ? "text-[#B3261E]" : "text-[#9C9384]"}>
              {metaLength}/{MAX_META_LENGTH} characters
            </span>
          }
        >
          <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            rows={2}
            placeholder="How this post should appear in search results."
            className={inputClass}
          />
        </Field>

        <Field label="Author name" required>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="e.g. Sarah Okafor"
            className={inputClass}
          />
        </Field>

        {status === "error" && (
          <p className="text-sm text-[#B3261E] bg-[#B3261E]/5 border border-[#B3261E]/20 rounded-md px-3 py-2">
            {errorMessage}
          </p>
        )}
        {status === "success" && (
          <p className="text-sm text-[#2F6B4F] bg-[#2F6B4F]/5 border border-[#2F6B4F]/20 rounded-md px-3 py-2">
            Published. It should now appear under "All posts".
          </p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={status === "saving"}
            className="bg-[#C9A227] hover:bg-[#B8941F] disabled:opacity-60 text-[#14213D] font-medium text-sm px-5 py-2.5 rounded-md transition-colors"
          >
            {status === "saving" ? "Publishing…" : "Publish post"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="text-sm text-[#6B6B6B] hover:text-[#14213D] px-3 py-2.5"
          >
            Clear form
          </button>
        </div>
      </form>

      {/* Live preview column */}
      <div className="lg:sticky lg:top-6 self-start">
        <p className="text-xs uppercase tracking-wide text-[#9C9384] mb-3">Live preview</p>
        <article className="bg-white border border-[#E3DFD6] rounded-lg shadow-sm p-8">
          {tags.length > 0 && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] uppercase tracking-wide text-[#C9A227] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="font-serif text-3xl text-[#14213D] leading-tight">
            {title || "Untitled post"}
          </h1>
          <p className="text-sm text-[#9C9384] mt-3">
            By {authorName || "Unknown author"} · {readingMinutes} min read
          </p>
          {excerpt && (
            <p className="text-[#5A5A5A] mt-5 text-base italic border-l-2 border-[#C9A227] pl-4">
              {excerpt}
            </p>
          )}
          <div className="mt-6 text-[#3A3A3A] text-[15px] leading-relaxed whitespace-pre-wrap">
            {content || "Start writing to see the post take shape here."}
          </div>
        </article>
      </div>
    </div>
  );
}

function Field({ label, required, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#14213D] mb-1.5">
        {label}
        {required && <span className="text-[#C9A227] ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-[#9C9384] mt-1.5">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-[#E3DFD6] bg-white px-3 py-2 text-sm text-[#3A3A3A] placeholder:text-[#B8B0A0] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 focus:border-[#C9A227] transition-shadow";