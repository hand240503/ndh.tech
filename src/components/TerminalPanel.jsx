export default function TerminalPanel({
  command = "bash — traceroute ./learning-path",
  children,
  className = "",
  ...props
}) {
  return (
    <div
      className={`border border-theme-border rounded-[6px] bg-theme-panel overflow-hidden ${className}`.trim()}
      {...props}
    >
      <div className="flex items-center gap-2 px-[18px] py-3 border-b border-theme-border text-[13px] text-theme-muted font-mono">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-[9px] h-[9px] rounded-full bg-theme-border inline-block"></span>
          <span className="w-[9px] h-[9px] rounded-full bg-theme-border inline-block"></span>
          <span className="w-[9px] h-[9px] rounded-full bg-theme-border inline-block"></span>
        </div>
        <span className="truncate">{command}</span>
      </div>
      <div className="py-1.5 font-mono">{children}</div>
    </div>
  );
}
