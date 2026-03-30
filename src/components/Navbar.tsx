"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "@/assets/logo-nobg.png";

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300 
      ${
        scrolled
          ? "bg-background/90 border-b border-border shadow-[0_2px_24px_rgba(0,0,0,0.06)]"
          : "bg-background/60 border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-[60px]" : "h-[72px]"
          }`}
        >
          {/* Logo */}
          <img
            src={Logo}
            alt="Akountin Professionals"
            className="h-[2.25em] w-auto"
          />

          {/* Desktop Nav */}
          {!isMobile && (
            <div className="flex items-center gap-8">
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={`relative text-sm font-medium text-foreground/70 hover:text-primary transition-colors
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-secondary after:rounded-full after:transition-all
                  hover:after:w-full ${
                    typeof window !== "undefined" &&
                    window.location.pathname === href
                      ? "text-primary after:w-full"
                      : ""
                  }`}
                >
                  {label}
                </a>
              ))}

              {/* CTA */}
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold uppercase tracking-wide transition-all duration-200 hover:opacity-90 hover:-translate-y-[1px]"
              >
                Free Consultation
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Mobile Button */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {links.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between py-3 text-base font-medium text-foreground/80 hover:text-primary transition-colors border-b border-border last:border-none animate-in fade-in duration-200`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {label}
              <ArrowRight className="w-4 h-4 text-secondary opacity-70" />
            </a>
          ))}

          {/* Mobile CTA */}
          <a
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-white font-semibold text-sm animate-in fade-in duration-200"
          >
            Free Consultation
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </nav>
  );
}
