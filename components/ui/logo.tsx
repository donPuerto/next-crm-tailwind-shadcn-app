'use client';

type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
  color?: string; // Optional color override
};

const sizeClasses: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
};

export function Logo({ size = "md", className, style, color }: LogoProps) {
  // If no color provided, use CSS variable (theme's primary color)
  const logoStyle = color 
    ? { color: color, ...style }
    : style;
    
  return (
    <div
      className={`inline-flex items-center justify-center rounded-md border border-current bg-transparent font-semibold tracking-tight text-primary ${sizeClasses[size]} ${className ?? ""}`}
      style={logoStyle}
      aria-label="DP logo"
    >
      DP
    </div>
  );
}
