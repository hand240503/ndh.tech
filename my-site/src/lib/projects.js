import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export function getAllProjects() {
  if (!fs.existsSync(projectsDirectory)) return [];

  const fileNames = fs.readdirSync(projectsDirectory).filter((f) =>
    f.endsWith(".md")
  );

  const projects = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      role: data.role || "",
      tech: data.tech || [],
      liveUrl: data.liveUrl || null,
      repoUrl: data.repoUrl || null,
      coverImage: data.coverImage || null,
      featured: !!data.featured,
      completedAt: data.completedAt || null,
    };
  });

  return projects.sort(
    (a, b) => new Date(b.completedAt) - new Date(a.completedAt)
  );
}

// Dùng cho trang chủ: chỉ lấy project được ghim (featured: true)
export function getFeaturedProjects() {
  return getAllProjects().filter((p) => p.featured);
}

export function getAllProjectSlugs() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function getProjectBySlug(slug) {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    title: data.title || slug,
    role: data.role || "",
    tech: data.tech || [],
    liveUrl: data.liveUrl || null,
    repoUrl: data.repoUrl || null,
    coverImage: data.coverImage || null,
    featured: !!data.featured,
    completedAt: data.completedAt || null,
    contentHtml: processed.toString(),
  };
}
