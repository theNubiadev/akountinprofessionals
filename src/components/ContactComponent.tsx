// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Mail, Phone, MapPin,   Facebook, Instagram , Sparkle } from "lucide-react";
// import { useState } from "react";
// import { toast } from "sonner";

//  export default  function ContactComponent() {

//   const [sending, setSending] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSending(true);

//     try {
//       const response = await fetch(
//         "https://akountinprofessionals.co.uk/api/send-email.php",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       const data = await response.json();

//       if (response.ok && data.status === "success") {
//         toast.success("Thank you for your message! We'll get back to you soon.");
//         setFormData({ name: "", email: "", message: "" });
//       } else {
//         toast.error(data.message || "Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       toast.error("Failed to send message. Please try again.");
//       console.error(error);
//     } finally {
//       setSending(false);
//     }
//   };
//   return (
//     <section id="contact" className="py-12 md:py-24 bg-background">
//       <div className="container mx-auto px-4 sm:px-6">
//         <div className="text-center mb-8 md:mb-16 animate-fade-in">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 md:mb-6">
//             Get In Touch
//           </h2>
//           <div className="w-24 h-1 bg-secondary mx-auto mb-6 md:mb-8"></div>
//           <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
//             Ready to take control of your finances? Contact us today for a free consultation
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto">
//           <div className="space-y-4 md:space-y-6 animate-fade-in">
//             <Card className="p-4 md:p-6 shadow-soft border-0 flex items-start gap-3 md:gap-4 hover:shadow-card transition-smooth">
//               <div className="p-2 md:p-3 bg-secondary/10 rounded-xl flex-shrink-0">
//                 <Mail className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
//               </div>
//               <div className="min-w-0">
//                 <h3 className="font-semibold text-base md:text-lg text-primary mb-1 md:mb-2">Email</h3>
//                 <a
//                   href="mailto:info@akountingprofessionals.co.uk"
//                   className="text-sm md:text-base text-foreground/80 hover:text-secondary transition-smooth break-words"
//                 >
//                   info@akountingprofessionals.co.uk
//                 </a>
//               </div>
//             </Card>

//             <Card className="p-4 md:p-6 shadow-soft border-0 flex items-start gap-3 md:gap-4 hover:shadow-card transition-smooth">
//               <div className="p-2 md:p-3 bg-secondary/10 rounded-xl flex-shrink-0">
//                 <Phone className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-base md:text-lg text-primary mb-1 md:mb-2">Phone</h3>
//                 <a
//                   href="tel:+441707515008"
//                   className="text-sm md:text-base text-foreground/80 hover:text-secondary transition-smooth"
//                 >
//                   01707 515 008
//                 </a>
//               </div>
//             </Card>

//             <Card className="p-4 md:p-6 shadow-soft border-0 flex items-start gap-3 md:gap-4 hover:shadow-card transition-smooth">
//               <div className="p-2 md:p-3 bg-secondary/10 rounded-xl flex-shrink-0">
//                 <MapPin className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-base md:text-lg text-primary mb-1 md:mb-2">Location</h3>
//                 <p className="text-sm md:text-base text-foreground/80">
//                   De Havilland Campus, Mosquito Way, Hatfield AL10 9EU
//                 </p>
//               </div>
//             </Card>

//           <Card className="p-4 md:p-6 shadow-soft border-0 flex items-start gap-3 md:gap-4 hover:shadow-card transition-smooth">
//             <div className="p-2 md:p-3 bg-secondary/10 rounded-xl flex-shrink-0">
//                 <Sparkle className="h-5 w-5 md:h-6 md:w-6 text-secondary justify-center text-center" />
//               </div>

//                 <div className=" gap-2 justify-center space-x-2 my-2">
//                 <a
//                     href="https://www.facebook.com/p/Akountin-Professionals-61584319305259/"
//                     className="text-sm md:text-base text-foreground/80 hover:text-secondary transition-smooth"
//                   >
//                     <Facebook className="inline h-5 w-5 md:h-6 md:w-6 text-secondary mr-2" />
//                     Facebook
//                   </a>
//                   <a
//                     href="https://www.instagram.com/akountinprofessionals01/"
//                     className="text-sm md:text-base text-foreground/80 hover:text-secondary transition-smooth"
//                   >
//                     <Instagram className="inline h-5 w-5 md:h-6 md:w-6 text-secondary mr-2" />
//                     Instagram
//                   </a>
//               </div>
//           </Card>
//             <div className="mt-6 md:mt-8 rounded-xl overflow-hidden shadow-card h-[250px] md:h-[300px]">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4147.880644312872!2d-0.2534125551094128!3d51.761637577952456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48763c77560f5c5d%3A0x920062dec58d913!2sDe%20Havilland%20Campus%2C%20Mosquito%20Way%2C%20Hatfield%20AL10%209EU%2C%20UK!5e1!3m2!1sen!2sng!4v1764409337606!5m2!1sen!2sng"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="AkountingProfessionals Office Location"
//               ></iframe>
//             </div>
//           </div>

// <Card className="p-6 md:p-8 shadow-card border-0 animate-fade-in">
//             <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6">
//               Send us a message
//             </h3>
//             <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
//                   Name
//                 </label>
//                 <Input
//                   id="name"
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   placeholder="Your name"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
//                   Email
//                 </label>
//                 <Input
//                   id="email"
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   placeholder="your.email@example.com"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
//                   Message
//                 </label>
//                 <Textarea
//                   id="message"
//                   required
//                   value={formData.message}
//                   onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                   placeholder="Tell us about your accounting needs..."
//                   className="min-h-[120px] md:min-h-[150px]"
//                 />
//               </div>
//               <Button
//                 type="submit"
//                 disabled={sending}
//                 className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 md:h-12"
//               >
//                 {sending ? "Sending Message..." : "Send Message"}
//               </Button>
//             </form>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// };

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  ArrowRight,
  Send,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactComponent() {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await fetch(
        "https://akountinprofessionals.co.uk/api/send-email.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const data = await response.json();
      if (response.ok && data.status === "success") {
        toast.success("Thank you! We'll be in touch soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const contacts = [
    {
      icon: Mail,
      label: "Email us",
      value: "info@akountingprofessionals.co.uk",
      href: "mailto:info@akountingprofessionals.co.uk",
    },
    {
      icon: Phone,
      label: "Call us",
      value: "01707 515 008",
      href: "tel:+441707515008",
    },
    {
      icon: MapPin,
      label: "Visit us",
      value: "De Havilland Campus, Mosquito Way, Hatfield AL10 9EU",
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-28 overflow-hidden bg-background"
    >
      <style>{`
        @keyframes fadeUpCt {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ct-animate { animation: fadeUpCt 0.65s ease both; }

        .ct-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.625rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          font-size: 0.9375rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ct-input::placeholder { color: hsl(var(--foreground) / 0.35); }
        .ct-input:focus {
          border-color: hsl(var(--secondary));
          box-shadow: 0 0 0 3px hsl(var(--secondary) / 0.12);
        }
        .ct-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: hsl(var(--primary));
          margin-bottom: 0.5rem;
        }
      `}</style>

      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-[45%] h-full pointer-events-none"
        style={{
          background: "hsl(var(--primary) / 0.03)",
          borderLeft: "1px solid hsl(var(--border))",
        }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--secondary) / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* ── Header ── */}
        <div className="mb-16 ct-animate" style={{ animationDelay: "0s" }}>
          <p className="text-sm font-bold tracking-[0.2em] uppercase mb-3 text-secondary">
            Let's talk
          </p>
          <h2 className="font-bold leading-[1.08] tracking-tight text-primary text-[clamp(2.2rem,4vw,3.5rem)] font-comfortaa ">
            Ready to take control of{" "}
            <span className="text-secondary">your finances?</span>
          </h2>
        </div>

        {/* ── Two columns ── */}
        <div className="grid lg:grid-cols-[1fr_480px] gap-12 xl:gap-20 items-start">
          {/* ── Left: info ── */}
          <div className="space-y-10">
            {/* Contact rows */}
            <div
              className="space-y-5 ct-animate"
              style={{ animationDelay: "0.15s" }}
            >
              {contacts.map(({ icon: Icon, label, value, href }, i) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div
                    className="bg-secondary/1 w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      border: "1px solid hsl(var(--secondary) / 0.2)",
                    }}
                  >
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p
                      className="text-xs font-bold tracking-widest uppercase mb-0.5 text-foreground/40"
                      style={{ color: "hsl(var(--foreground) / 0.4)" }}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-base font-medium transition-colors duration-200"
                        style={{ color: "hsl(var(--foreground) / 0.85)" }}
                        onMouseEnter={(e) =>
                          ((e.target as HTMLElement).style.color =
                            "hsl(var(--secondary))")
                        }
                        onMouseLeave={(e) =>
                          ((e.target as HTMLElement).style.color =
                            "hsl(var(--foreground) / 0.85)")
                        }
                      >
                        {value}
                      </a>
                    ) : (
                      <p
                        className="text-base font-medium"
                        style={{ color: "hsl(var(--foreground) / 0.85)" }}
                      >
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div
              className="h-px ct-animate"
              style={{
                background: "hsl(var(--border))",
                animationDelay: "0.25s",
              }}
            />

            {/* Social links */}
            <div className="ct-animate" style={{ animationDelay: "0.3s" }}>
              <p className="text-xs font-bold tracking-widest uppercase mb-4 text-foreground/4">
                Follow us
              </p>
              <div className="flex gap-3">
                {[
                  {
                    icon: Facebook,
                    href: "https://www.facebook.com/p/Akountin-Professionals-61584319305259/",
                    label: "Facebook",
                  },
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/akountinprofessionals01/",
                    label: "Instagram",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-foreground/7 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={{
                      border: "1px solid hsl(var(--border))",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "hsl(var(--secondary) / 0.5)";
                      el.style.color = "hsl(var(--secondary))";
                      el.style.background = "hsl(var(--secondary) / 0.06)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "hsl(var(--border))";
                      el.style.color = "hsl(var(--foreground) / 0.7)";
                      el.style.background = "transparent";
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div
              className="rounded-2xl overflow-hidden ct-animate"
              style={{
                height: "260px",
                animationDelay: "0.35s",
                border: "1px solid hsl(var(--border))",
                boxShadow: "0 4px 20px hsl(0 0% 0% / 0.06)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4147.880644312872!2d-0.2534125551094128!3d51.761637577952456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48763c77560f5c5d%3A0x920062dec58d913!2sDe%20Havilland%20Campus%2C%20Mosquito%20Way%2C%20Hatfield%20AL10%209EU%2C%20UK!5e1!3m2!1sen!2sng!4v1764409337606!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Akountin Professionals Office Location"
              />
            </div>
          </div>

          {/* ── Right: form ── */}
          <div
            className="ct-animate rounded-2xl p-8 lg:p-10 bg-primary"
            style={{
              animationDelay: "0.2s",
              boxShadow: "0 24px 64px -12px hsl(var(--primary) / 0.4)",
            }}
          >
            <h3 className="font-bold text-white mb-1 text-[1.5rem] ">
              Send us a message
            </h3>
            <p className="text-sm mb-8 text-[hsl(0 0% 100% / 0.5)]">
              We'll respond within one business day.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  className="ct-label text-white"
                  style={{ color: "hsl(0 0% 100% / 0.5)" }}
                >
                  Your name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jane Smith"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="ct-input text-white"
                  style={{
                    background: "hsl(0 0% 100% / 0.07)",
                    borderColor: "hsl(0 0% 100% / 0.12)",
                    // color: "white",
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="ct-label"
                  style={{ color: "hsl(0 0% 100% / 0.5)" }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@company.co.uk"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="ct-input text-white"
                  style={{
                    background: "hsl(0 0% 100% / 0.07)",
                    borderColor: "hsl(0 0% 100% / 0.12)",
                    // color: "white",
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className="ct-label"
                  style={{ color: "hsl(0 0% 100% / 0.5)" }}
                >
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about your accounting needs..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="ct-input"
                  style={{
                    background: "hsl(0 0% 100% / 0.07)",
                    borderColor: "hsl(0 0% 100% / 0.12)",
                    color: "white",
                    resize: "vertical",
                    minHeight: "130px",
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200"
                style={{
                  background: "hsl(var(--secondary))",
                  color: "hsl(var(--secondary-foreground))",
                  opacity: sending ? 0.7 : 1,
                  cursor: sending ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 20px hsl(var(--secondary) / 0.35)",
                }}
                onMouseEnter={(e) => {
                  if (!sending)
                    (e.currentTarget as HTMLElement).style.opacity = "0.88";
                }}
                onMouseLeave={(e) => {
                  if (!sending)
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
              >
                {sending ? (
                  <>Sending…</>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
