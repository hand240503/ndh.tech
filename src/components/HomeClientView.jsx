"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import StatusPill from "@/components/StatusPill";
import InteractiveTerminal from "@/components/InteractiveTerminal";

export default function HomeClientView({ posts = [], projects = [] }) {
  const [isTermOpen, setIsTermOpen] = useState(false);

  const handleOpenTerminal = () => {
    setIsTermOpen(true);
    const termElem = document.getElementById("terminal-section");
    if (termElem) {
      termElem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const services = [
    { name: "windows-server-admin.service", status: "OK", label: "active (running)", active: true },
    { name: "networking-troubleshoot.service", status: "OK", label: "active (running)", active: true },
    { name: "helpdesk-ticketing.service", status: "OK", label: "active (running)", active: true },
    { name: "python-automation.service", status: "LEARNING", label: "learning", active: false },
    { name: "linux-admin.service", status: "LEARNING", label: "learning", active: false },
  ];

  return (
    <main className="wrap py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* HERO SECTION */}
      <section className="hero border-b border-theme-border pb-12 sm:pb-16" id="top">
        <div className="text-theme-teal text-[13.5px] font-mono mb-3">
          <span className="text-theme-amber">visitor@ten-ban.sh</span>:~$ whoami
        </div>

        <h1 className="font-space text-[clamp(34px,5.6vw,52px)] font-bold leading-[1.12] tracking-tight text-theme-text mb-3">
          Nguyễn Văn A
          <span className="inline-block w-2.5 h-[1.05em] bg-theme-teal align-[-0.1em] ml-2 animate-blink"></span>
        </h1>

        <p className="text-theme-muted text-base mb-5 font-mono font-medium">
          Systems Administrator · IT Helpdesk
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge active>CCNA — đang ôn</Badge>
          <Badge>Networking Fundamentals</Badge>
          <Badge>Linux Administration</Badge>
          <Badge>Docker Containers</Badge>
        </div>

        <p className="text-[15px] max-w-[62ch] mb-8 text-theme-text leading-relaxed font-mono">
          Mình ghi lại những gì học được khi vận hành hệ thống, xử lý ticket, và vài dự án tự tay làm.
          Trang này vừa là portfolio, vừa là blog cá nhân theo phong cách terminal trực quan.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button href="#posts" variant="primary">
            Xem bài viết
          </Button>
          <Button href="#" variant="secondary">
            Tải CV
          </Button>
          <Button variant="secondary" onClick={handleOpenTerminal}>
            Mở terminal ▾
          </Button>
        </div>
      </section>

      {/* INTERACTIVE TERMINAL SECTION */}
      <section id="terminal-section" className="border-b border-theme-border pb-12 sm:pb-16">
        <InteractiveTerminal
          posts={posts}
          projects={projects}
          isOpen={isTermOpen}
          setIsOpen={setIsTermOpen}
        />
      </section>

      {/* SERVICES / SKILLS SECTION */}
      <section id="services" className="border-b border-theme-border pb-12 sm:pb-16">
        <h2 className="font-space text-[22px] font-semibold text-theme-text mb-6 flex items-center gap-2">
          <span className="font-mono text-theme-amber text-lg font-normal">#</span>
          systemctl status — kỹ năng
        </h2>

        <ul className="divide-y divide-dashed divide-theme-border font-mono text-sm">
          {services.map((svc) => (
            <li
              key={svc.name}
              className="py-3 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-2 h-2 rounded-full flex-none ${
                    svc.active
                      ? "bg-theme-teal shadow-[0_0_6px_var(--teal)]"
                      : "bg-theme-amber"
                  }`}
                ></span>
                <span className="text-theme-text font-medium truncate">
                  {svc.name}
                </span>
              </div>
              <StatusPill status={svc.status} className="flex-none">
                {svc.label}
              </StatusPill>
            </li>
          ))}
        </ul>
      </section>

      {/* RECENT POSTS SECTION */}
      <section id="posts" className="border-b border-theme-border pb-12 sm:pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-space text-[22px] font-semibold text-theme-text flex items-center gap-2">
            <span className="font-mono text-theme-amber text-lg font-normal">#</span>
            log — bài viết gần đây
          </h2>
          <Link
            href="/blog"
            className="text-xs font-mono text-theme-muted hover:text-theme-teal transition-colors"
          >
            Xem tất cả bài viết →
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-theme-muted font-mono text-sm">Chưa có bài viết nào.</p>
        ) : (
          <ul className="divide-y divide-theme-border">
            {posts.map((post, idx) => (
              <li
                key={post.slug}
                className="py-5 grid grid-cols-[44px_1fr] sm:grid-cols-[60px_1fr_auto] gap-4 items-start"
              >
                <span className="font-mono text-theme-muted text-[13px] pt-0.5">
                  #{String(idx + 1).padStart(3, "0")}
                </span>
                <div>
                  <h3 className="font-space text-[17px] font-semibold text-theme-text mb-1.5 leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-theme-teal transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  {post.excerpt && (
                    <p className="text-theme-muted text-[13.5px] leading-relaxed font-mono">
                      {post.excerpt}
                    </p>
                  )}
                </div>
                <span className="col-start-2 sm:col-start-auto justify-self-start font-mono text-[11.5px] text-theme-muted bg-theme-panel-2 border border-theme-border px-2 py-1 rounded-[3px] whitespace-nowrap">
                  {(post.tags && post.tags[0]) || "Blog"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="border-b border-theme-border pb-12 sm:pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-space text-[22px] font-semibold text-theme-text flex items-center gap-2">
            <span className="font-mono text-theme-amber text-lg font-normal">#</span>
            log — dự án đã làm
          </h2>
          <Link
            href="/projects"
            className="text-xs font-mono text-theme-muted hover:text-theme-teal transition-colors"
          >
            Xem tất cả dự án →
          </Link>
        </div>

        {projects.length === 0 ? (
          <p className="text-theme-muted font-mono text-sm">Chưa có dự án nào.</p>
        ) : (
          <ul className="divide-y divide-theme-border">
            {projects.map((project, idx) => (
              <li
                key={project.slug}
                className="py-5 grid grid-cols-[44px_1fr] sm:grid-cols-[60px_1fr_auto] gap-4 items-start"
              >
                <span className="font-mono text-theme-muted text-[13px] pt-0.5">
                  #P{String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-space text-[17px] font-semibold text-theme-text mb-1.5 leading-snug">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="hover:text-theme-teal transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-theme-muted text-[13.5px] leading-relaxed font-mono">
                    {project.role || (project.tech && project.tech.join(", ")) || "Hạ tầng / DevOps"}
                  </p>
                </div>
                <span className="col-start-2 sm:col-start-auto justify-self-start font-mono text-[11.5px] text-theme-muted bg-theme-panel-2 border border-theme-border px-2 py-1 rounded-[3px] whitespace-nowrap">
                  {(project.tech && project.tech[0]) || "Project"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="pb-12 sm:pb-16">
        <h2 className="font-space text-[22px] font-semibold text-theme-text mb-6 flex items-center gap-2">
          <span className="font-mono text-theme-amber text-lg font-normal">#</span>
          contact --info
        </h2>

        <ul className="font-mono text-sm space-y-2.5">
          <li className="flex items-center">
            <span className="text-theme-muted w-24 flex-shrink-0">email</span>
            <a
              href="mailto:ban@example.com"
              className="text-theme-teal hover:underline"
            >
              ban@example.com
            </a>
          </li>
          <li className="flex items-center">
            <span className="text-theme-muted w-24 flex-shrink-0">github</span>
            <a
              href="https://github.com/ten-ban"
              target="_blank"
              rel="noreferrer"
              className="text-theme-teal hover:underline"
            >
              github.com/ten-ban
            </a>
          </li>
          <li className="flex items-center">
            <span className="text-theme-muted w-24 flex-shrink-0">linkedin</span>
            <a
              href="https://linkedin.com/in/ten-ban"
              target="_blank"
              rel="noreferrer"
              className="text-theme-teal hover:underline"
            >
              linkedin.com/in/ten-ban
            </a>
          </li>
        </ul>
      </section>

      <footer className="border-t border-theme-border pt-8 pb-12 text-xs font-mono text-theme-muted">
        © 2026 ten-ban.sh — chuẩn hóa theo design-system.md
      </footer>
    </main>
  );
}
