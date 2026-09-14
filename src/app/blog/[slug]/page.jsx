import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import BlogContent from "@/components/BlogContent";

// Bắt buộc cho output: 'export' — Next.js cần biết trước mọi slug để build tĩnh
export function generateStaticParams() {
  return getAllPostSlugs();
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);

  return (
    <main>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      {post.date && (
        <p className="text-sm text-gray-500 mb-6">
          {new Date(post.date).toLocaleDateString("vi-VN")}
        </p>
      )}
      <BlogContent html={post.contentHtml} />
    </main>
  );
}
