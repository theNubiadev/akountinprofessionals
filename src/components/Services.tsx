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
        "Comprehensive bookkeeping and financial management tailored to your business.",
      image: businessAccountingImg,
      featured: true,
    },
    {
      icon: FileText,
      title: "Business Tax Planning",
      tag: "Tax Solutions",
      description: "Strategic corporate tax planning and compliance.",
      image: taxImg,
    },
    {
      icon: Receipt,
      title: "VAT & Audit Services",
      tag: "Compliance",
      description:
        "VAT registration, returns, and advisory with audit services.",
      image: vatImg,
    },
    {
      icon: Cloud,
      title: "Cloud Accounting",
      tag: "Digital Solutions",
      description: "Real-time access to your financial data anywhere.",
      image: cloudAccountingImg,
    },
    {
      icon: User,
      title: "Personal Tax",
      tag: "Individual Services",
      description: "Personal tax planning and self-assessment services.",
      image: personalTaxImg,
    },
  ];

  const [featured, ...rest] = services;

  return (
    <section id="services" className="py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 animate-[fadeUp_0.6s_ease_both]">
          <div>
            <p className="text-sm font-bold tracking-[0.2em] uppercase mb-3 text-secondary">
              What we offer
            </p>

            <h2 className="font-bold leading-[1.08] tracking-tight text-primary font-comfortaa text-[clamp(2.2rem,4vw,3.5rem)]">
              Services built for{" "}
              <span className="text-secondary">every stage</span>
              <br />
              of your business.
            </h2>
          </div>

          <p className="max-w-sm text-base leading-relaxed lg:text-right text-foreground/55">
            Comprehensive accounting solutions — from sole traders to scaling
            enterprises.
          </p>
        </div>

        {/* FEATURED */}
        <div className="group relative rounded-2xl overflow-hidden mb-5 cursor-pointer h-[clamp(260px,35vw,400px)] shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
          <img
            src={featured.image}
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
            <span className="bg-secondary text-secondary-foreground text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 w-fit">
              {featured.tag}
            </span>

            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="text-white font-bold text-[clamp(1.5rem,3vw,2.25rem)] leading-tight mb-2">
                  {featured.title}
                </h3>
                <p className="text-white/70 max-w-lg text-sm">
                  {featured.description}
                </p>
              </div>

              <div className="opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300 w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((svc, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col shadow-[0_2px_16px_rgba(0,0,0,0.07)]"
            >
              {/* IMAGE */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-primary/60" />

                {/* top */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                  <span className="bg-secondary text-secondary-foreground text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
                    {svc.tag}
                  </span>

                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* icon */}
                <div className="absolute bottom-3 left-4">
                  <svc.icon className="w-8 h-8 text-white/80" />
                </div>
              </div>

              {/* TEXT */}
              <div className="p-5 flex flex-col gap-2 flex-1 bg-card border border-border border-t-0 rounded-b-2xl">
                <h3 className="font-bold text-primary text-[1.05rem] leading-tight">
                  {svc.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
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
