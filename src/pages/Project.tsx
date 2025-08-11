import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { projects } from "@/data/projects";

const Project = () => {
  const { id } = useParams();

  const project = projects.find(p => p.id === parseInt(id || "0"));

  if (!project) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Button asChild>
            <a href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <Button asChild className="mb-6">
            <a href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </a>
          </Button>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-glow">{project.title}</h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-4xl">
              {project.description}
            </p>
            
            <div className="flex gap-4 mb-8">
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <SiGithub size={16} className="mr-2" />
                  View Code
                </a>
              </Button>
            </div>
          </div>

          <div className="w-full">
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
              <div className="bg-muted px-4 py-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-sm text-muted-foreground">{project.iframeUrl}</span>
                </div>
              </div>
              <iframe
                src={project.iframeUrl}
                className="w-full h-[600px] border-0"
                title={project.title}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Project;