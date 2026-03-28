// import { Card } from "@/components/ui/card";
// import {
//   Building2,
//   FileText,
//   Receipt,
//   Cloud,
//   ClipboardCheck,
//   User,
// } from "lucide-react";
// import businessAccountingImg from "@/assets/service-business-accounting.jpg";
// import taxImg from "@/assets/service-tax.jpg";
// import vatImg from "@/assets/service-vat.jpg";
// import cloudAccountingImg from "@/assets/service-cloud-accounting.jpg";
// import auditImg from "@/assets/service-audit.jpg";
// import personalTaxImg from "@/assets/service-personal-tax.jpg";

// export default function Services() {
//   const services = [
//     {
//       icon: Building2,
//       title: "Business Accounting",
//       tag: "Core Service",
//       description:
//         "Comprehensive bookkeeping and financial management tailored to your business needs. We handle day-to-day accounting so you can focus on what matters most.",
//       image: businessAccountingImg,
//     },
//     {
//       icon: FileText,
//       title: "Business tax planning",
//       tag: "Tax Solutions",
//       description:
//         " Monitor your tax burden with strategic planning and expert  throughtout the year with Expert corporate tax planning and compliance services to minimize your tax liability while ensuring full compliance with UK tax regulations.",
//       image: taxImg,
//     },
//     {
//       icon: Receipt,
//       title: "VAT and Audit Services",
//       tag: "VAT ",
//       description:
//         "Stay compliant with VAT regulations and comprehensive audit services for peace of mind and Complete VAT registration, returns, and advisory services. We ensure accurate submissions and help you navigate complex VAT regulations with ease.",
//       image: vatImg,
//     },
//     {
//       icon: Cloud,
//       title: "Cloud Accounting",
//       tag: "Digital Solutions",
//       description:
//         "Access your finances anytime, anywhere with modern cloud based accounting technology. Modern cloud-based accounting systems that give you real-time access to your financial data anywhere, anytime. Embrace the future of accounting.",
//       image: cloudAccountingImg,
//     },
//     // {
//     //   icon: ClipboardCheck,
//     //   title: "Audit Services",
//     //   tag: "Assurance",
//     //   description: "Thorough and professional audit services that provide assurance to stakeholders. Our meticulous approach ensures accuracy and compliance.",
//     //   image: auditImg,
//     // },
//     {
//       icon: User,
//       title: "Personal Tax",
//       tag: "Individual Services",
//       description:
//         "Personal tax planning and self-assessment services designed to optimize your tax position and ensure timely, accurate submissions to HMRC.",
//       image: personalTaxImg,
//     },
//   ];

//   return (
//     <section id="services" className="py-24 bg-background font-inter">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-16 animate-fade-in">
//           <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
//             Our Services
//           </h2>
//           <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Comprehensive accounting solutions designed to support your business
//             at every stage
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <Card
//               key={index}
//               className="group overflow-hidden border-0 shadow-soft hover:shadow-card transition-smooth cursor-pointer animate-fade-in"
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <div className="relative h-56 overflow-hidden">
//                 <img
//                   src={service.image}
//                   alt={service.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
//                 />
//                 <div className="absolute inset-0 bg-primary/70"></div>
//                 <div className="absolute top-4 left-4">
//                   <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full">
//                     {service.tag}
//                   </span>
//                 </div>
//                 <div className="absolute bottom-4 left-4">
//                   <service.icon className="h-12 w-12 text-white" />
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h3 className="text-2xl font-bold text-primary mb-3">
//                   {service.title}
//                 </h3>
//                 <p className="text-foreground/80 leading-relaxed">
//                   {service.description}
//                 </p>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import {
  ArrowUpRight,
  Building2,
  FileText,
  Receipt,
  Cloud,
  User,
} from "lucide-react";
import businessAccountingImg from "@/assets/service-business-accounting.jpg";
import taxImg from "@/assets/service-tax.jpg";
import vatImg from "@/assets/service-vat.jpg";
import cloudAccountingImg from "@/assets/service-cloud-accounting.jpg";
import personalTaxImg from "@/assets/service-personal-tax.jpg";

export default function Services() {
  const services = [
    {
      icon: Building2,
      title: "Business Accounting",
      tag: "Core Service",
      description:
        "Comprehensive bookkeeping and financial management tailored to your business. We handle day-to-day accounting so you can focus on what matters most.",
      image: businessAccountingImg,
      featured: true,
    },
    {
      icon: FileText,
      title: "Business Tax Planning",
      tag: "Tax Solutions",
      description:
        "Strategic corporate tax planning and compliance to minimise your liability while staying fully aligned with UK tax regulations.",
      image: taxImg,
      featured: false,
    },
    {
      icon: Receipt,
      title: "VAT & Audit Services",
      tag: "Compliance",
      description:
        "Complete VAT registration, returns, and advisory — plus thorough audit services that give you and your stakeholders genuine peace of mind.",
      image: vatImg,
      featured: false,
    },
    {
      icon: Cloud,
      title: "Cloud Accounting",
      tag: "Digital Solutions",
      description:
        "Real-time access to your financial data from anywhere. Modern cloud-based systems that bring your accounting into the future.",
      image: cloudAccountingImg,
      featured: false,
    },
    {
      icon: User,
      title: "Personal Tax",
      tag: "Individual Services",
      description:
        "Personal tax planning and self-assessment services designed to optimise your position and ensure timely, accurate HMRC submissions.",
      image: personalTaxImg,
      featured: false,
    },
  ];

  const [featured, ...rest] = services;

  return (
    <section id="services" className="py-28 bg-background overflow-hidden">
      <style>{`
        @keyframes fadeUpSvc {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .svc-animate { animation: fadeUpSvc 0.65s ease both; }
        .svc-card-img { transition: transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94); }
        .svc-card:hover .svc-card-img { transform: scale(1.07); }
        .svc-arrow { transition: transform 0.25s ease, opacity 0.25s ease; opacity: 0; }
        .svc-card:hover .svc-arrow { transform: translate(3px,-3px); opacity: 1; }
      `}</style>

      <div className="container mx-auto px-6 lg:px-12">
        {/* ── Header ── */}
        <div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 svc-animate"
          style={{ animationDelay: "0s" }}
        >
          <div>
            <p
              className="text-sm font-bold tracking-[0.2em] uppercase mb-3"
              style={{ color: "hsl(var(--secondary))" }}
            >
              What we offer
            </p>
            <h2
              className="font-bold leading-[1.08] tracking-tight"
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontFamily: "'Georgia', 'Times New Roman', serif",
                color: "hsl(var(--primary))",
              }}
            >
              Services built for{" "}
              <span style={{ color: "hsl(var(--secondary))" }}>
                every stage
              </span>
              <br />
              of your business.
            </h2>
          </div>
          <p
            className="max-w-sm text-base leading-relaxed lg:text-right"
            style={{ color: "hsl(var(--foreground) / 0.55)" }}
          >
            Comprehensive accounting solutions — from sole traders to scaling
            enterprises.
          </p>
        </div>

        {/* ── Featured card (full-width) ── */}
        <div
          className="svc-card svc-animate group relative rounded-2xl overflow-hidden mb-5 cursor-pointer"
          style={{
            animationDelay: "0.15s",
            height: "clamp(260px, 35vw, 400px)",
            boxShadow: "0 4px 24px hsl(0 0% 0% / 0.08)",
          }}
        >
          <img
            src={featured.image}
            alt={featured.title}
            className="svc-card-img absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, hsl(var(--primary) / 0.88) 0%, hsl(var(--primary) / 0.55) 50%, transparent 100%)",
            }}
          />
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 self-start"
              style={{
                background: "hsl(var(--secondary))",
                color: "hsl(var(--secondary-foreground))",
              }}
            >
              {featured.tag}
            </span>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3
                  className="font-bold text-white mb-2 leading-tight"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {featured.title}
                </h3>
                <p className="text-white/70 max-w-lg text-sm leading-relaxed">
                  {featured.description}
                </p>
              </div>
              <div
                className="svc-arrow flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: "hsl(0 0% 100% / 0.15)" }}
              >
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Grid of remaining cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((svc, i) => (
            <div
              key={i}
              className="svc-card svc-animate group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
              style={{
                animationDelay: `${0.25 + i * 0.08}s`,
                boxShadow: "0 2px 16px hsl(0 0% 0% / 0.07)",
              }}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden flex-shrink-0">
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="svc-card-img w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "hsl(var(--primary) / 0.6)" }}
                />
                {/* Tag + arrow row */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span
                    className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                    style={{
                      background: "hsl(var(--secondary))",
                      color: "hsl(var(--secondary-foreground))",
                    }}
                  >
                    {svc.tag}
                  </span>
                  <div
                    className="svc-arrow w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "hsl(0 0% 100% / 0.15)" }}
                  >
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
                {/* Icon bottom-left */}
                <div className="absolute bottom-3 left-4">
                  <svc.icon className="w-8 h-8 text-white/80" />
                </div>
              </div>

              {/* Text */}
              <div
                className="p-5 flex flex-col gap-2 flex-1"
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderTop: "none",
                  borderRadius: "0 0 1rem 1rem",
                }}
              >
                <h3
                  className="font-bold leading-tight"
                  style={{
                    fontSize: "1.05rem",
                    color: "hsl(var(--primary))",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {svc.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "hsl(var(--foreground) / 0.6)" }}
                >
                  {svc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
