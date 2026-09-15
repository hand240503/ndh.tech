export default function StatusPill({
  status = "QUEUED",
  className = "",
  children,
  ...props
}) {
  const normalizedStatus = status.toUpperCase();

  const baseStyles =
    "inline-flex items-center text-[11px] font-semibold tracking-wide font-mono px-2 py-[3px] rounded-[3px] border w-fit select-none";

  if (normalizedStatus === "OK") {
    return (
      <span
        className={`${baseStyles} text-theme-teal border-[rgba(79,209,197,0.4)] bg-[rgba(79,209,197,0.08)] ${className}`.trim()}
        {...props}
      >
        {children || "OK"}
      </span>
    );
  }

  if (normalizedStatus === "LEARNING") {
    return (
      <span
        className={`${baseStyles} text-theme-amber border-[rgba(240,169,59,0.4)] bg-[rgba(240,169,59,0.08)] ${className}`.trim()}
        {...props}
      >
        <span className="inline-block w-[5px] h-[5px] rounded-full bg-theme-amber mr-[5px] animate-pulse-slow"></span>
        {children || "LEARNING"}
      </span>
    );
  }

  // Mặc định là QUEUED
  return (
    <span
      className={`${baseStyles} text-theme-muted border-theme-border bg-transparent ${className}`.trim()}
      {...props}
    >
      {children || "QUEUED"}
    </span>
  );
}
