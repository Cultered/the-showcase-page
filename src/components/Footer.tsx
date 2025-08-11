import { Mail, Heart, Linkedin } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Let's Connect</h3>
            <p className="text-muted-foreground mb-4">
              I'm always interested in new opportunities and collaborations.
              Feel free to reach out!
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/Cultered" className="text-muted-foreground hover:text-primary transition-colors">
                <SiGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/alexander-belov-55a896247/" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="mailto:mail.alexbelov@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link 
                  to="/projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>📧 mail.alexbelov@gmail.com</p>
              <p>📱 +37064156193</p>
              <p>📍 Vilnuis, Lithuania</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            © {currentYear} Alexander Belov. Made with <Heart size={16} className="text-red-500" /> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;