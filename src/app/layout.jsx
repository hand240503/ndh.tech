import "./globals.css";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Network & DevOps Learning Journal",
  description: "Ghi chép hành trình học Network & DevOps, dựng hạ tầng, CI/CD và lab.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      <body className="font-mono bg-theme-bg text-theme-text min-h-screen">
        <header className="border-b border-theme-border sticky top-0 bg-[rgba(11,18,32,0.85)] backdrop-blur-md z-10">
          <nav className="wrap flex items-center justify-between h-16">
            <Link
              href="/"
              className="font-space font-bold text-[15px] tracking-wide flex items-center gap-2 text-theme-text hover:text-theme-teal transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-theme-teal shadow-[0_0_0_3px_rgba(79,209,197,0.15)] inline-block"></span>
              <span>nw / devops</span>
            </Link>
            <div className="hidden sm:flex gap-7 text-[13px] text-theme-muted">
              <Link href="/" className="hover:text-theme-text transition-colors">
                Trang chủ
              </Link>
              <Link href="/#traceroute" className="hover:text-theme-text transition-colors">
                Lộ trình
              </Link>
              <Link href="/blog" className="hover:text-theme-text transition-colors">
                Nhật ký
              </Link>
              <Link href="/projects" className="hover:text-theme-text transition-colors">
                Dự án
              </Link>
              <Link href="/design-system" className="text-theme-teal hover:underline transition-colors">
                Design System
              </Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

