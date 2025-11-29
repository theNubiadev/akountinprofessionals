const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground font-inter py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">AkountinProfessionals</h3>
            <p className="text-primary-foreground/80">
              Expert accounting services built for UK businesses of all sizes.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Services
                </a>
              </li>
              <li>
                <a href="#vision-mission" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Vision & Mission
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>50 Campion Road Hatfield AL105FT </li>
              <li className="mt-4">
                <a href="tel:+442012345678" className="hover:text-primary-foreground transition-smooth">
            01707515008
                </a>
              </li>
              <li>info@akountinprofessionals.co.uk </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-primary-foreground/80">
            © {currentYear} AkountinProfessionals. All rights reserved. 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
