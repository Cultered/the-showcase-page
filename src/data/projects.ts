import TriangleIcon from "../assets/triangles.png";
import Stemlab from "../assets/stemlab.png";
import MCBuilder from "../assets/mcbuilder.jpg";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  iframeUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "WebGPU Interactive Triangles Background",
    description: "WebGPu and WGSL powered interactive background with moving triangles.",
    image: TriangleIcon,
    technologies: ["WebGPU", "WGSL", "JavaScript"],
    liveUrl: "https://cultered.github.io/WebGPU-Scenes/Triangles.html",
    githubUrl: "https://github.com/Cultered/WebGPU-Scenes/blob/main/Triangles.html",
    iframeUrl: "https://cultered.github.io/WebGPU-Scenes/Triangles.html"
  },
  {
    id: 2,
    title: "OOTB Landing Page",
    description: "Responsive, modern, dynamic, yet still design with pure HTML and CSS",
    image: Stemlab,
    technologies: ["HTML", "CSS", "JavaScript", "Figma"],
    liveUrl: "https://stemlab.ge/stemlab-summer/",
    githubUrl: "",
    iframeUrl: "https://stemlab.ge/stemlab-summer/"
  },
  {
    id: 3,
    title: "MC Functional Builder",
    description: "Plot any 3D function, parametric or explicit in your Minecraft World with 1 click",
    image: MCBuilder,
    technologies: ["Python", "Discrete Mathematics"],
    liveUrl: "",
    githubUrl: "https://github.com/Cultered/minecraft-structure-builder",
    iframeUrl: ""
  }
];