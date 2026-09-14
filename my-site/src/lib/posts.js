import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "content/posts");

// Đọc toàn bộ metadata bài viết (dùng cho trang danh sách blog)
export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory).filter((f) =>
    f.endsWith(".md")
  );

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || null,
      tags: data.tags || [],
      excerpt: data.excerpt || "",
      coverImage: data.coverImage || null,
    };
  });

  // Mới nhất lên đầu
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Danh sách slug — dùng cho generateStaticParams()
export function getAllPostSlugs() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Đọc 1 bài viết đầy đủ + convert Markdown -> HTML
export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const isProd = process.env.NODE_ENV === "production";
  let contentHtml = processed.toString();
  if (isProd) {
    contentHtml = contentHtml.replaceAll('src="/images/', 'src="/ndh.tech/images/');
  }

  const coverImage = data.coverImage
    ? isProd && data.coverImage.startsWith("/images/")
      ? `/ndh.tech${data.coverImage}`
      : data.coverImage
    : null;

  return {
    slug,
    title: data.title || slug,
    date: data.date || null,
    tags: data.tags || [],
    excerpt: data.excerpt || "",
    coverImage,
    contentHtml,
  };
}
