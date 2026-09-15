"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InteractiveTerminal({
  posts = [],
  projects = [],
  isOpen,
  setIsOpen,
}) {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = setIsOpen !== undefined ? setIsOpen : setInternalOpen;

  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState([
    {
      id: "welcome",
      type: "output",
      text: "Chào mừng đến với terminal portfolio! Gõ help để xem danh sách lệnh hỗ trợ.",
    },
  ]);

  const inputRef = useRef(null);
  const outputRef = useRef(null);

  // Focus input on open
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Scroll to bottom on new output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history, open]);

  // Global keydown for ` and Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "`" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  const executeCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const newHistory = [
      ...history,
      { id: Date.now() + "-echo", type: "echo", text: trimmed },
    ];

    const [cmd, ...args] = trimmed.split(/\s+/);
    const lowerCmd = cmd.toLowerCase();

    switch (lowerCmd) {
      case "help":
        newHistory.push({
          id: Date.now() + "-help",
          type: "output",
          text: [
            "Các lệnh có sẵn:",
            "  whoami            — thông tin giới thiệu bản thân",
            "  services          — trạng thái các kỹ năng / service",
            "  posts             — danh sách bài viết gần đây",
            "  projects          — danh sách dự án kỹ thuật",
            "  search <từ khóa>  — tìm bài viết & dự án theo từ khóa",
            "  open <slug>       — mở trang chi tiết bài viết/dự án",
            "  contact           — thông tin liên hệ (email, github, linkedin)",
            "  theme             — chuyển đổi giao diện Sáng / Tối",
            "  clear             — xoá màn hình terminal",
          ].join("\n"),
        });
        break;

      case "whoami":
        newHistory.push({
          id: Date.now() + "-whoami",
          type: "output",
          text: "Nguyễn Văn A — Systems Administrator / IT Helpdesk.\nGhi lại những gì học được khi vận hành hệ thống, hạ tầng mạng và DevOps.",
        });
        break;

      case "services":
      case "skills":
        newHistory.push({
          id: Date.now() + "-services",
          type: "output",
          text: [
            "● windows-server-admin.service    [active (running)]",
            "● networking-troubleshoot.service [active (running)]",
            "● helpdesk-ticketing.service      [active (running)]",
            "○ python-automation.service       [learning]",
            "○ linux-admin.service             [learning]",
          ].join("\n"),
        });
        break;

      case "posts":
        if (posts.length === 0) {
          newHistory.push({
            id: Date.now() + "-posts",
            type: "output",
            text: "Chưa có bài viết nào được ghi nhận.",
          });
        } else {
          newHistory.push({
            id: Date.now() + "-posts",
            type: "output",
            text: posts
              .map(
                (p, idx) =>
                  `#${String(idx + 1).padStart(3, "0")}  ${p.title}  [${(p.tags || []).join(", ") || "Blog"}] -> slug: ${p.slug}`
              )
              .join("\n"),
          });
        }
        break;

      case "projects":
        if (projects.length === 0) {
          newHistory.push({
            id: Date.now() + "-projects",
            type: "output",
            text: "Chưa có dự án nào được ghi nhận.",
          });
        } else {
          newHistory.push({
            id: Date.now() + "-projects",
            type: "output",
            text: projects
              .map(
                (p, idx) =>
                  `#P${String(idx + 1).padStart(2, "0")}  ${p.title}  [${(p.tech || []).join(", ") || p.role || "DevOps"}] -> slug: ${p.slug}`
              )
              .join("\n"),
          });
        }
        break;

      case "contact":
        newHistory.push({
          id: Date.now() + "-contact",
          type: "output",
          text: "email:    ban@example.com\ngithub:   github.com/ten-ban\nlinkedin: linkedin.com/in/ten-ban",
        });
        break;

      case "theme":
        const current =
          document.documentElement.getAttribute("data-theme") === "light"
            ? "light"
            : "dark";
        const next = current === "light" ? "dark" : "light";
        if (next === "light") {
          document.documentElement.setAttribute("data-theme", "light");
          localStorage.setItem("theme", "light");
        } else {
          document.documentElement.removeAttribute("data-theme");
          localStorage.setItem("theme", "dark");
        }
        newHistory.push({
          id: Date.now() + "-theme",
          type: "output",
          text: `Đã chuyển đổi giao diện sang chế độ: ${next}`,
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "search":
        const kw = args.join(" ").toLowerCase();
        if (!kw) {
          newHistory.push({
            id: Date.now() + "-search-err",
            type: "error",
            text: "Cách dùng: search <từ khóa>",
          });
          break;
        }
        const postMatches = posts.filter(
          (p) =>
            p.title.toLowerCase().includes(kw) ||
            (p.excerpt && p.excerpt.toLowerCase().includes(kw)) ||
            (p.tags && p.tags.some((t) => t.toLowerCase().includes(kw)))
        );
        const projMatches = projects.filter(
          (p) =>
            p.title.toLowerCase().includes(kw) ||
            (p.role && p.role.toLowerCase().includes(kw)) ||
            (p.tech && p.tech.some((t) => t.toLowerCase().includes(kw)))
        );

        if (postMatches.length === 0 && projMatches.length === 0) {
          newHistory.push({
            id: Date.now() + "-search-none",
            type: "output",
            text: `Không tìm thấy kết quả nào cho "${kw}".`,
          });
        } else {
          const lines = [`Tìm thấy kết quả:`];
          postMatches.forEach((p) => lines.push(`  [Bài viết] ${p.title} (slug: ${p.slug})`));
          projMatches.forEach((p) => lines.push(`  [Dự án]    ${p.title} (slug: ${p.slug})`));
          newHistory.push({
            id: Date.now() + "-search-res",
            type: "output",
            text: lines.join("\n"),
          });
        }
        break;

      case "open":
        const target = (args[0] || "").toLowerCase().replace("#", "");
        if (!target) {
          newHistory.push({
            id: Date.now() + "-open-err",
            type: "error",
            text: "Cách dùng: open <slug hoặc id>",
          });
          break;
        }
        const foundPost = posts.find(
          (p, idx) =>
            p.slug.toLowerCase() === target ||
            String(idx + 1).padStart(3, "0") === target ||
            String(idx + 1) === target
        );
        if (foundPost) {
          newHistory.push({
            id: Date.now() + "-open",
            type: "output",
            text: `Đang điều hướng đến bài viết: ${foundPost.title}...`,
          });
          router.push(`/blog/${foundPost.slug}`);
          break;
        }
        const foundProj = projects.find(
          (p, idx) =>
            p.slug.toLowerCase() === target ||
            `p${String(idx + 1).padStart(2, "0")}` === target ||
            String(idx + 1) === target
        );
        if (foundProj) {
          newHistory.push({
            id: Date.now() + "-open",
            type: "output",
            text: `Đang điều hướng đến dự án: ${foundProj.title}...`,
          });
          router.push(`/projects/${foundProj.slug}`);
          break;
        }
        newHistory.push({
          id: Date.now() + "-open-404",
          type: "error",
          text: `Không tìm thấy bài viết hoặc dự án nào với định danh "${target}".`,
        });
        break;

      default:
        newHistory.push({
          id: Date.now() + "-err",
          type: "error",
          text: `bash: ${cmd}: không tìm thấy lệnh. Gõ "help" để xem danh sách.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal("");
  };

  return (
    <div className="w-full">
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full flex items-center gap-2.5 bg-theme-panel border border-theme-border rounded-[6px] px-4 py-3 text-[13px] text-theme-muted font-mono hover:text-theme-text hover:border-theme-teal transition-colors shadow-[var(--shadow-panel)] cursor-pointer text-left"
          aria-label="Mở terminal"
        >
          <span className="text-theme-teal animate-blink">●</span>
          <span>visitor@ten-ban.sh:~$</span>
          <span className="ml-auto text-[11.5px] opacity-70">
            nhấn để mở · phím tắt: `
          </span>
        </button>
      )}

      {open && (
        <div
          role="region"
          aria-label="Terminal Portfolio"
          className="border border-theme-border rounded-[6px] bg-theme-panel shadow-[var(--shadow-panel)] overflow-hidden flex flex-col transition-all duration-200"
        >
          {/* Header Bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-theme-panel-2 border-b border-theme-border text-xs text-theme-muted font-mono select-none">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E2564F] inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8A33D] inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#4FB8A6] inline-block"></span>
            </div>
            <span className="ml-2">visitor@ten-ban.sh — bash</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="ml-auto text-theme-muted hover:text-[#E2564F] transition-colors px-1.5 py-0.5 rounded text-[13px] leading-none cursor-pointer"
              title="Đóng terminal (Esc)"
              aria-label="Đóng terminal"
            >
              ✕
            </button>
          </div>

          {/* Terminal Output */}
          <div
            ref={outputRef}
            className="p-4 font-mono text-[13px] leading-[1.7] text-theme-text overflow-y-auto max-h-[380px] min-h-[160px] whitespace-pre-wrap"
          >
            {history.map((item) => {
              if (item.type === "echo") {
                return (
                  <div key={item.id} className="mb-1 text-theme-teal">
                    <span className="text-theme-amber">visitor@ten-ban.sh:~$</span>{" "}
                    {item.text}
                  </div>
                );
              }
              if (item.type === "error") {
                return (
                  <div key={item.id} className="mb-1 text-[#E2564F]">
                    {item.text}
                  </div>
                );
              }
              return (
                <div key={item.id} className="mb-1 text-theme-text opacity-95">
                  {item.text}
                </div>
              );
            })}
          </div>

          {/* Input Row */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-theme-panel-2 border-t border-theme-border font-mono text-[13px]">
            <span className="text-theme-amber select-none">
              visitor@ten-ban.sh:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  executeCommand(inputVal);
                }
              }}
              autoComplete="off"
              spellCheck="false"
              className="flex-1 bg-transparent border-none text-theme-text focus:outline-none font-mono text-[13px]"
              aria-label="Dòng nhập lệnh terminal"
            />
          </div>
        </div>
      )}
    </div>
  );
}
