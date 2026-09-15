import Link from "next/link";

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-mono text-[13.5px] px-5 py-3 rounded-theme border transition-all duration-150 cursor-pointer select-none hover:-translate-y-[1px]";

  const variantStyles =
    variant === "primary"
      ? "bg-theme-teal text-[#06201C] font-medium border-transparent hover:bg-[#63e0d4]"
      : "bg-transparent text-theme-text border-theme-border hover:border-theme-teal";

  const combinedStyles = `${baseStyles} ${variantStyles} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combinedStyles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
}
