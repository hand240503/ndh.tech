import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "My Site",
  description: "Blog & Portfolio - Static, Zero-Cost",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="max-w-3xl mx-auto px-4 py-10 text-gray-900">
        <header className="mb-10 flex gap-6">
          <Link href="/" className="font-bold">
            Trang chủ
          </Link>
          <Link href="/blog">Blog</Link>
          <Link href="/projects">Portfolio</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
