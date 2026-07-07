import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import VisionMission from "@/components/VisionMission";
import Contact from "@/components/ContactComponent";
import Footer from "@/components/Footer";
import LatestInsights from "@/components/LatestInsights";

const Index = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <VisionMission />
      <LatestInsights />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
