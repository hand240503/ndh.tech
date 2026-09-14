import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const featuredProjects = getFeaturedProjects();

  return (
    <main>
      <h1 className="text-3xl font-bold mb-6">Xin chào 👋</h1>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Dự án nổi bật</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Bài viết gần đây</h2>
        <ul className="space-y-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="font-medium underline">
                {post.title}
              </Link>
              <p className="text-sm text-gray-500">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
