import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import FractalBackground from "./FractalBackground";

const HeroSection = () => {

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Fractal background */}
      <div className="absolute inset-0 z-0">
        <FractalBackground />
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/20 z-10"></div>

      {/* Background decorative elements - reduced opacity since we have fractal background */}
      <div className="absolute inset-0 opacity-5 z-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-30">
        <div className="fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
            Hi, I'm <span className="text-accent">Alexander Belov</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
            Front-End Developer passionate about creating beautiful, functional web experiences
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link to="/projects">View My Work</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              Contact Me
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
              <a href="https://github.com/Cultered" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/alexander-belov-55a896247/" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="mailto:mail.alexbelov@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={24} />
              </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
        <ArrowDown className="text-white/80" size={24} />
      </div>
    </section>
  );
};

export default HeroSection;