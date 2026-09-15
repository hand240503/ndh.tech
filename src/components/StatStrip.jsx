export default function StatStrip({
  items = [
    { num: "32", label: "ngày ghi nhật ký liên tục", color: "teal" },
    { num: "1", label: "chứng chỉ đang theo đuổi — CCNA", color: "amber" },
    { num: "6", label: "chặng trong lộ trình học", color: "muted" },
  ],
  className = "",
}) {
  const getTopBorderColor = (color, index) => {
    if (color === "teal" || index === 0) return "border-t-theme-teal";
    if (color === "amber" || index === 1) return "border-t-theme-amber";
    return "border-t-theme-muted";
  };

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-3 border border-theme-border rounded-[6px] overflow-hidden ${className}`.trim()}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`p-[22px_20px] bg-theme-panel-2 border-t-[3px] ${getTopBorderColor(
            item.color,
            idx
          )} ${
            idx > 0 ? "border-t border-theme-border sm:border-t-[3px] sm:border-l sm:border-l-theme-border" : ""
          }`}
        >
          <div className="font-space text-[30px] font-bold leading-none text-theme-text">
            {item.num}
          </div>
          <div className="font-mono text-theme-muted text-[12.5px] mt-1">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
