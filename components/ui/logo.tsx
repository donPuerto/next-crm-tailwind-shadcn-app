type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
};

export function Logo({ size = "md", className }: LogoProps) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-md border border-current bg-transparent text-primary font-semibold tracking-tight ${sizeClasses[size]} ${className ?? ""}`}
      aria-label="DP logo"
    >
      DP
    </div>
  );
}
