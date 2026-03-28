// import { Target, Eye } from "lucide-react";
// import { Card } from "@/components/ui/card";

// export default function VisionMission()  {
//   return (
//     <section id="vision-mission" className="py-24 bg-muted/30 font-inter">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-16 animate-fade-in">
//           <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
//             Vision & Mission
//           </h2>
//           <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
//           <Card className="p-8 shadow-card border-0 animate-fade-in hover:translate-y-[-4px] transition-smooth">
//             <div className="flex items-center gap-4 mb-6">
//               <div className="p-4 bg-secondary/10 rounded-xl">
//                 <Eye className="h-8 w-8 text-secondary" />
//               </div>
//               <h3 className="text-3xl font-bold text-primary">Our Vision</h3>
//             </div>
//             <p className="text-lg text-foreground/80 leading-relaxed">
//               To be the most trusted and innovative accounting firm in the UK, recognized for our commitment to excellence, integrity, and client success. We envision a future where every business, regardless of size, has access to world-class accounting services that empower growth and financial stability.
//             </p>
//           </Card>

//           <Card className="p-8 shadow-card border-0 animate-fade-in hover:translate-y-[-4px] transition-smooth" style={{ animationDelay: "0.2s" }}>
//             <div className="flex items-center gap-4 mb-6">
//               <div className="p-4 bg-primary/10 rounded-xl">
//                 <Target className="h-8 w-8 text-primary" />
//               </div>
//               <h3 className="text-3xl font-bold text-primary">Our Mission</h3>
//             </div>
//             <p className="text-lg text-foreground/80 leading-relaxed">
//               To deliver exceptional accounting services that drive business success through expert guidance, innovative solutions, and unwavering dedication to our clients. We strive to simplify complex financial matters, ensure compliance, and provide strategic insights that enable our clients to make confident, informed decisions for sustainable growth.
//             </p>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// };

import { Target, Eye } from "lucide-react";

export default function VisionMission() {
  return (
    <section id="vision-mission" className="relative py-28 overflow-hidden">
      <style>{`
        @keyframes fadeUpVM {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .vm-animate { animation: fadeUpVM 0.65s ease both; }
      `}</style>

      {/* ── Full-bleed primary background ── */}
      <div
        className="absolute inset-0"
        style={{ background: "hsl(var(--primary))" }}
      />

      {/* Decorative circles */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--secondary) / 0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(0 0% 100% / 0.05) 0%, transparent 70%)",
        }}
      />

      {/* Subtle horizontal rule texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 59px, hsl(0 0% 100% / 0.03) 60px)",
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* ── Header ── */}
        <div className="mb-16 vm-animate" style={{ animationDelay: "0s" }}>
          <p
            className="text-sm font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: "hsl(var(--secondary))" }}
          >
            Our purpose
          </p>
          <h2
            className="font-bold leading-[1.08] tracking-tight text-white"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontFamily: "'Georgia', 'Times New Roman', serif",
            }}
          >
            Where we're going &{" "}
            <span style={{ color: "hsl(var(--secondary))" }}>
              why it matters.
            </span>
          </h2>
        </div>

        {/* ── Two panels ── */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Vision */}
          <div
            className="vm-animate group relative rounded-2xl p-8 lg:p-10 flex flex-col gap-6 transition-all duration-300"
            style={{
              animationDelay: "0.15s",
              background: "hsl(0 0% 100% / 0.06)",
              border: "1px solid hsl(0 0% 100% / 0.1)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "hsl(0 0% 100% / 0.1)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "hsl(var(--secondary) / 0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "hsl(0 0% 100% / 0.06)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "hsl(0 0% 100% / 0.1)";
            }}
          >
            {/* Label row */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "hsl(var(--secondary) / 0.18)" }}
              >
                <Eye
                  className="w-6 h-6"
                  style={{ color: "hsl(var(--secondary))" }}
                />
              </div>
              <div>
                <p
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: "hsl(var(--secondary))" }}
                >
                  01
                </p>
                <h3
                  className="font-bold text-white leading-tight"
                  style={{
                    fontSize: "1.6rem",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  Our Vision
                </h3>
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-px w-full"
              style={{ background: "hsl(0 0% 100% / 0.1)" }}
            />

            <p
              className="leading-relaxed flex-1"
              style={{
                fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
                color: "hsl(0 0% 100% / 0.7)",
              }}
            >
              To be the most trusted and innovative accounting firm in the UK,
              recognised for our commitment to excellence, integrity, and client
              success. We envision a future where every business — regardless of
              size — has access to world-class accounting services that empower
              growth and financial stability.
            </p>

            {/* Decorative quote mark */}
            <p
              className="absolute top-6 right-8 select-none pointer-events-none font-bold leading-none"
              style={{
                fontSize: "8rem",
                color: "hsl(var(--secondary) / 0.07)",
                fontFamily: "'Georgia', serif",
                lineHeight: 1,
              }}
            >
              "
            </p>
          </div>

          {/* Mission */}
          <div
            className="vm-animate group relative rounded-2xl p-8 lg:p-10 flex flex-col gap-6 transition-all duration-300"
            style={{
              animationDelay: "0.28s",
              background: "hsl(var(--secondary) / 0.12)",
              border: "1px solid hsl(var(--secondary) / 0.25)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "hsl(var(--secondary) / 0.18)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "hsl(var(--secondary) / 0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "hsl(var(--secondary) / 0.12)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "hsl(var(--secondary) / 0.25)";
            }}
          >
            {/* Label row */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "hsl(0 0% 100% / 0.12)" }}
              >
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: "hsl(var(--secondary))" }}
                >
                  02
                </p>
                <h3
                  className="font-bold text-white leading-tight"
                  style={{
                    fontSize: "1.6rem",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  Our Mission
                </h3>
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-px w-full"
              style={{ background: "hsl(0 0% 100% / 0.12)" }}
            />

            <p
              className="leading-relaxed flex-1"
              style={{
                fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
                color: "hsl(0 0% 100% / 0.7)",
              }}
            >
              To deliver exceptional accounting services that drive business
              success through expert guidance, innovative solutions, and
              unwavering dedication to our clients. We simplify complex
              financial matters, ensure compliance, and provide strategic
              insights that enable confident, informed decisions for sustainable
              growth.
            </p>

            {/* Decorative quote mark */}
            <p
              className="absolute top-6 right-8 select-none pointer-events-none font-bold"
              style={{
                fontSize: "8rem",
                color: "hsl(0 0% 100% / 0.05)",
                fontFamily: "'Georgia', serif",
                lineHeight: 1,
              }}
            >
              "
            </p>
          </div>
        </div>

        {/* ── Bottom connecting statement ── */}
        <div
          className="mt-12 text-center vm-animate"
          style={{ animationDelay: "0.4s" }}
        >
          <p
            className="text-sm tracking-widest uppercase font-semibold"
            style={{ color: "hsl(0 0% 100% / 0.3)" }}
          >
            Akountin Professionals — Excellence in every number
          </p>
        </div>
      </div>
    </section>
  );
}
