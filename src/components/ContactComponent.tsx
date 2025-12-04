import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin,   Facebook, Instagram , Sparkle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

 export default  function ContactComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch("https://akountinprofessionals.co.uk/api/send-email.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    if (response.ok) {
      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  } catch (error) {
    toast.error("Failed to send message. Please try again.");
  }
};
  return (
    <section id="contact" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 md:mb-6">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6 md:mb-8"></div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Ready to take control of your finances? Contact us today for a free consultation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto">
          <div className="space-y-4 md:space-y-6 animate-fade-in">
            <Card className="p-4 md:p-6 shadow-soft border-0 flex items-start gap-3 md:gap-4 hover:shadow-card transition-smooth">
              <div className="p-2 md:p-3 bg-secondary/10 rounded-xl flex-shrink-0">
                <Mail className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-base md:text-lg text-primary mb-1 md:mb-2">Email</h3>
                <a
                  href="mailto:info@akountingprofessionals.co.uk"
                  className="text-sm md:text-base text-foreground/80 hover:text-secondary transition-smooth break-words"
                >
                  info@akountingprofessionals.co.uk
                </a>
              </div>
            </Card>

            <Card className="p-4 md:p-6 shadow-soft border-0 flex items-start gap-3 md:gap-4 hover:shadow-card transition-smooth">
              <div className="p-2 md:p-3 bg-secondary/10 rounded-xl flex-shrink-0">
                <Phone className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg text-primary mb-1 md:mb-2">Phone</h3>
                <a
                  href="tel:+441707515008"
                  className="text-sm md:text-base text-foreground/80 hover:text-secondary transition-smooth"
                >
                  01707 515 008
                </a>
              </div>
            </Card>

            <Card className="p-4 md:p-6 shadow-soft border-0 flex items-start gap-3 md:gap-4 hover:shadow-card transition-smooth">
              <div className="p-2 md:p-3 bg-secondary/10 rounded-xl flex-shrink-0">
                <MapPin className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg text-primary mb-1 md:mb-2">Location</h3>
                <p className="text-sm md:text-base text-foreground/80">
                  De Havilland Campus, Mosquito Way, Hatfield AL10 9EU
                </p>
              </div>
            </Card>

          <Card className="p-4 md:p-6 shadow-soft border-0 flex items-start gap-3 md:gap-4 hover:shadow-card transition-smooth">
            <div className="p-2 md:p-3 bg-secondary/10 rounded-xl flex-shrink-0">
                <Sparkle className="h-5 w-5 md:h-6 md:w-6 text-secondary justify-center text-center" />
              </div>    
              
                <div className=" gap-2 justify-center space-x-2 my-2">
                <a
                    href="https://www.facebook.com/p/Akountin-Professionals-61584319305259/"
                    className="text-sm md:text-base text-foreground/80 hover:text-secondary transition-smooth"
                  >
                    <Facebook className="inline h-5 w-5 md:h-6 md:w-6 text-secondary mr-2" />
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/akountinprofessionals01/"
                    className="text-sm md:text-base text-foreground/80 hover:text-secondary transition-smooth"
                  >
                    <Instagram className="inline h-5 w-5 md:h-6 md:w-6 text-secondary mr-2" />
                    Instagram
                  </a>  
              </div>
          </Card>
            <div className="mt-6 md:mt-8 rounded-xl overflow-hidden shadow-card h-[250px] md:h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4147.880644312872!2d-0.2534125551094128!3d51.761637577952456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48763c77560f5c5d%3A0x920062dec58d913!2sDe%20Havilland%20Campus%2C%20Mosquito%20Way%2C%20Hatfield%20AL10%209EU%2C%20UK!5e1!3m2!1sen!2sng!4v1764409337606!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AkountingProfessionals Office Location"
              ></iframe>
            </div>
          </div>

          <Card className="p-6 md:p-8 shadow-card border-0 animate-fade-in">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} 
              className="space-y-4 md:space-y-6">
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
                  className="w-full min-h-[120px] md:min-h-[150px]"
                  placeholder="Tell us about your accounting needs..."
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 md:h-12"
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

