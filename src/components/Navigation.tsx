import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">Portfolio</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`transition-colors ${
                location.pathname === "/" 
                  ? "text-primary font-semibold" 
                  : "text-foreground hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${
                location.pathname === "/about" 
                  ? "text-primary font-semibold" 
                  : "text-foreground hover:text-primary"
              }`}
            >
              About Me
            </Link>
            <Link
              to="/projects"
              className={`transition-colors ${
                location.pathname === "/projects" 
                  ? "text-primary font-semibold" 
                  : "text-foreground hover:text-primary"
              }`}
            >
              My Projects
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`text-left transition-colors ${
                  location.pathname === "/" 
                    ? "text-primary font-semibold" 
                    : "text-foreground hover:text-primary"
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className={`text-left transition-colors ${
                  location.pathname === "/about" 
                    ? "text-primary font-semibold" 
                    : "text-foreground hover:text-primary"
                }`}
              >
                About Me
              </Link>
              <Link
                to="/projects"
                onClick={() => setIsOpen(false)}
                className={`text-left transition-colors ${
                  location.pathname === "/projects" 
                    ? "text-primary font-semibold" 
                    : "text-foreground hover:text-primary"
                }`}
              >
                My Projects
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;