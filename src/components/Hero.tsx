import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Clock,
  Calculator,
} from "lucide-react";
import HeroImg from "@/assets/heroimg.jpg";

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center bg-primary overflow-hidden">
      {/* ── Background layer ── */}
      <div className="absolute inset-0">
        {/* Gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary))_55%,hsl(var(--primary)/0.85)_100%)]" />

        {/* Noise */}
        {/* <div className="absolute inset-0 opacity-[0.03] bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")] bg-[length:200px_200px]" /> */}

        {/* Circles */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,hsl(var(--secondary)/0.18)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[radial-gradient(circle,hsl(var(--secondary)/0.12)_0%,transparent_70%)]" />
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto px-6 lg:px-12 py-28 relative z-10">
        <div className="grid lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_520px] gap-16 items-center">
          {/* LEFT */}
          <div className="text-white space-y-10">
            {/* Eyebrow */}
            <div
              className=" inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-[0.12em]
              bg-[hsl(var(--secondary)/0.18)] border border-[hsl(var(--secondary)/0.35)]
              text-[hsl(var(--secondary))] animate-[fadeUp_0.6s_ease_both]
            "
            >
              <Calculator className="w-3.5 h-3.5" />
              Trusted UK Accounting
            </div>

            {/* Headline */}
            <div className="animate-[fadeUp_0.6s_0.15s_ease_both] opacity-0">
              <h1 className="font-bold leading-[1.05] tracking-tight font-comfortaa text-[clamp(2.8rem,5.5vw,5rem)]">
                Accounting that{" "}
                <span className="relative inline-block text-secondary">
                  works
                  <span className="absolute left-0 -bottom-1 w-full h-[3px] rounded-full bg-secondary/70" />
                </span>{" "}
                for your business.
              </h1>
            </div>

            {/* Subtext */}
            <p
              className="
              text-white/75 leading-relaxed max-w-lg
              text-[clamp(1rem,1.6vw,1.2rem)]
              animate-[fadeUp_0.6s_0.3s_ease_both]
              opacity-0
            "
            >
              We handle the numbers so you can focus on growth. Expert
              accounting services built for UK businesses of all sizes — from
              sole traders to scaling enterprises.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 animate-[fadeUp_0.6s_0.45s_ease_both] opacity-0">
              <Button
                onClick={scrollToContact}
                size="lg"
                className="group bg-white text-primary rounded-xl font-semibold text-base px-8 py-5 h-auto shadow-lg transition-all duration-300 hover:bg-white/90"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>

              <button
                onClick={scrollToContact}
                className="text-white/70 hover:text-white text-base font-medium underline underline-offset-4 transition-colors"
              >
                See how it works
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-2 animate-[fadeUp_0.6s_0.6s_ease_both] opacity-0">
              {[
                { icon: TrendingUp, value: "150+", label: "Businesses served" },
                { icon: Clock, value: "15 yrs", label: "Industry experience" },
                { icon: Shield, value: "100%", label: "HMRC compliant" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-secondary/50">
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-none">
                      {value}
                    </p>
                    <p className="text-white/55 text-xs mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative animate-[slideIn_0.7s_0.25s_ease_both] opacity-0">
            {/* Border frame */}
            {/* <div className="absolute -inset-3 rounded-3xl border border-[hsl(var(--secondary)/0.25)] rotate-[2.5deg]" /> */}

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_80px_-10px_hsl(0_0%_0%/0.5),0_0_0_1px_hsl(var(--secondary)/0.15)]">
              <img
                src={HeroImg}
                alt="Professional accounting services"
                className="w-full max-h-[520px] object-cover"
              />

              <div className="absolute inset-0 bg-[linear-gradient(to_top,hsl(var(--primary)/0.5)_0%,transparent_50%)]" />
            </div>

            {/* Floating card */}
            <div
              className="
              absolute -bottom-5 left-6 right-6
              flex items-center justify-between
              rounded-xl px-5 py-3 bg-white
              backdrop-blur-[12px]
              shadow-[0_8px_32px_hsl(0_0%_0%/0.18)]
            "
            >
              <div>
                <p className="text-primary font-bold text-sm">
                  Next available slot
                </p>
                <p className="text-primary/50 text-xs">
                  Book a free consultation
                </p>
              </div>

              <button
                onClick={scrollToContact}
                className="text-xs font-semibold px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90"
              >
                Book now →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
