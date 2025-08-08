import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Server, Smartphone } from "lucide-react";

const AboutSection = () => {
  const skills = [
    "React", "TypeScript", "Node.js", "Python", "JavaScript", "CSS/SCSS", 
    "Tailwind CSS", "Express.js", "MongoDB", "PostgreSQL", "Git", "AWS"
  ];

  const services = [
    {
      icon: <Code size={40} />,
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces with modern frameworks"
    },
    {
      icon: <Server size={40} />,
      title: "Backend Development",
      description: "Building robust server-side applications and APIs"
    },
    {
      icon: <Palette size={40} />,
      title: "Shaders Design",
      description: "Designing beautiful 2D and 3D graphics using WebGL and GLSL"
    },
    {
      icon: <Smartphone size={40} />,
      title: "Mobile Responsive",
      description: "Ensuring your website works perfectly on all devices"
    }
  ];

  return (
    <section id="about" className="py-20 bg-section-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate developer with experience in creating web applications 
            that solve real-world problems. I love working with cutting-edge technologies 
            and bringing creative ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="fade-in">
            <h3 className="text-2xl font-bold mb-6">My Journey</h3>
            <p className="text-muted-foreground mb-4">
              Started my journey in web development 3 years ago, I've been passionate about 
              creating digital solutions that make a difference. My experience spans across 
              various technologies and industries.
            </p>
            <p className="text-muted-foreground mb-6">
              I enjoy the process of turning complex problems into simple, beautiful, 
              and intuitive solutions. When I'm not coding, you can find me exploring 
              new technologies or contributing to open-source projects.
            </p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Technologies I work with:</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="fade-in">
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-2xl font-bold mb-6 text-center">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">10+</div>
                  <div className="text-muted-foreground">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">2+</div>
                  <div className="text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">0</div>
                  <div className="text-muted-foreground">Happy Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">-100%</div>
                  <div className="text-muted-foreground">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in">
          {services.map((service, index) => (
            <Card key={index} className="card-hover border-border bg-card">
              <CardContent className="p-6 text-center">
                <div className="text-primary mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;