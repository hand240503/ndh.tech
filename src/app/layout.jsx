import "./globals.css";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.setAttribute("data-theme","light");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-mono bg-theme-bg text-theme-text min-h-screen">
        <header className="border-b border-theme-border sticky top-0 bg-[var(--nav-bg)] backdrop-blur-md z-10 transition-colors">
          <nav className="wrap flex items-center justify-between h-16">
            <Link
              href="/"
              className="font-space font-bold text-[15px] tracking-wide flex items-center gap-2 text-theme-text hover:text-theme-teal transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-theme-teal shadow-[0_0_0_3px_rgba(79,209,197,0.15)] inline-block"></span>
              <span>ten-ban.sh</span>
            </Link>
            <div className="flex items-center gap-5">
              <div className="hidden sm:flex gap-6 text-[13px] text-theme-muted font-mono">
                <Link href="/" className="hover:text-theme-text transition-colors">
                  Trang chủ
                </Link>
                <Link href="/#services" className="hover:text-theme-text transition-colors">
                  Kỹ năng
                </Link>
                <Link href="/blog" className="hover:text-theme-text transition-colors">
                  Bài viết
                </Link>
                <Link href="/projects" className="hover:text-theme-text transition-colors">
                  Dự án
                </Link>
                <Link href="/#contact" className="hover:text-theme-text transition-colors">
                  Liên hệ
                </Link>
                <Link href="/design-system" className="text-theme-teal hover:underline transition-colors">
                  Design System
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden lg:inline text-xs text-theme-muted font-mono">
                  uptime: 128d · helpdesk lvl2
                </span>
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

