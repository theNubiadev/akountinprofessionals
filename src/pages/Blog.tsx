// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// // import { posts } from "../lib/posts";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// function formatDate(iso) {
//   return new Date(iso).toLocaleDateString("en-GB", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
// }

// const ALL_TAG = "All";

// export default function Blog() {

//   const allTags = [ALL_TAG, ...Array.from(new Set(posts.flatMap((p) => p.tags)))];
//   const [activeTag, setActiveTag] = useState(ALL_TAG);

//   useEffect(() => {
//     document.title = "Insights & Guidance — Akountin Professionals";
//   }, []);

//   const visible =
//     activeTag === ALL_TAG ? posts : posts.filter((p) => p.tags.includes(activeTag));

//   const [featured, ...rest] = visible;

//   return (
//     <div className="flex flex-col min-h-screen bg-[#F8F6F1]">
//       <Navbar />

//       {/* Page body grows to fill between Navbar and Footer */}
//       <div className="flex-1 flex flex-col">

//         {/* ── Masthead ── */}
//         <header className="bg-[#14213D] text-white px-6 md:px-16 py-14">
//           <p className="text-[#C9A227] text-xs uppercase tracking-[0.15em] font-medium mb-3">
//             Akountin Professionals
//           </p>
//           <h1 className="font-serif text-4xl md:text-5xl leading-tight max-w-2xl">
//             Insights &amp; Guidance
//           </h1>
//           <p className="text-white/65 mt-4 text-base max-w-xl leading-relaxed">
//             Practical tax and accounting guidance for UK business owners, sole traders,
//             and contractors — written plainly, published regularly.
//           </p>
//         </header>

//         {/* ── Tag filter bar ── */}
//         <div className="border-b border-[#E3DFD6] bg-white px-6 md:px-16 overflow-x-auto">
//           <div className="flex w-max md:w-auto">
//             {allTags.map((tag) => (
//               <button
//                 key={tag}
//                 onClick={() => setActiveTag(tag)}
//                 className={`text-sm px-4 py-3.5 border-b-2 transition-colors whitespace-nowrap ${
//                   activeTag === tag
//                     ? "border-[#C9A227] text-[#14213D] font-medium"
//                     : "border-transparent text-[#6B6B6B] hover:text-[#14213D]"
//                 }`}
//               >
//                 {tag}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ── Posts ── */}
//         <main className="flex-1 px-6 md:px-16 py-12 max-w-6xl mx-auto w-full">
//           {visible.length === 0 ? (
//             <p className="text-[#6B6B6B] py-16 text-center">
//               No posts under that topic yet.
//             </p>
//           ) : (
//             <>
//               {/* Featured post */}
//               {featured && (
//                 <Link to={`/blog/${featured.slug}`} className="block group mb-12">
//                   <article className="bg-white border border-[#E3DFD6] rounded-lg overflow-hidden md:grid md:grid-cols-5 hover:shadow-md transition-shadow">
//                     <div className="hidden md:block md:col-span-1 bg-[#14213D] relative">
//                       <div className="absolute inset-0 flex flex-col justify-end p-6">
//                         <span className="text-[#C9A227] text-xs uppercase tracking-widest">
//                           Featured
//                         </span>
//                       </div>
//                     </div>
//                     <div className="md:col-span-4 p-8 md:p-10">
//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {featured.tags.map((tag) => (
//                           <TagPill key={tag} tag={tag} />
//                         ))}
//                       </div>
//                       <h2 className="font-serif text-2xl md:text-3xl text-[#14213D] leading-snug group-hover:text-[#C9A227] transition-colors">
//                         {featured.title}
//                       </h2>
//                       <p className="text-[#5A5A5A] mt-4 text-base leading-relaxed">
//                         {featured.excerpt}
//                       </p>
//                       <div className="flex items-center gap-3 mt-6 text-sm text-[#9C9384]">
//                         <span className="font-medium text-[#14213D]">{featured.authorName}</span>
//                         <span>·</span>
//                         <span>{formatDate(featured.createdAt)}</span>
//                         <span>·</span>
//                         <span>{featured.readingMinutes} min read</span>
//                       </div>
//                     </div>
//                   </article>
//                 </Link>
//               )}

//               {/* Card grid */}
//               {rest.length > 0 && (
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                   {rest.map((post) => (
//                     <PostCard key={post.slug} post={post} />
//                   ))}
//                 </div>
//               )}
//             </>
//           )}
//         </main>

//         {/* ── Pre-footer CTA ── */}
//         <section className="bg-[#14213D] text-white px-6 md:px-16 py-14">
//           <p className="text-[#C9A227] text-xs uppercase tracking-widest mb-3">
//             Need specific advice?
//           </p>
//           <h2 className="font-serif text-2xl md:text-3xl max-w-lg leading-snug">
//             Speak to an accountant about your situation
//           </h2>
//           <p className="text-white/65 mt-3 max-w-md leading-relaxed">
//             General guidance is a starting point. For advice tailored to your specific
//             circumstances, contact our team.
//           </p>
//           <Link
//             to="/contact"
//             className="inline-block mt-6 bg-[#C9A227] hover:bg-[#B8941F] text-[#14213D] font-medium text-sm px-6 py-3 rounded-md transition-colors"
//           >
//             Get in touch
//           </Link>
//         </section>

//       </div>

//       <Footer />
//     </div>
//   );
// }

// function PostCard({ post }) {
//   return (
//     <Link to={`/blog/${post.slug}`} className="block group">
//       <article className="bg-white border border-[#E3DFD6] rounded-lg p-6 h-full flex flex-col hover:shadow-md hover:border-[#C9A227]/50 transition-all">
//         <div className="flex flex-wrap gap-1.5 mb-3">
//           {post.tags.slice(0, 2).map((tag) => (
//             <TagPill key={tag} tag={tag} />
//           ))}
//         </div>
//         <h2 className="font-serif text-xl text-[#14213D] leading-snug group-hover:text-[#C9A227] transition-colors flex-1">
//           {post.title}
//         </h2>
//         <p className="text-sm text-[#6B6B6B] mt-3 leading-relaxed line-clamp-3">
//           {post.excerpt}
//         </p>
//         <div className="flex items-center gap-2 mt-5 text-xs text-[#9C9384] pt-4 border-t border-[#E3DFD6]">
//           <span className="font-medium text-[#14213D]">{post.authorName}</span>
//           <span>·</span>
//           <span>{formatDate(post.createdAt)}</span>
//           <span className="ml-auto">{post.readingMinutes} min</span>
//         </div>
//       </article>
//     </Link>
//   );
// }

// function TagPill({ tag }) {
//   return (
//     <span className="text-[11px] uppercase tracking-wide text-[#C9A227] font-semibold">
//       {tag}
//     </span>
//   );
// }



import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

const ALL_TAG = "All";

export default function Blog() {
  const [posts, setPosts]       = useState<Post[]>([]);
  const [loading, setLoading]   = useState(true);
  const [activeTag, setActiveTag] = useState(ALL_TAG);

  useEffect(() => {
    document.title = "Insights & Guidance — Akountin Professionals";
    publicPosts
      .list()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const allTags = [ALL_TAG, ...Array.from(new Set(posts.flatMap((p) => p.tags)))];

  const visible =
    activeTag === ALL_TAG ? posts : posts.filter((p) => p.tags.includes(activeTag));

  const [featured, ...rest] = visible;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F6F1]">
      <Navbar />

      <div className="flex-1 flex flex-col">

        {/* ── Masthead ── */}
        <header className="bg-[#14213D] text-white px-6 md:px-16 py-14">
          <p className="text-[#C9A227] text-xs uppercase tracking-[0.15em] font-medium mb-3">
            Akountin Professionals
          </p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight max-w-2xl">
            Insights &amp; Guidance
          </h1>
          <p className="text-white/65 mt-4 text-base max-w-xl leading-relaxed">
            Practical tax and accounting guidance for UK business owners, sole traders,
            and contractors — written plainly, published regularly.
          </p>
        </header>

        {/* ── Tag filter bar ── */}
        <div className="border-b border-[#E3DFD6] bg-white px-6 md:px-16 overflow-x-auto">
          <div className="flex w-max md:w-auto">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`text-sm px-4 py-3.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTag === tag
                    ? "border-[#C9A227] text-[#14213D] font-medium"
                    : "border-transparent text-[#6B6B6B] hover:text-[#14213D]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* ── Posts ── */}
        <main className="flex-1 px-6 md:px-16 py-12 max-w-6xl mx-auto w-full">

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-6 h-6 border-2 border-[#14213D] border-t-[#C9A227] rounded-full animate-spin" />
            </div>
          )}

          {/* No posts */}
          {!loading && visible.length === 0 && (
            <p className="text-[#6B6B6B] py-16 text-center">
              No posts under that topic yet.
            </p>
          )}

          {/* Posts */}
          {!loading && visible.length > 0 && (
            <>
              {/* Featured post */}
              {featured && (
                <Link to={`/blog/${featured.slug}`} className="block group mb-12">
                  <article className="bg-white border border-[#E3DFD6] rounded-lg overflow-hidden md:grid md:grid-cols-5 hover:shadow-md transition-shadow">
                    <div className="hidden md:block md:col-span-1 bg-[#14213D] relative">
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <span className="text-[#C9A227] text-xs uppercase tracking-widest">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-4 p-8 md:p-10">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featured.tags.map((tag) => (
                          <TagPill key={tag} tag={tag} />
                        ))}
                      </div>
                      <h2 className="font-serif text-2xl md:text-3xl text-[#14213D] leading-snug group-hover:text-[#C9A227] transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-[#5A5A5A] mt-4 text-base leading-relaxed">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mt-6 text-sm text-[#9C9384]">
                        <span className="font-medium text-[#14213D]">{featured.authorName}</span>
                        <span>·</span>
                        <span>{formatDate(featured.createdAt)}</span>
                        <span>·</span>
                        <span>{featured.readingMinutes} min read</span>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Card grid */}
              {rest.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </>
          )}
        </main>

        {/* ── Pre-footer CTA ── */}
        <section className="bg-[#14213D] text-white px-6 md:px-16 py-14">
          <p className="text-[#C9A227] text-xs uppercase tracking-widest mb-3">
            Need specific advice?
          </p>
          <h2 className="font-serif text-2xl md:text-3xl max-w-lg leading-snug">
            Speak to an accountant about your situation
          </h2>
          <p className="text-white/65 mt-3 max-w-md leading-relaxed">
            General guidance is a starting point. For advice tailored to your specific
            circumstances, contact our team.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-6 bg-[#C9A227] hover:bg-[#B8941F] text-[#14213D] font-medium text-sm px-6 py-3 rounded-md transition-colors"
          >
            Get in touch
          </Link>
        </section>

      </div>

      <Footer />
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <article className="bg-white border border-[#E3DFD6] rounded-lg p-6 h-full flex flex-col hover:shadow-md hover:border-[#C9A227]/50 transition-all">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.slice(0, 2).map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
        <h2 className="font-serif text-xl text-[#14213D] leading-snug group-hover:text-[#C9A227] transition-colors flex-1">
          {post.title}
        </h2>
        <p className="text-sm text-[#6B6B6B] mt-3 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2 mt-5 text-xs text-[#9C9384] pt-4 border-t border-[#E3DFD6]">
          <span className="font-medium text-[#14213D]">{post.authorName}</span>
          <span>·</span>
          <span>{formatDate(post.createdAt)}</span>
          <span className="ml-auto">{post.readingMinutes} min</span>
        </div>
      </article>
    </Link>
  );
}

function TagPill({ tag }: { tag: string }) {
  return (
    <span className="text-[11px] uppercase tracking-wide text-[#C9A227] font-semibold">
      {tag}
    </span>
  );
}