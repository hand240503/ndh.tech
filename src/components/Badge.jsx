export default function Badge({
  children,
  active = false,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center text-[12.5px] font-mono px-2.5 py-1 rounded-theme border transition-colors";

  const statusStyles = active
    ? "text-theme-amber border-[rgba(240,169,59,0.35)] bg-theme-panel-2"
    : "text-theme-muted border-theme-border bg-theme-panel-2";

  return (
    <span className={`${baseStyles} ${statusStyles} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}
