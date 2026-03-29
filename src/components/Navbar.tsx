// import { useState, useEffect } from "react";
// import { Menu, X, ArrowRight } from "lucide-react";

// const links = [
//   { label: "Home", href: "/" },
//   { label: "Services", href: "/services" },
//   { label: "Contact", href: "/contact" },
// ];

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 24);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <>
//       <style>{`
//         @keyframes slideDownNav {
//           from { opacity: 0; transform: translateY(-8px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes mobileIn {
//           from { opacity: 0; transform: translateY(-6px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .nav-link {
//           position: relative;
//           font-size: 0.875rem;
//           font-weight: 500;
//           letter-spacing: 0.02em;
//           color: hsl(var(--foreground) / 0.65);
//           transition: color 0.2s;
//           text-decoration: none;
//           padding-bottom: 2px;
//         }
//         .nav-link::after {
//           content: '';
//           position: absolute;
//           left: 0; bottom: -2px;
//           width: 0; height: 2px;
//           border-radius: 99px;
//           background: hsl(var(--secondary));
//           transition: width 0.25s cubic-bezier(0.4,0,0.2,1);
//         }
//         .nav-link:hover { color: hsl(var(--primary)); }
//         .nav-link:hover::after { width: 100%; }
//         .nav-link.active { color: hsl(var(--primary)); }
//         .nav-link.active::after { width: 100%; }
//       `}</style>

//       <nav
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 50,
//           transition: "background 0.3s, box-shadow 0.3s, border-color 0.3s",
//           background: scrolled
//             ? "hsl(var(--background) / 0.92)"
//             : "hsl(var(--background) / 0.6)",
//           backdropFilter: "blur(16px)",
//           borderBottom: scrolled
//             ? "1px solid hsl(var(--border))"
//             : "1px solid transparent",
//           boxShadow: scrolled ? "0 2px 24px hsl(0 0% 0% / 0.06)" : "none",
//           animation: "slideDownNav 0.5s ease both",
//         }}
//       >
//         <div className="container mx-auto px-6 lg:px-12">
//           <div
//             style={{
//               height: scrolled ? "60px" : "72px",
//               transition: "height 0.3s",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             {/* ── Logo ── */}
//             <a
//               href="/"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 textDecoration: "none",
//                 flexShrink: 0,
//               }}
//             >
//               {/* Icon mark */}
//               <div
//                 style={{
//                   width: "32px",
//                   height: "32px",
//                   borderRadius: "8px",
//                   background: "hsl(var(--primary))",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   flexShrink: 0,
//                 }}
//               >
//                 <span
//                   style={{
//                     fontFamily: "'Georgia', serif",
//                     fontWeight: 700,
//                     fontSize: "1rem",
//                     color: "hsl(var(--secondary))",
//                     lineHeight: 1,
//                   }}
//                 >
//                   A
//                 </span>
//               </div>
//               {/* Wordmark */}
//               <div>
//                 <span
//                   style={{
//                     fontFamily: "'Georgia', 'Times New Roman', serif",
//                     fontWeight: 700,
//                     fontSize: "1.05rem",
//                     color: "hsl(var(--primary))",
//                     letterSpacing: "-0.01em",
//                   }}
//                 >
//                   Akountin
//                 </span>
//                 <span
//                   style={{
//                     fontFamily: "'Georgia', serif",
//                     fontWeight: 400,
//                     fontSize: "1.05rem",
//                     color: "hsl(var(--foreground) / 0.45)",
//                     marginLeft: "4px",
//                   }}
//                 >
//                   Professionals
//                 </span>
//               </div>
//             </a>

//             {/* ── Desktop nav ── */}
//             <div
//               className="hidden md:flex"
//               style={{ alignItems: "center", gap: "2rem" }}
//             >
//               {links.map(({ label, href }) => (
//                 <a
//                   key={label}
//                   href={href}
//                   className={`nav-link${
//                     typeof window !== "undefined" &&
//                     window.location.pathname === href
//                       ? " active"
//                       : ""
//                   }`}
//                 >
//                   {label}
//                 </a>
//               ))}

//               {/* CTA */}
//               <a
//                 href="/contact"
//                 style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   gap: "6px",
//                   padding: "0.5rem 1.1rem",
//                   borderRadius: "0.5rem",
//                   background: "hsl(var(--primary))",
//                   color: "white",
//                   fontSize: "0.8rem",
//                   fontWeight: 600,
//                   letterSpacing: "0.04em",
//                   textTransform: "uppercase",
//                   textDecoration: "none",
//                   transition: "opacity 0.2s, transform 0.2s",
//                 }}
//                 onMouseEnter={(e) => {
//                   (e.currentTarget as HTMLElement).style.opacity = "0.88";
//                   (e.currentTarget as HTMLElement).style.transform =
//                     "translateY(-1px)";
//                 }}
//                 onMouseLeave={(e) => {
//                   (e.currentTarget as HTMLElement).style.opacity = "1";
//                   (e.currentTarget as HTMLElement).style.transform =
//                     "translateY(0)";
//                 }}
//               >
//                 Free Consultation
//                 <ArrowRight style={{ width: "13px", height: "13px" }} />
//               </a>
//             </div>

//             {/* ── Mobile burger ── */}
//             <button
//               className="md:hidden"
//               onClick={() => setMenuOpen((o) => !o)}
//               aria-label="Toggle menu"
//               style={{
//                 width: "38px",
//                 height: "38px",
//                 borderRadius: "8px",
//                 border: "1px solid hsl(var(--border))",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 background: "transparent",
//                 cursor: "pointer",
//                 color: "hsl(var(--foreground))",
//                 transition: "background 0.2s",
//               }}
//               onMouseEnter={(e) =>
//                 ((e.currentTarget as HTMLElement).style.background =
//                   "hsl(var(--muted))")
//               }
//               onMouseLeave={(e) =>
//                 ((e.currentTarget as HTMLElement).style.background =
//                   "transparent")
//               }
//             >
//               {menuOpen ? (
//                 <X style={{ width: "18px", height: "18px" }} />
//               ) : (
//                 <Menu style={{ width: "18px", height: "18px" }} />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* ── Mobile dropdown ── */}
//         {menuOpen && (
//           <div
//             style={{
//               borderTop: "1px solid hsl(var(--border))",
//               background: "hsl(var(--background) / 0.97)",
//               backdropFilter: "blur(16px)",
//               padding: "1.25rem 1.5rem 1.5rem",
//               display: "flex",
//               flexDirection: "column",
//               gap: "0.25rem",
//               animation: "mobileIn 0.25s ease both",
//             }}
//           >
//             {links.map(({ label, href }, i) => (
//               <a
//                 key={label}
//                 href={href}
//                 onClick={() => setMenuOpen(false)}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   padding: "0.75rem 0",
//                   borderBottom:
//                     i < links.length - 1
//                       ? "1px solid hsl(var(--border))"
//                       : "none",
//                   textDecoration: "none",
//                   fontSize: "1rem",
//                   fontWeight: 500,
//                   color: "hsl(var(--foreground) / 0.75)",
//                   transition: "color 0.2s",
//                   animation: `mobileIn 0.3s ${i * 0.06}s ease both`,
//                   opacity: 0,
//                 }}
//                 onMouseEnter={(e) =>
//                   ((e.currentTarget as HTMLElement).style.color =
//                     "hsl(var(--primary))")
//                 }
//                 onMouseLeave={(e) =>
//                   ((e.currentTarget as HTMLElement).style.color =
//                     "hsl(var(--foreground) / 0.75)")
//                 }
//               >
//                 {label}
//                 <ArrowRight
//                   style={{
//                     width: "14px",
//                     height: "14px",
//                     color: "hsl(var(--secondary))",
//                     opacity: 0.7,
//                   }}
//                 />
//               </a>
//             ))}

//             {/* Mobile CTA */}
//             <a
//               href="/contact"
//               onClick={() => setMenuOpen(false)}
//               style={{
//                 marginTop: "1rem",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "6px",
//                 padding: "0.75rem",
//                 borderRadius: "0.625rem",
//                 background: "hsl(var(--primary))",
//                 color: "white",
//                 fontWeight: 600,
//                 fontSize: "0.875rem",
//                 textDecoration: "none",
//                 animation: "mobileIn 0.3s 0.18s ease both",
//                 opacity: 0,
//               }}
//             >
//               Free Consultation
//               <ArrowRight style={{ width: "14px", height: "14px" }} />
//             </a>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "@/assets/logo.jpg";
const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Gate burger + dropdown purely in JS — no Tailwind breakpoint ambiguity
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setIsMobile(mq.matches);
      if (!mq.matches) setMenuOpen(false);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideDownNav {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mobileIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-link {
          position: relative;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: hsl(var(--foreground) / 0.65);
          transition: color 0.2s;
          text-decoration: none;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -2px;
          width: 0; height: 2px;
          border-radius: 99px;
          background: hsl(var(--secondary));
          transition: width 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link:hover { color: hsl(var(--primary)); }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: hsl(var(--primary)); }
        .nav-link.active::after { width: 100%; }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.3s, box-shadow 0.3s, border-color 0.3s",
          background: scrolled
            ? "hsl(var(--background) / 0.92)"
            : "hsl(var(--background) / 0.6)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid hsl(var(--border))"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 24px hsl(0 0% 0% / 0.06)" : "none",
          animation: "slideDownNav 0.5s ease both",
        }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div
            style={{
              height: scrolled ? "60px" : "72px",
              transition: "height 0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* ── Logo ── */}
            {/* <a
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "hsl(var(--primary))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "hsl(var(--secondary))",
                    lineHeight: 1,
                  }}
                >
                  A
                </span>
              </div>
              <div>
                <span
                  style={{
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "hsl(var(--primary))",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Akountin
                </span>
                <span
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    color: "hsl(var(--foreground) / 0.45)",
                    marginLeft: "4px",
                  }}
                >
                  Professionals
                </span>
              </div>
            </a> */}
            <img
              src={Logo}
              alt="Akountin Professionals"
              className="w-auto h-[2.25em]"
            />

            {/* ── Desktop nav — only rendered when NOT mobile ── */}
            {!isMobile && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "2rem" }}
              >
                {links.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className={`nav-link${
                      window.location.pathname === href ? " active" : ""
                    }`}
                  >
                    {label}
                  </a>
                ))}

                <a
                  href="/contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "0.5rem 1.1rem",
                    borderRadius: "0.5rem",
                    background: "hsl(var(--primary))",
                    color: "white",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "opacity 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "0.88";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  Free Consultation
                  <ArrowRight style={{ width: "13px", height: "13px" }} />
                </a>
              </div>
            )}

            {/* ── Mobile burger — only rendered when mobile ── */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle menu"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  cursor: "pointer",
                  color: "hsl(var(--foreground))",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "hsl(var(--muted))")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "transparent")
                }
              >
                {menuOpen ? (
                  <X style={{ width: "18px", height: "18px" }} />
                ) : (
                  <Menu style={{ width: "18px", height: "18px" }} />
                )}
              </button>
            )}
          </div>
        </div>

        {/* ── Mobile dropdown — only rendered when mobile + open ── */}
        {isMobile && menuOpen && (
          <div
            style={{
              borderTop: "1px solid hsl(var(--border))",
              background: "hsl(var(--background) / 0.97)",
              backdropFilter: "blur(16px)",
              padding: "1.25rem 1.5rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
              animation: "mobileIn 0.25s ease both",
            }}
          >
            {links.map(({ label, href }, i) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 0",
                  borderBottom:
                    i < links.length - 1
                      ? "1px solid hsl(var(--border))"
                      : "none",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "hsl(var(--foreground) / 0.75)",
                  transition: "color 0.2s",
                  animation: `mobileIn 0.3s ${i * 0.06}s ease both`,
                  opacity: 0,
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "hsl(var(--primary))")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "hsl(var(--foreground) / 0.75)")
                }
              >
                {label}
                <ArrowRight
                  style={{
                    width: "14px",
                    height: "14px",
                    color: "hsl(var(--secondary))",
                    opacity: 0.7,
                  }}
                />
              </a>
            ))}

            <a
              href="/contact"
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "0.75rem",
                borderRadius: "0.625rem",
                background: "hsl(var(--primary))",
                color: "white",
                fontWeight: 600,
                fontSize: "0.875rem",
                textDecoration: "none",
                animation: "mobileIn 0.3s 0.18s ease both",
                opacity: 0,
              }}
            >
              Free Consultation
              <ArrowRight className="w-7 h-7" />
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
