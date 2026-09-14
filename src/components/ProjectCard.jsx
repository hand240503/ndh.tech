export default function ProjectCard({ project }) {
  return (
    <a
      href={`/projects/${project.slug}`}
      className="block border rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <h3 className="font-semibold">{project.title}</h3>
      <p className="text-sm text-gray-500">{project.role}</p>
      {project.tech.length > 0 && (
        <p className="text-xs text-gray-400 mt-1">{project.tech.join(" · ")}</p>
      )}
    </a>
  );
}
