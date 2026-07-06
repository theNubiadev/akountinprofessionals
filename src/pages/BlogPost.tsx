  // import Navbar from "@/components/Navbar";
  // import Footer from "@/components/Footer";

  // import { useEffect, useState, useRef } from "react";
  // import { Link, useParams } from "react-router-dom";
  // import { getPostBySlug, posts } from "@/lib/posts";

  // function formatDate(iso) {
  //   return new Date(iso).toLocaleDateString("en-GB", {
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //   });
  // }

  // function RenderContent({ text }) {
  //   const blocks = text.trim().split(/\n{2,}/);
  //   return (
  //     <div className="space-y-5">
  //       {blocks.map((block, i) => {
  //         const headingMatch = block.match(/^\*\*(.+?)\*\*$/);
  //         if (headingMatch) {
  //           return (
  //             <h2
  //               key={i}
  //               className="font-serif text-xl text-[#14213D] mt-8 mb-2 leading-snug"
  //             >
  //               {headingMatch[1]}
  //             </h2>
  //           );
  //         }
  //         const parts = block.split(/\*\*(.+?)\*\*/g);
  //         return (
  //           <p key={i} className="text-[#3A3A3A] text-base leading-8">
  //             {parts.map((part, j) =>
  //               j % 2 === 1 ? (
  //                 <strong key={j} className="font-semibold text-[#14213D]">
  //                   {part}
  //                 </strong>
  //               ) : (
  //                 part
  //               )
  //             )}
  //           </p>
  //         );
  //       })}
  //     </div>
  //   );
  // }

  // export default function BlogPost() {
  //   const { slug } = useParams();
  //   const [progress, setProgress] = useState(0);
  //   const articleRef = useRef(null);

  //   const post = getPostBySlug(slug);

  //   const related = post
  //     ? posts
  //         .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
  //         .slice(0, 2)
  //     : [];

  //   useEffect(() => {
  //     if (post) document.title = `${post.title} — Akountin Professionals`;
  //   }, [post]);

  //   useEffect(() => {
  //     window.scrollTo(0, 0);
  //   }, [slug]);

  //   useEffect(() => {
  //     function onScroll() {
  //       const el = articleRef.current;
  //       if (!el) return;
  //       const { top, height } = el.getBoundingClientRect();
  //       const windowH = window.innerHeight;
  //       const scrolled = Math.max(0, windowH - top);
  //       const pct = Math.min(100, (scrolled / (height + windowH)) * 100);
  //       setProgress(pct);
  //     }
  //     window.addEventListener("scroll", onScroll, { passive: true });
  //     return () => window.removeEventListener("scroll", onScroll);
  //   }, []);

  //   // ── Not found ──────────────────────────────────────────────────────────────
  //   if (!post) {
  //     return (
  //       <div className="flex flex-col min-h-screen bg-[#F8F6F1]">
  //         <Navbar />
  //         <div className="flex-1 flex items-center justify-center">
  //           <div className="text-center">
  //             <p className="font-serif text-2xl text-[#14213D] mb-4">Post not found</p>
  //             <Link to="/blog" className="text-sm text-[#C9A227] hover:underline">
  //               ← Back to all posts
  //             </Link>
  //           </div>
  //         </div>
  //         <Footer />
  //       </div>
  //     );
  //   }

  //   // ── Post found ─────────────────────────────────────────────────────────────
  //   return (
  //     <div className="flex flex-col min-h-screen bg-[#F8F6F1]">
  //       {/* Reading progress bar — sits above everything */}
  //       <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-[#E3DFD6]">
  //         <div
  //           className="h-full bg-[#C9A227] transition-[width] duration-75 ease-linear"
  //           style={{ width: `${progress}%` }}
  //           role="progressbar"
  //           aria-valuenow={Math.round(progress)}
  //           aria-valuemin={0}
  //           aria-valuemax={100}
  //         />
  //       </div>

  //       <Navbar />

  //       <div className="flex-1 flex flex-col">

  //         {/* ── Back navigation strip ── */}
  //         <div className="bg-[#14213D] px-6 md:px-16 py-4 flex items-center justify-between">
  //           <Link
  //             to="/blog"
  //             className="text-sm text-white/70 hover:text-white inline-flex items-center gap-2 transition-colors"
  //           >
  //             <span className="text-[#C9A227]">←</span> All posts
  //           </Link>
  //           <span className="text-white/40 text-xs hidden md:block">
  //             akountinprofessionals.co.uk
  //           </span>
  //         </div>

  //         {/* ── Article header ── */}
  //         <header className="bg-[#14213D] text-white px-6 md:px-16 pt-10 pb-14">
  //           <div className="max-w-3xl">
  //             <div className="flex flex-wrap gap-2 mb-5">
  //               {post.tags.map((tag) => (
  //                 <span
  //                   key={tag}
  //                   className="text-[11px] uppercase tracking-[0.15em] text-[#C9A227] font-semibold"
  //                 >
  //                   {tag}
  //                 </span>
  //               ))}
  //             </div>
  //             <h1 className="font-serif text-3xl md:text-4xl leading-tight">{post.title}</h1>
  //             <p className="mt-5 text-white/70 text-base leading-relaxed border-l-2 border-[#C9A227] pl-4 italic max-w-2xl">
  //               {post.excerpt}
  //             </p>
  //             <div className="flex items-center gap-3 mt-7 text-sm text-white/50">
  //               <span className="text-white font-medium">{post.authorName}</span>
  //               <span>·</span>
  //               <span>{formatDate(post.createdAt)}</span>
  //               <span>·</span>
  //               <span>{post.readingMinutes} min read</span>
  //             </div>
  //           </div>
  //         </header>

  //         {/* ── Body + sidebar ── */}
  //         <main className="flex-1 px-6 md:px-16 py-12 max-w-6xl mx-auto w-full md:grid md:grid-cols-[1fr_280px] md:gap-16">

  //           {/* Article content */}
  //           <article ref={articleRef}>
  //             <RenderContent text={post.content} />

  //             {/* In-article CTA */}
  //             <div className="mt-12 border border-[#E3DFD6] bg-white rounded-lg p-7">
  //               <p className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold mb-2">
  //                 Need specific advice?
  //               </p>
  //               <p className="font-serif text-xl text-[#14213D] leading-snug">
  //                 Talk to our team about your situation
  //               </p>
  //               <p className="text-sm text-[#6B6B6B] mt-2 leading-relaxed">
  //                 This article is general guidance. For advice tailored to your specific
  //                 circumstances, we're here to help.
  //               </p>
  //               <Link
  //                 to="/contact"
  //                 className="inline-block mt-4 bg-[#C9A227] hover:bg-[#B8941F] text-[#14213D] text-sm font-medium px-5 py-2.5 rounded-md transition-colors"
  //               >
  //                 Get in touch
  //               </Link>
  //             </div>
  //           </article>

  //           {/* Sticky sidebar */}
  //           <aside className="hidden md:block">
  //             <div className="sticky top-8 space-y-6">

  //               {/* Author */}
  //               <div className="bg-white border border-[#E3DFD6] rounded-lg p-5">
  //                 <p className="text-xs uppercase tracking-widest text-[#9C9384] mb-3">Author</p>
  //                 <div className="flex items-center gap-3">
  //                   <div className="w-9 h-9 rounded-full bg-[#14213D] text-white text-sm font-serif flex items-center justify-center flex-shrink-0">
  //                     {post.authorName.charAt(0)}
  //                   </div>
  //                   <div>
  //                     <p className="text-sm font-medium text-[#14213D]">{post.authorName}</p>
  //                     <p className="text-xs text-[#9C9384]">Akountin Professionals</p>
  //                   </div>
  //                 </div>
  //               </div>

  //               {/* Tags */}
  //               <div className="bg-white border border-[#E3DFD6] rounded-lg p-5">
  //                 <p className="text-xs uppercase tracking-widest text-[#9C9384] mb-3">Topics</p>
  //                 <div className="flex flex-wrap gap-2">
  //                   {post.tags.map((tag) => (
  //                     <span
  //                       key={tag}
  //                       className="text-xs bg-[#F8F6F1] border border-[#E3DFD6] text-[#14213D] px-2.5 py-1 rounded-full"
  //                     >
  //                       {tag}
  //                     </span>
  //                   ))}
  //                 </div>
  //               </div>

  //               {/* Related posts */}
  //               {related.length > 0 && (
  //                 <div className="bg-white border border-[#E3DFD6] rounded-lg p-5">
  //                   <p className="text-xs uppercase tracking-widest text-[#9C9384] mb-4">
  //                     Related posts
  //                   </p>
  //                   <div className="space-y-4">
  //                     {related.map((r) => (
  //                       <Link key={r.slug} to={`/blog/${r.slug}`} className="block group">
  //                         <p className="text-sm text-[#14213D] group-hover:text-[#C9A227] leading-snug transition-colors font-serif">
  //                           {r.title}
  //                         </p>
  //                         <p className="text-xs text-[#9C9384] mt-1">{r.readingMinutes} min read</p>
  //                       </Link>
  //                     ))}
  //                   </div>
  //                 </div>
  //               )}

  //             </div>
  //           </aside>
  //         </main>

  //       </div>

  //       <Footer />
  //     </div>
  //   );
  // }


  import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { publicPosts, type Post } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function RenderContent({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        const headingMatch = block.match(/^\*\*(.+?)\*\*$/);
        if (headingMatch) {
          return (
            <h2 key={i} className="font-serif text-xl text-[#14213D] mt-8 mb-2 leading-snug">
              {headingMatch[1]}
            </h2>
          );
        }
        const parts = block.split(/\*\*(.+?)\*\*/g);
        return (
          <p key={i} className="text-[#3A3A3A] text-base leading-8">
            {parts.map((part, j) =>
              j % 2 === 1 ? (
                <strong key={j} className="font-semibold text-[#14213D]">{part}</strong>
              ) : (
                part
              )
            )}
          </p>
        );
      })}
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost]         = useState<Post | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading]   = useState(true);
  const [progress, setProgress] = useState(0);
  const articleRef              = useRef<HTMLElement>(null);

  // Fetch the single post by slug
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    publicPosts
      .bySlug(slug)
      .then(setPost)
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  // Fetch all posts for related posts sidebar
  useEffect(() => {
    publicPosts.list().then(setAllPosts).catch(console.error);
  }, []);

  // Set page title
  useEffect(() => {
    if (post) document.title = `${post.title} — Akountin Professionals`;
  }, [post]);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Reading progress bar
  useEffect(() => {
    function onScroll() {
      const el = articleRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const scrolled = Math.max(0, windowH - top);
      const pct = Math.min(100, (scrolled / (height + windowH)) * 100);
      setProgress(pct);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const related = post
    ? allPosts
        .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
        .slice(0, 2)
    : [];

  // ── Loading 
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8F6F1]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#14213D] border-t-[#C9A227] rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  // ── Not found 
  if (!post) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8F6F1]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="font-serif text-2xl text-[#14213D] mb-4">Post not found</p>
            <Link to="/blog" className="text-sm text-[#C9A227] hover:underline">
              ← Back to all posts
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Post found 
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F6F1]">

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-[#E3DFD6]">
        <div
          className="h-full bg-[#C9A227] transition-[width] duration-75 ease-linear"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <Navbar />

      <div className="flex-1 flex flex-col">

        {/* Back navigation strip */}
        <div className="bg-[#14213D] px-6 md:px-16 py-4 flex items-center justify-between">
          <Link
            to="/blog"
            className="text-sm text-white/70 hover:text-white inline-flex items-center gap-2 transition-colors"
          >
            <span className="text-[#C9A227]">←</span> All posts
          </Link>
          <span className="text-white/40 text-xs hidden md:block">
            akountinprofessionals.co.uk
          </span>
        </div>

        {/* Article header */}
        <header className="bg-[#14213D] text-white px-6 md:px-16 pt-10 pb-14">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] uppercase tracking-[0.15em] text-[#C9A227] font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-serif text-3xl md:text-4xl leading-tight">{post.title}</h1>
            <p className="mt-5 text-white/70 text-base leading-relaxed border-l-2 border-[#C9A227] pl-4 italic max-w-2xl">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 mt-7 text-sm text-white/50">
              <span className="text-white font-medium">{post.authorName}</span>
              <span>·</span>
              <span>{formatDate(post.createdAt)}</span>
              <span>·</span>
              <span>{post.readingMinutes} min read</span>
            </div>
          </div>
        </header>

        {/* Body + sidebar */}
        <main className="flex-1 px-6 md:px-16 py-12 max-w-6xl mx-auto w-full md:grid md:grid-cols-[1fr_280px] md:gap-16">

          <article ref={articleRef}>
            <RenderContent text={post.content} />

            {/* In-article CTA */}
            <div className="mt-12 border border-[#E3DFD6] bg-white rounded-lg p-7">
              <p className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold mb-2">
                Need specific advice?
              </p>
              <p className="font-serif text-xl text-[#14213D] leading-snug">
                Talk to our team about your situation
              </p>
              <p className="text-sm text-[#6B6B6B] mt-2 leading-relaxed">
                This article is general guidance. For advice tailored to your specific
                circumstances, we're here to help.
              </p>
              <Link
                to="/contact"
                className="inline-block mt-4 bg-[#C9A227] hover:bg-[#B8941F] text-[#14213D] text-sm font-medium px-5 py-2.5 rounded-md transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </article>

          {/* Sticky sidebar */}
          <aside className="hidden md:block">
            <div className="sticky top-8 space-y-6">

              {/* Author */}
              <div className="bg-white border border-[#E3DFD6] rounded-lg p-5">
                <p className="text-xs uppercase tracking-widest text-[#9C9384] mb-3">Author</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#14213D] text-white text-sm font-serif flex items-center justify-center flex-shrink-0">
                    {post.authorName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#14213D]">{post.authorName}</p>
                    <p className="text-xs text-[#9C9384]">Akountin Professionals</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white border border-[#E3DFD6] rounded-lg p-5">
                <p className="text-xs uppercase tracking-widest text-[#9C9384] mb-3">Topics</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-[#F8F6F1] border border-[#E3DFD6] text-[#14213D] px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div className="bg-white border border-[#E3DFD6] rounded-lg p-5">
                  <p className="text-xs uppercase tracking-widest text-[#9C9384] mb-4">
                    Related posts
                  </p>
                  <div className="space-y-4">
                    {related.map((r) => (
                      <Link key={r.slug} to={`/blog/${r.slug}`} className="block group">
                        <p className="text-sm text-[#14213D] group-hover:text-[#C9A227] leading-snug transition-colors font-serif">
                          {r.title}
                        </p>
                        <p className="text-xs text-[#9C9384] mt-1">{r.readingMinutes} min read</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </aside>
        </main>

      </div>

      <Footer />
    </div>
  );
}