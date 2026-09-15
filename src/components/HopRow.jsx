import StatusPill from "./StatusPill";

export default function HopRow({
  number,
  target,
  description,
  status = "QUEUED",
  days = "—",
  isLast = false,
  className = "",
}) {
  return (
    <div
      className={`grid grid-cols-[22px_1fr_84px] sm:grid-cols-[28px_1fr_96px_64px] items-center gap-3 sm:gap-3.5 px-[18px] py-[11px] text-[13.5px] ${
        isLast ? "" : "border-b border-[rgba(34,48,71,0.5)]"
      } ${className}`.trim()}
    >
      <span className="text-theme-muted font-mono">{number}</span>
      <div className="font-mono text-theme-text min-w-0">
        <div className="truncate font-medium">{target}</div>
        {description && (
          <small className="block text-theme-muted text-[11.5px] mt-0.5 truncate">
            {description}
          </small>
        )}
      </div>
      <div className="justify-self-start">
        <StatusPill status={status} />
      </div>
      <span className="hidden sm:block text-theme-muted text-right font-mono">
        {days}
      </span>
    </div>
  );
}
