import { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Send } from "lucide-react";
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
        toast.error(data.message || "Something went wrong.");
      }
    } catch {
      toast.error("Failed to send message.");
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
      {/* Background */}
      <div className="absolute top-0 right-0 w-[45%] h-full bg-primary/5 border-l border-border pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[radial-gradient(circle,hsl(var(--secondary)/0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="mb-16 animate-[fadeUp_0.65s_ease_both]">
          <p className="text-sm font-bold tracking-[0.2em] uppercase mb-3 text-secondary">
            Let's talk
          </p>
          <h2 className="font-bold leading-[1.08] tracking-tight text-primary text-[clamp(2.2rem,4vw,3.5rem)] font-comfortaa">
            Ready to take control of{" "}
            <span className="text-secondary">your finances?</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_480px] gap-12 xl:gap-20 items-start">
          {/* LEFT */}
          <div className="space-y-10">
            {/* Contacts */}
            <div className="space-y-5 animate-[fadeUp_0.65s_0.15s_ease_both]">
              {contacts.map(({ icon: Icon, label, value, href }, i) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-secondary/20 bg-secondary/10">
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>

                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase mb-1 text-foreground/40">
                      {label}
                    </p>

                    {href ? (
                      <a
                        href={href}
                        className="text-base font-medium text-foreground/85 hover:text-secondary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-base font-medium text-foreground/85">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-border animate-[fadeUp_0.65s_0.25s_ease_both]" />

            {/* Social */}
            <div className="animate-[fadeUp_0.65s_0.3s_ease_both]">
              <p className="text-xs font-bold tracking-widest uppercase mb-4 text-foreground/40">
                Follow us
              </p>

              <div className="flex gap-3">
                {[
                  {
                    icon: Facebook,
                    href: "#",
                    label: "Facebook",
                  },
                  {
                    icon: Instagram,
                    href: "#",
                    label: "Instagram",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-border text-foreground/70 hover:border-secondary/50 hover:text-secondary hover:bg-secondary/10 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-sm h-[260px] animate-[fadeUp_0.65s_0.35s_ease_both]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4147.880644312872!2d-0.2534125551094128!3d51.761637577952456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48763c77560f5c5d%3A0x920062dec58d913!2sDe%20Havilland%20Campus%2C%20Mosquito%20Way%2C%20Hatfield%20AL10%209EU%2C%20UK!5e1!3m2!1sen!2sng!4v1764409337606!5m2!1sen!2sng"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="rounded-2xl p-8 lg:p-10 bg-primary shadow-[0_24px_64px_-12px_hsl(var(--primary)/0.4)] animate-[fadeUp_0.65s_0.2s_ease_both]">
            <h3 className="font-bold text-white text-xl mb-1">
              Send us a message
            </h3>
            <p className="text-sm text-white/50 mb-8">
              We'll respond within one business day.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-white/50">
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
                  className="w-full px-4 py-3 rounded-lg text-white bg-white/10 border border-white/15 placeholder:text-white/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-white/50">
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
                  className="w-full px-4 py-3 rounded-lg text-white bg-white/10 border border-white/15 placeholder:text-white/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-white/50">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg text-white bg-white/10 border border-white/15 placeholder:text-white/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none resize-y min-h-[130px]"
                  placeholder="Tell us about your accounting needs..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm bg-secondary text-secondary-foreground shadow-lg hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed transition"
              >
                {sending ? (
                  "Sending…"
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
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
