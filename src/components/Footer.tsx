// import { Facebook, Instagram } from "lucide-react";

// export default  function Footer()  {
// const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-primary text-primary-foreground font-inter py-10">
//       <div className="container mx-auto px-6">
//         <div className="grid md:grid-cols-3 gap-8 mb-8">
//           <div>
//             <h3 className="text-2xl font-bold mb-4">Akountin Professionals</h3>
//             <p className="text-primary-foreground/80">
//               Expert accounting services built for UK businesses of all sizes.
//             </p>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               <li>
//                  <a href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a href="/services" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
//                   Services
//                 </a>
//               </li>
//               <li>
//                 <a href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
//                   Contact
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
//             <ul className="space-y-2 text-primary-foreground/80">
//               <li>     De Havilland Campus,  Mosquito Way, Hatfield AL10 9EU </li>
//               <li className="mt-4">
//                 <a href="tel:01707515008" className="hover:text-primary-foreground transition-smooth">
//            01707 515 008
//                 </a>
//               </li>
//               <li>info@akountinprofessionals.co.uk </li>
//               <li className="flex">
//               <a href="https://www.facebook.com/p/Akountin-Professionals-61584319305259/"><Facebook />  </a>
//               <a href="https://www.instagram.com/akountinprofessionals01/"><Instagram /></a>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="border-t border-primary-foreground/20 pt-8 text-center">
//           <p className="text-primary-foreground/80">
//             © {currentYear} Akountin Professionals. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "hsl(var(--primary))" }}
    >
      <style>{`
        .ft-link {
          font-size: 0.875rem;
          color: hsl(0 0% 100% / 0.5);
          text-decoration: none;
          transition: color 0.2s;
        }
        .ft-link:hover { color: hsl(var(--secondary)); }
      `}</style>

      {/* Decorative circles */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--secondary) / 0.1) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(0 0% 100% / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* ── Top strip ── */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-8"
          style={{ borderBottom: "1px solid hsl(0 0% 100% / 0.08)" }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "hsl(var(--secondary))",
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
                  color: "hsl(var(--primary))",
                  lineHeight: 1,
                }}
              >
                A
              </span>
            </div>
            <div>
              <span
                style={{
                  fontFamily: "'Georgia', serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "white",
                }}
              >
                Akountin
              </span>
              <span
                style={{
                  fontFamily: "'Georgia', serif",
                  fontWeight: 400,
                  fontSize: "1rem",
                  color: "hsl(0 0% 100% / 0.45)",
                  marginLeft: "4px",
                }}
              >
                Professionals
              </span>
            </div>
          </a>

          {/* Social pills */}
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              {
                icon: Facebook,
                href: "https://www.facebook.com/p/Akountin-Professionals-61584319305259/",
                label: "Facebook",
              },
              {
                icon: Instagram,
                href: "https://www.instagram.com/akountinprofessionals01/",
                label: "Instagram",
              },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "0.4rem 0.85rem",
                  borderRadius: "99px",
                  border: "1px solid hsl(0 0% 100% / 0.12)",
                  color: "hsl(0 0% 100% / 0.55)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "border-color 0.2s, color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "hsl(var(--secondary) / 0.5)";
                  el.style.color = "hsl(var(--secondary))";
                  el.style.background = "hsl(var(--secondary) / 0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "hsl(0 0% 100% / 0.12)";
                  el.style.color = "hsl(0 0% 100% / 0.55)";
                  el.style.background = "transparent";
                }}
              >
                <Icon style={{ width: "14px", height: "14px" }} />
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          {/* Brand blurb */}
          <div className="lg:col-span-2 space-y-4">
            <p
              style={{
                fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
                color: "hsl(0 0% 100% / 0.55)",
                lineHeight: 1.7,
                maxWidth: "380px",
              }}
            >
              Expert accounting services built for UK businesses of all sizes —
              from sole traders to growing enterprises. Your numbers, handled
              right.
            </p>
            {/* CTA */}
            <a
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "0.55rem 1.1rem",
                borderRadius: "0.5rem",
                background: "hsl(var(--secondary))",
                color: "hsl(var(--primary))",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "0.85")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "1")
              }
            >
              Free Consultation
              <ArrowUpRight style={{ width: "13px", height: "13px" }} />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "hsl(var(--secondary))",
                marginBottom: "1rem",
              }}
            >
              Quick Links
            </p>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.65rem",
              }}
            >
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "About Us", href: "/#about" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="ft-link">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "hsl(var(--secondary))",
                marginBottom: "1rem",
              }}
            >
              Contact Us
            </p>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
              }}
            >
              {[
                {
                  icon: MapPin,
                  value: "De Havilland Campus, Mosquito Way, Hatfield AL10 9EU",
                  href: null,
                },
                {
                  icon: Phone,
                  value: "01707 515 008",
                  href: "tel:01707515008",
                },
                {
                  icon: Mail,
                  value: "info@akountinprofessionals.co.uk",
                  href: "mailto:info@akountinprofessionals.co.uk",
                },
              ].map(({ icon: Icon, value, href }, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <Icon
                    style={{
                      width: "14px",
                      height: "14px",
                      color: "hsl(var(--secondary))",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  />
                  {href ? (
                    <a
                      href={href}
                      className="ft-link"
                      style={{ lineHeight: 1.5 }}
                    >
                      {value}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontSize: "0.875rem",
                        color: "hsl(0 0% 100% / 0.5)",
                        lineHeight: 1.5,
                      }}
                    >
                      {value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            borderTop: "1px solid hsl(0 0% 100% / 0.08)",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="sm:flex-row"
        >
          <p style={{ fontSize: "0.8rem", color: "hsl(0 0% 100% / 0.3)" }}>
            © {currentYear} Akountin Professionals. All rights reserved.
          </p>
          <p style={{ fontSize: "0.8rem", color: "hsl(0 0% 100% / 0.2)" }}>
            Registered in England & Wales
          </p>
        </div>
      </div>
    </footer>
  );
}
