import { Card } from "@/components/ui/card";
import { Building2, FileText, Receipt, Cloud, ClipboardCheck, User } from "lucide-react";
import businessAccountingImg from "@/assets/service-business-accounting.jpg";
import taxImg from "@/assets/service-tax.jpg";
import vatImg from "@/assets/service-vat.jpg";
import cloudAccountingImg from "@/assets/service-cloud-accounting.jpg";
import auditImg from "@/assets/service-audit.jpg";
import personalTaxImg from "@/assets/service-personal-tax.jpg";

const Services = () => {
  const services = [
    {
      icon: Building2,
      title: "Business Accounting",
      tag: "Core Service",
      description: "Comprehensive bookkeeping and financial management tailored to your business needs. We handle day-to-day accounting so you can focus on what matters most.",
      image: businessAccountingImg,
    },
    {
      icon: FileText,
      title: "Business tax planning",
      tag: "Tax Solutions",
      description: " Monitor your tax burden with strategic planning and expert  throughtout the year with Expert corporate tax planning and compliance services to minimize your tax liability while ensuring full compliance with UK tax regulations.",
      image: taxImg,
    },
    {
      icon: Receipt,
      title: "VAT and Audit Services",
      tag: "VAT ",
      description: "Stay compliant with VAT regulations and comprehensive audit services for peace of mind and Complete VAT registration, returns, and advisory services. We ensure accurate submissions and help you navigate complex VAT regulations with ease.",
      image: vatImg,
    },
    {
      icon: Cloud,
      title: "Cloud Accounting",
      tag: "Digital Solutions",
      description: "Access your finances anytime, anywhere with modern cloud based accounting technology. Modern cloud-based accounting systems that give you real-time access to your financial data anywhere, anytime. Embrace the future of accounting.",
      image: cloudAccountingImg,
    },
    // {
    //   icon: ClipboardCheck,
    //   title: "Audit Services",
    //   tag: "Assurance",
    //   description: "Thorough and professional audit services that provide assurance to stakeholders. Our meticulous approach ensures accuracy and compliance.",
    //   image: auditImg,
    // },
    {
      icon: User,
      title: "Personal Tax",
      tag: "Individual Services",
      description: "Personal tax planning and self-assessment services designed to optimize your tax position and ensure timely, accurate submissions to HMRC.",
      image: personalTaxImg,
    },
  ];

  return (
    <section id="services" className="py-24 bg-background font-inter">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive accounting solutions designed to support your business at every stage
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 shadow-soft hover:shadow-card transition-smooth cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
                />
                <div className="absolute inset-0 bg-primary/70"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full">
                    {service.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <service.icon className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-foreground/80 leading-relaxed">{service.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
