import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsIndexPage() {
  const projects = getAllProjects();

  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">Portfolio</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
