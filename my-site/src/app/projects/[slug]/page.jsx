import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import BlogContent from "@/components/BlogContent";

export function generateStaticParams() {
  return getAllProjectSlugs();
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return (
    <main>
      <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
      <p className="text-gray-600 mb-1">{project.role}</p>
      {project.tech.length > 0 && (
        <p className="text-sm text-gray-500 mb-4">
          {project.tech.join(" · ")}
        </p>
      )}
      <div className="flex gap-4 mb-6">
        {project.liveUrl && (
          <a href={project.liveUrl} className="underline text-blue-600">
            Live demo
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} className="underline text-blue-600">
            Repo
          </a>
        )}
      </div>
      <BlogContent html={project.contentHtml} />
    </main>
  );
}
