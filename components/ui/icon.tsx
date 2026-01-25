import * as Icons from 'lucide-react';
import type { SVGProps } from 'react';

export type IconName = keyof typeof Icons;

export type IconProps = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, 'width' | 'height'>;

export function Icon({ name, size = 16, strokeWidth = 1.5, className, ...props }: IconProps) {
  const LucideIcon = Icons[name] ?? Icons.Circle;
  return (
    <LucideIcon
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
}
