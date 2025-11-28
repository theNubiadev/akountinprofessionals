import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to take control of your finances? Contact us today for a free consultation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8 animate-fade-in">
            <Card className="p-6 shadow-soft border-0 flex items-start gap-4 hover:shadow-card transition-smooth">
              <div className="p-3 bg-secondary/10 rounded-xl">
                <Mail className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">Email</h3>
                <a
                  href="mailto:info@akountingprofessionals.co.uk"
                  className="text-foreground/80 hover:text-secondary transition-smooth"
                >
                  info@akountingprofessionals.co.uk
                </a>
              </div>
            </Card>

            <Card className="p-6 shadow-soft border-0 flex items-start gap-4 hover:shadow-card transition-smooth">
              <div className="p-3 bg-secondary/10 rounded-xl">
                <Phone className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">Phone</h3>
                <a
                  href="tel:+442012345678"
                  className="text-foreground/80 hover:text-secondary transition-smooth"
                >
                  +44 20 1234 5678
                </a>
              </div>
            </Card>

            <Card className="p-6 shadow-soft border-0 flex items-start gap-4 hover:shadow-card transition-smooth">
              <div className="p-3 bg-secondary/10 rounded-xl">
                <MapPin className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">Location</h3>
                <p className="text-foreground/80">
                  123 Financial District<br />
                  London, EC2V 7WS<br />
                  United Kingdom
                </p>
              </div>
            </Card>

            <div className="mt-8 rounded-xl overflow-hidden shadow-card h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.9458081937877!2d-0.09177428422935835!3d51.51773897963642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cb1f1e5b645%3A0x7f7d7f4f4f4f4f4f!2sBank%20of%20England!5e0!3m2!1sen!2suk!4v1620000000000!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AkountingProfessionals Location"
              ></iframe>
            </div>
          </div>

          <Card className="p-8 shadow-card border-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-bold text-primary mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full min-h-[150px]"
                  placeholder="Tell us about your accounting needs..."
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12"
              >
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
