import { CheckCircle } from "lucide-react";

const About = () => {
  const features = [
    "Over 5 years of accounting expertise",
    "Dedicated team of qualified professionals",
    "Personalized service for every client",
    "Cutting-edge cloud-based solutions",
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              About Us
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          </div>

          <div className="space-y-8 animate-fade-in">
            <p className="text-lg text-foreground/80 leading-relaxed">
              At <span className="font-semibold text-primary">Akountin Professionals</span>, we are committed to providing exceptional accounting services that empower businesses to thrive. With years of experience serving UK businesses across various industries, we understand the unique challenges and opportunities that come with managing your finances.
            </p>

            <p className="text-lg text-foreground/80 leading-relaxed">
              Our team of chartered accountants and financial experts works closely with each client to deliver tailored solutions that align with your business goals. Whether you're a startup finding your footing or an established enterprise looking to optimize your financial operations, we're here to support your journey.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-6 bg-card rounded-xl shadow-soft hover:shadow-card transition-smooth"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <p className="text-lg text-foreground/80 leading-relaxed mt-8">
              We believe in building lasting partnerships with our clients, providing not just accounting services, but strategic guidance that helps you make informed financial decisions. Your success is our success, and we're dedicated to helping you achieve your business objectives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
