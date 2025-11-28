import { Target, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";

const VisionMission = () => {
  return (
    <section id="vision-mission" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Vision & Mission
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 shadow-card border-0 animate-fade-in hover:translate-y-[-4px] transition-smooth">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-secondary/10 rounded-xl">
                <Eye className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-3xl font-bold text-primary">Our Vision</h3>
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed">
              To be the most trusted and innovative accounting firm in the UK, recognized for our commitment to excellence, integrity, and client success. We envision a future where every business, regardless of size, has access to world-class accounting services that empower growth and financial stability.
            </p>
          </Card>

          <Card className="p-8 shadow-card border-0 animate-fade-in hover:translate-y-[-4px] transition-smooth" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-primary/10 rounded-xl">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-primary">Our Mission</h3>
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed">
              To deliver exceptional accounting services that drive business success through expert guidance, innovative solutions, and unwavering dedication to our clients. We strive to simplify complex financial matters, ensure compliance, and provide strategic insights that enable our clients to make confident, informed decisions for sustainable growth.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
