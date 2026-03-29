// import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";
// import Heroimg from "@/assets/Hero.jpg";

// export default function Hero()  {
//   const scrollToContact = () => {
//     const element = document.getElementById("contact");
//     element?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <section className="relative min-h-screen flex font-inter items-center bg-primary overflow-hidden">
//       <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

//       <div className="container mx-auto px-6 py-32 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <div className="text-white space-y-8 animate-fade-in">
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
//               Accounting that works for your business
//             </h1>
//             <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
//               We handle the numbers so you can focus on growth. Expert accounting services built for UK businesses of all sizes.
//             </p>
//             <Button
//               onClick={scrollToContact}
//               size="lg"
//               className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto shadow-card transition-smooth group"
//             >
//               Get Started Today
//               <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
//             </Button>
//           </div>

//           <div className="relative animate-slide-in-right">
//             <div className="relative rounded-2xl overflow-hidden shadow-card">
//               <img
//                 src={Heroimg}
//                 alt="Professional accounting services"
//                 className="w-full h-auto"
//               />
//             </div>
//             <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>
//             <div className="absolute -top-6 -right-6 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Clock,
  Calculator,
} from "lucide-react";
import Heroimg from "@/assets/Hero.jpg";
import HeroImg from "@/assets/heroimg.jpg";

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex font-inter items-center bg-primary overflow-hidden">
      {/* ── Background layer ── */}
      <div className="absolute inset-0">
        {/* Diagonal accent band */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary)) 55%, hsl(var(--primary) / 0.85) 100%)",
          }}
        />
        {/* Subtle noise/grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
        {/* Large decorative circle – top-right */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--secondary) / 0.18) 0%, transparent 70%)",
          }}
        />
        {/* Small accent circle – bottom-left */}
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--secondary) / 0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="container mx-auto px-6 lg:px-12 py-28 relative z-10">
        <div className="grid lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_520px] gap-16 items-center">
          {/* ── Left column: copy ── */}
          <div className="text-white space-y-10">
            {/* Eyebrow tag */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-widest uppercase"
              style={{
                background: "hsl(var(--secondary) / 0.18)",
                border: "1px solid hsl(var(--secondary) / 0.35)",
                color: "hsl(var(--secondary))",
                letterSpacing: "0.12em",
                animation: "fadeUp 0.6s ease both",
              }}
            >
              <Calculator className="w-3.5 h-3.5 font-montserrat" />
              Trusted UK Accounting
            </div>

            {/* Headline */}
            <div
              style={{ animation: "fadeUp 0.6s 0.15s ease both", opacity: 0 }}
            >
              <h1
                className="font-bold leading-[1.05] tracking-tight font-comfortaa"
                style={{
                  fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                }}
              >
                Accounting that{" "}
                <span className="relative inline-block text-secondary">
                  works
                  {/* Underline accent */}
                  <span className="absolute left-0 -bottom-1 w-full h-[3px] rounded-full bg-secondary/70" />
                </span>{" "}
                for your business.
              </h1>
            </div>

            {/* Sub-copy */}
            <p
              className="text-white/75 leading-relaxed max-w-lg "
              style={{
                fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                animation: "fadeUp 0.6s 0.3s ease both",
                opacity: 0,
              }}
            >
              We handle the numbers so you can focus on growth. Expert
              accounting services built for UK businesses of all sizes — from
              sole traders to scaling enterprises.
            </p>

            {/* CTA row */}
            <div
              className="flex flex-wrap items-center gap-4"
              style={{ animation: "fadeUp 0.6s 0.45s ease both", opacity: 0 }}
            >
              <Button
                onClick={scrollToContact}
                size="lg"
                className="group bg-white rounded-xl text-primary hover:bg-white/90 font-semibold text-base px-8 py-5 h-auto shadow-lg transition-all duration-300"
                // style={{ borderRadius: "0.5rem" }}
              >
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <button
                onClick={scrollToContact}
                className="text-white/70 hover:text-white text-base font-medium underline underline-offset-4 transition-colors duration-200"
              >
                See how it works
              </button>
            </div>

            {/* Stats row */}
            <div
              className="flex flex-wrap gap-8 pt-2"
              style={{ animation: "fadeUp 0.6s 0.6s ease both", opacity: 0 }}
            >
              {[
                { icon: TrendingUp, value: "50+", label: "Businesses served" },
                { icon: Clock, value: "15 yrs", label: "Industry experience" },
                { icon: Shield, value: "100%", label: "HMRC compliant" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center bg-secondary/50 justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-none">
                      {value}
                    </p>
                    <p className="text-white/55 text-xs mt-0.5 leading-tight">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column: image card ── */}
          <div
            className="relative"
            style={{ animation: "slideIn 0.7s 0.25s ease both", opacity: 0 }}
          >
            {/* Offset border frame */}
            <div
              className="absolute -inset-3 rounded-3xl"
              style={{
                border: "1px solid hsl(var(--secondary) / 0.25)",
                transform: "rotate(2.5deg)",
              }}
            />

            {/* Image card */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow:
                  "0 30px 80px -10px hsl(0 0% 0% / 0.5), 0 0 0 1px hsl(var(--secondary) / 0.15)",
              }}
            >
              <img
                src={HeroImg}
                alt="Professional accounting services"
                className="w-full h-auto block"
                style={{ maxHeight: "520px", objectFit: "cover" }}
              />
              {/* Image overlay gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, hsl(var(--primary) / 0.5) 0%, transparent 50%)",
                }}
              />
            </div>

            {/* Floating pill badge */}
            <div
              className="absolute bg-white -bottom-5 left-6 right-6 flex items-center justify-between rounded-xl px-5 py-3"
              style={{
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px hsl(0 0% 0% / 0.18)",
              }}
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
                className="text-xs font-semibold px-4 py-2 rounded-lg bg-primary text-white transition-opacity hover:opacity-90"
              >
                Book now →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframe animations (injected once) ── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
