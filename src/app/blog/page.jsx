import { getAllPosts } from "@/lib/posts";

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`} className="text-lg font-medium underline">
              {post.title}
            </a>
            {post.date && (
              <p className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString("vi-VN")}
              </p>
            )}
            <p className="text-gray-700">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
