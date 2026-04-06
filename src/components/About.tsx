// import { CheckCircle } from "lucide-react";

// export default function About() {
//   const features = [
//     "Over 5 years of accounting expertise",
//     "Dedicated team of qualified professionals",
//     "Personalized service for every client",
//     "Cutting-edge cloud-based solutions",
//   ];

//   return (
//     <section id="about" className="py-24 bg-background">
//       <div className="container mx-auto px-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-16 animate-fade-in">
//             <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
//               About Us
//             </h2>
//             <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
//           </div>

//           <div className="space-y-8 animate-fade-in">
//             <p className="text-lg text-foreground/80 leading-relaxed">
//               At <span className="font-semibold text-primary">Akountin Professionals</span>, we are committed to providing exceptional accounting services that empower businesses to thrive. With years of experience serving UK businesses across various industries, we understand the unique challenges and opportunities that come with managing your finances.
//             </p>

//             <p className="text-lg text-foreground/80 leading-relaxed">
//               Our team of chartered accountants and financial experts works closely with each client to deliver tailored solutions that align with your business goals. Whether you're a startup finding your footing or an established enterprise looking to optimize your financial operations, we're here to support your journey.
//             </p>

//             <div className="grid sm:grid-cols-2 gap-6 mt-12">
//               {features.map((feature, index) => (
//                 <div
//                   key={index}
//                   className="flex items-start gap-3 p-6 bg-card rounded-xl shadow-soft hover:shadow-card transition-smooth"
//                   style={{ animationDelay: `${index * 0.1}s` }}
//                 >
//                   <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
//                   <span className="text-foreground font-medium">{feature}</span>
//                 </div>
//               ))}
//             </div>

//             <p className="text-lg text-foreground/80 leading-relaxed mt-8">
//               We believe in building lasting partnerships with our clients, providing not just accounting services, but strategic guidance that helps you make informed financial decisions. Your success is our success, and we're dedicated to helping you achieve your business objectives.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

import { Award, Users, Lightbulb, Cloud } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Award,
      title: "5+ Years Expertise",
      body: "Deep industry knowledge built from years of serving UK businesses across every sector.",
    },
    {
      icon: Users,
      title: "Qualified Professionals",
      body: "A dedicated team of chartered accountants who treat your finances as their own.",
    },
    {
      icon: Lightbulb,
      title: "Personalised Service",
      body: "No cookie-cutter plans — every engagement is tailored to your specific goals.",
    },
    {
      icon: Cloud,
      title: "Cloud-Based Solutions",
      body: "Real-time visibility into your numbers, anywhere, on cutting-edge platforms.",
    },
  ];

  return (
    <section id="about" className="py-28 bg-background overflow-hidden">
      <style>{`
        @keyframes fadeUpAbout {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .au-animate { animation: fadeUpAbout 0.65s ease both; }
      `}</style>

      <div className="container mx-auto px-6 lg:px-12">
        {/* ── Top: eyebrow + headline ── */}
        <div
          className="max-w-2xl mb-20 au-animate"
          style={{ animationDelay: "0s" }}
        >
          <p
            className="text-sm font-bold tracking-[0.2em] uppercase mb-4 text-secondary"
            // style={{ color: "hsl(var(--secondary))" }}
          >
            Who we are
          </p>
          <h2
            className="font-bold leading-[1.08] tracking-tight mb-6 text-primary font-comfortaa"
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)",
              // fontFamily: "'Georgia', 'Times New Roman', serif",
              color: "hsl(var(--primary))",
            }}
          >
            Built for the ambition of{" "}
            <span className="text-secondary">UK business.</span>
          </h2>
          {/* Thin rule */}
          <div className="h-[2px] w-16 rounded-full bg-secondary" />
        </div>

        {/* ── Middle: two-column copy + accent panel ── */}
        <div
          className="grid lg:grid-cols-[1fr_380px] gap-12 mb-20 au-animate"
          style={{ animationDelay: "0.15s" }}
        >
          {/* Copy */}
          <div className="space-y-6">
            <p
              className="leading-relaxed text-foreground/70"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                // color: "hsl(var(--foreground) / 0.75)",
              }}
            >
              At{" "}
              <span
                className="font-semibold text-primary font-comfortaa"
                // style={{ color: "hsl(var(--primary))" }}
              >
                Akountin Professionals
              </span>
              , we are committed to providing exceptional accounting services
              that empower businesses to thrive. With years of experience
              serving UK businesses across various industries, we understand the
              unique challenges and opportunities that come with managing your
              finances.
            </p>
            <p
              className="leading-relaxed  text-foreground/70"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.15rem) ",
              }}
            >
              Our team of chartered accountants and financial experts works
              closely with each client to deliver tailored solutions that align
              with your business goals — whether you're a startup finding your
              footing or an established enterprise looking to optimise your
              financial operations.
            </p>
            <p
              className="leading-relaxed text-foreground/70"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
              }}
            >
              We believe in building lasting partnerships that go beyond
              compliance — offering strategic guidance so you can make informed
              financial decisions with confidence. Your success is our success.
            </p>
          </div>

          {/* Accent stat panel */}
          <div
            className="rounded-2xl p-8 flex flex-col justify-between gap-8 self-start bg-primary"
            style={{
              background: "hsl(var(--primary))",
              boxShadow: "0 20px 60px -10px hsl(var(--primary) / 0.35)",
            }}
          >
            {[
              { value: "500+", label: "Clients across the UK" },
              { value: "£50M+", label: "Tax savings delivered" },
              { value: "98%", label: "Client retention rate" },
            ].map(({ value, label }, i) => (
              <div
                key={i}
                className={i !== 2 ? "pb-8 border-b" : ""}
                style={{ borderColor: "hsl(0 0% 100% / 0.12)" }}
              >
                <p
                  className="font-bold leading-none mb-1 text-secondary"
                  style={{
                    fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  }}
                >
                  {value}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "hsl(0 0% 100% / 0.6)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom: feature cards ── */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 au-animate"
          style={{ animationDelay: "0.3s" }}
        >
          {features.map(({ icon: Icon, title, body }, i) => (
            <div
              key={i}
              className="group relative rounded-xl p-6 transition-all duration-300"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                boxShadow: "0 2px 12px hsl(0 0% 0% / 0.05)",
                animationDelay: `${0.3 + i * 0.08}s`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 32px hsl(var(--primary) / 0.12)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "hsl(var(--secondary) / 0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 12px hsl(0 0% 0% / 0.05)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "hsl(var(--border))";
              }}
            >
              {/* Icon chip */}
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-secondary/20">
                <Icon className="w-5 h-5 text-secondary" />
              </div>
              <h3
                className="font-semibold mb-2 text-primary"
                style={{
                  fontSize: "0.95rem",
                }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed text-foreground/6"
                style={{ color: "hsl(var(--foreground) / 0.6)" }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
