import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import Logo from "@/assets/logo.jpg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[hsl(var(--primary))]">
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none bg-[radial-gradient(circle,hsl(var(--secondary)/0.1)_0%,transparent_70%)]" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none bg-[radial-gradient(circle,hsl(0_0%_100%/0.04)_0%,transparent_70%)]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* ── Top strip ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-8 border-b border-[hsl(0_0%_100%/0.08)]">
          {/* Logo — white bg pill so the image reads on dark footer */}
          <a href="/" className="inline-block shrink-0">
            <img
              src={Logo}
              alt="Akountin Professionals"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </a>

          {/* Social pills */}
          <div className="flex gap-2">
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
                className="flex items-center gap-1.5 rounded-full border px-3 py-2 text-[0.8rem] font-medium border-[hsl(0_0%_100%/0.12)] text-[hsl(0_0%_100%/0.55)] transition-all duration-200 hover:border-[hsl(var(--secondary)/0.5)] hover:text-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary)/0.08)]"
              >
                <Icon className="w-[14px] h-[14px]" />
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-[clamp(1rem,1.4vw,1.1rem)] text-[hsl(0_0%_100%/0.55)] leading-[1.7] max-w-[380px]">
              Expert accounting services built for UK businesses of all sizes —
              from sole traders to growing enterprises. Your numbers, handled
              right.
            </p>

            {/* CTA */}
            <a
              href="/contact"
              className="inline-flex items-center gap-1 px-[1.1rem] py-[0.55rem] rounded-md bg-[hsl(var(--secondary))] text-[hsl(var(--primary))] text-[0.8rem] font-bold uppercase tracking-[0.04em] transition-opacity duration-200 hover:opacity-85"
            >
              Free Consultation
              <ArrowUpRight className="w-[13px] h-[13px]" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[hsl(var(--secondary))] mb-4">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "About Us", href: "/#about" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-[hsl(0_0%_100%/0.5)] transition-colors hover:text-[hsl(var(--secondary))]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[hsl(var(--secondary))] mb-4">
              Contact Us
            </p>
            <ul className="flex flex-col gap-3">
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
                <li key={i} className="flex items-start gap-2.5">
                  <Icon className="w-[14px] h-[14px] text-[hsl(var(--secondary))] mt-[2px] shrink-0" />
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-[hsl(0_0%_100%/0.5)] leading-[1.5] hover:text-[hsl(var(--secondary))]"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm text-[hsl(0_0%_100%/0.5)] leading-[1.5]">
                      {value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-[hsl(0_0%_100%/0.08)] py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[0.8rem] text-[hsl(0_0%_100%/0.3)]">
            © {currentYear} Akountin Professionals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
