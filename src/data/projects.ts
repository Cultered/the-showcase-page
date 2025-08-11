import TriangleIcon from "../assets/triangles.png";

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
  }
];