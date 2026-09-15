import Button from "@/components/Button";
import Badge from "@/components/Badge";
import StatusPill from "@/components/StatusPill";
import TerminalPanel from "@/components/TerminalPanel";
import HopRow from "@/components/HopRow";
import StatStrip from "@/components/StatStrip";

export const metadata = {
  title: "Design System Showcase — Network & DevOps",
  description: "Trang hiển thị toàn bộ Design Tokens và UI Components có sẵn trong dự án.",
};

export default function DesignSystemPage() {
  const hops = [
    {
      number: 1,
      target: "networking-fundamentals",
      description: "OSI, TCP/IP, subnetting",
      status: "OK",
      days: "32d",
    },
    {
      number: 2,
      target: "ccna-routing-switching",
      description: "VLAN, OSPF, STP",
      status: "LEARNING",
      days: "18d",
    },
    {
      number: 3,
      target: "linux-administration",
      description: "shell, systemd, networking tools",
      status: "QUEUED",
      days: "—",
    },
    {
      number: 4,
      target: "docker-containers",
      description: "images, compose, registries",
      status: "QUEUED",
      days: "—",
    },
    {
      number: 5,
      target: "kubernetes",
      description: "pods, services, deployments",
      status: "QUEUED",
      days: "—",
    },
    {
      number: 6,
      target: "terraform-ci-cd",
      description: "IaC, pipelines, automation",
      status: "QUEUED",
      days: "—",
    },
  ];

  return (
    <main className="wrap py-12 pb-24 space-y-16">
      {/* HEADER SECTION */}
      <section className="border-b border-theme-border pb-8">
        <p className="text-theme-muted text-[13px] mb-2 font-mono">
          $ cat /docs/design-system.md
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold font-space text-theme-text mb-3">
          Design System <span className="text-theme-teal">Showcase</span>
          <span className="inline-block w-[3px] h-[0.9em] bg-theme-teal ml-1.5 align-[-0.1em] animate-blink"></span>
        </h1>
        <p className="text-theme-muted text-[14.5px] max-w-2xl font-mono">
          Trang tổng hợp toàn bộ Design Tokens (màu sắc, typography, bo góc) và
          các Component nguyên tử (Button, Badge, StatusPill, TerminalPanel,
          StatStrip) đã được cấu hình trong dự án.
        </p>
      </section>

      {/* 1. COLOR TOKENS */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold font-space text-theme-text flex items-center gap-2">
          <span className="text-theme-teal font-mono text-sm">01.</span> Bảng màu & Design Tokens
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3 border border-theme-border rounded-[6px] bg-theme-bg">
            <div className="h-10 rounded border border-theme-border bg-theme-bg mb-2"></div>
            <div className="font-semibold text-theme-text">--bg</div>
            <div className="text-theme-muted">#0B1220</div>
          </div>
          <div className="p-3 border border-theme-border rounded-[6px] bg-theme-panel">
            <div className="h-10 rounded border border-theme-border bg-theme-panel mb-2"></div>
            <div className="font-semibold text-theme-text">--panel</div>
            <div className="text-theme-muted">#121B2E</div>
          </div>
          <div className="p-3 border border-theme-border rounded-[6px] bg-theme-panel-2">
            <div className="h-10 rounded border border-theme-border bg-theme-panel-2 mb-2"></div>
            <div className="font-semibold text-theme-text">--panel-2</div>
            <div className="text-theme-muted">#0E1626</div>
          </div>
          <div className="p-3 border border-theme-border rounded-[6px] bg-theme-panel">
            <div className="h-10 rounded border border-theme-border bg-theme-border mb-2"></div>
            <div className="font-semibold text-theme-text">--border</div>
            <div className="text-theme-muted">#223047</div>
          </div>
          <div className="p-3 border border-theme-border rounded-[6px] bg-theme-panel">
            <div className="h-10 rounded border border-theme-border bg-theme-text mb-2"></div>
            <div className="font-semibold text-theme-text">--text</div>
            <div className="text-theme-muted">#E7ECF3</div>
          </div>
          <div className="p-3 border border-theme-border rounded-[6px] bg-theme-panel">
            <div className="h-10 rounded border border-theme-border bg-theme-muted mb-2"></div>
            <div className="font-semibold text-theme-text">--muted</div>
            <div className="text-theme-muted">#7C8AA0</div>
          </div>
          <div className="p-3 border border-theme-border rounded-[6px] bg-theme-panel">
            <div className="h-10 rounded border border-theme-border bg-theme-teal mb-2"></div>
            <div className="font-semibold text-theme-text">--teal (OK / Accent)</div>
            <div className="text-theme-teal">#4FD1C5</div>
          </div>
          <div className="p-3 border border-theme-border rounded-[6px] bg-theme-panel">
            <div className="h-10 rounded border border-theme-border bg-theme-amber mb-2"></div>
            <div className="font-semibold text-theme-text">--amber (Learning)</div>
            <div className="text-theme-amber">#F0A93B</div>
          </div>
        </div>
      </section>

      {/* 2. TYPOGRAPHY */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold font-space text-theme-text flex items-center gap-2">
          <span className="text-theme-teal font-mono text-sm">02.</span> Typography (Space Grotesk & IBM Plex Mono)
        </h2>
        <div className="p-5 border border-theme-border rounded-[6px] bg-theme-panel space-y-4">
          <div>
            <span className="text-xs text-theme-muted font-mono block mb-1">
              Headline lớn (H1) — Space Grotesk 700:
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-space text-theme-text leading-tight">
              Học mạng. Dựng hạ tầng. Ghi lại từng bước.
            </h1>
          </div>
          <div className="border-t border-theme-border pt-4">
            <span className="text-xs text-theme-muted font-mono block mb-1">
              Tiêu đề section (H2) — Space Grotesk 600:
            </span>
            <h2 className="text-2xl font-semibold font-space text-theme-text">
              Lộ trình & Hoạt động Lab gần đây
            </h2>
          </div>
          <div className="border-t border-theme-border pt-4">
            <span className="text-xs text-theme-muted font-mono block mb-1">
              Tiêu đề nhỏ (H3) — Space Grotesk 600:
            </span>
            <h3 className="text-lg font-semibold font-space text-theme-text">
              Triển khai BGP trên Cisco IOS-XE
            </h3>
          </div>
          <div className="border-t border-theme-border pt-4">
            <span className="text-xs text-theme-muted font-mono block mb-1">
              Nội dung body / terminal — IBM Plex Mono 400 & 500:
            </span>
            <p className="font-mono text-[15px] text-theme-text leading-relaxed">
              Đây là định dạng chữ kỹ thuật monospace chuẩn. Toàn bộ chú thích,
              nhật ký lệnh và giải thích cấu hình đều dùng phông này để giữ trải
              nghiệm đọc log terminal nhất quán.
            </p>
          </div>
        </div>
      </section>

      {/* 3. BUTTONS */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold font-space text-theme-text flex items-center gap-2">
          <span className="text-theme-teal font-mono text-sm">03.</span> Nút bấm (Button Atoms)
        </h2>
        <div className="p-5 border border-theme-border rounded-[6px] bg-theme-panel flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="primary" href="#traceroute">
            Nút dạng Link (href)
          </Button>
        </div>
      </section>

      {/* 4. BADGES */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold font-space text-theme-text flex items-center gap-2">
          <span className="text-theme-teal font-mono text-sm">04.</span> Huy hiệu (Badge Atoms)
        </h2>
        <div className="p-5 border border-theme-border rounded-[6px] bg-theme-panel flex flex-wrap gap-2.5">
          <Badge active={true}>CCNA — đang ôn</Badge>
          <Badge>Networking Fundamentals</Badge>
          <Badge>Linux Administration</Badge>
          <Badge>Docker Containers</Badge>
          <Badge>Kubernetes</Badge>
          <Badge>Terraform & CI/CD</Badge>
        </div>
      </section>

      {/* 5. STATUS PILLS */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold font-space text-theme-text flex items-center gap-2">
          <span className="text-theme-teal font-mono text-sm">05.</span> Trạng thái (Status Pill Atoms)
        </h2>
        <div className="p-5 border border-theme-border rounded-[6px] bg-theme-panel flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <StatusPill status="OK" />
            <span className="text-xs text-theme-muted font-mono">Hoàn thành / OK</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusPill status="LEARNING" />
            <span className="text-xs text-theme-muted font-mono">Đang học / Pulsing dot</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusPill status="QUEUED" />
            <span className="text-xs text-theme-muted font-mono">Hàng đợi / Chưa bắt đầu</span>
          </div>
        </div>
      </section>

      {/* 6. STAT STRIP */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold font-space text-theme-text flex items-center gap-2">
          <span className="text-theme-teal font-mono text-sm">06.</span> Dải thống kê (Stat Strip)
        </h2>
        <StatStrip />
      </section>

      {/* 7. TERMINAL PANEL & TRACEROUTE */}
      <section className="space-y-4" id="traceroute">
        <h2 className="text-xl font-semibold font-space text-theme-text flex items-center gap-2">
          <span className="text-theme-teal font-mono text-sm">07.</span> Cửa sổ Terminal & Traceroute Table
        </h2>
        <TerminalPanel command="bash — traceroute ./learning-path">
          {hops.map((hop, idx) => (
            <HopRow
              key={hop.number}
              number={hop.number}
              target={hop.target}
              description={hop.description}
              status={hop.status}
              days={hop.days}
              isLast={idx === hops.length - 1}
            />
          ))}
        </TerminalPanel>
      </section>
    </main>
  );
}
