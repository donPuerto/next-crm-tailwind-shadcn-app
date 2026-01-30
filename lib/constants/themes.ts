// Theme configuration constants
export const AVAILABLE_THEMES = ['vercel', 'neobrutalism'] as const;
export type Theme = (typeof AVAILABLE_THEMES)[number];

export const AVAILABLE_COLORS = [
  'red',
  'neutral',
  'amber',
  'yellow',
  'blue',
  'cyan',
  'emerald',
  'fuchsia',
  'green',
  'indigo',
  'lime',
  'teal',
  'orange',
  'pink',
  'rose',
  'sky',
  'violet',
  'purple'
] as const;
export type ThemeColor = (typeof AVAILABLE_COLORS)[number];

// Base neutral palettes for UI surfaces
export const AVAILABLE_BASE_COLORS = ['neutral', 'stone', 'zinc', 'gray'] as const;
export type BaseColor = (typeof AVAILABLE_BASE_COLORS)[number];

export const THEME_CONFIG: Record<Theme, { name: string; description: string }> = {
  vercel: {
    name: 'Vercel',
    description: 'Clean, minimal, professional'
  },
  neobrutalism: {
    name: 'Neo Brutalism',
    description: 'Bold, raw, high-contrast'
  }
};

export const COLOR_CONFIG: Record<ThemeColor, { name: string; hex: string }> = {
  red: { name: 'Red', hex: '#FF4D50' },
  neutral: { name: 'Neutral', hex: '#808080' },
  amber: { name: 'Amber', hex: '#FFA500' },
  yellow: { name: 'Yellow', hex: '#FACC00' },
  blue: { name: 'Blue', hex: '#3B82F6' },
  cyan: { name: 'Cyan', hex: '#06B6D4' },
  emerald: { name: 'Emerald', hex: '#10B981' },
  fuchsia: { name: 'Fuchsia', hex: '#D946EF' },
  green: { name: 'Green', hex: '#22C55E' },
  indigo: { name: 'Indigo', hex: '#4F46E5' },
  lime: { name: 'Lime', hex: '#84CC16' },
  teal: { name: 'Teal', hex: '#00D6BD' },
  orange: { name: 'Orange', hex: '#F97316' },
  pink: { name: 'Pink', hex: '#EC4899' },
  rose: { name: 'Rose', hex: '#FF6678' },
  sky: { name: 'Sky', hex: '#0099FF' },
  violet: { name: 'Violet', hex: '#A985FF' },
  purple: { name: 'Purple', hex: '#CA7AFF' }
};

export const BASE_COLOR_CONFIG: Record<BaseColor, { name: string; hex: string }> = {
  neutral: { name: 'Neutral', hex: '#737373' },
  stone: { name: 'Stone', hex: '#78716C' },
  zinc: { name: 'Zinc', hex: '#71717A' },
  gray: { name: 'Gray', hex: '#6B7280' }
};

export const DEFAULT_THEME: Theme = 'vercel';
export const DEFAULT_COLOR: ThemeColor = 'neutral';
export const DEFAULT_BASE_COLOR: BaseColor = 'neutral';

// Storage keys for preferences
export const THEME_STORAGE_KEY = 'app-theme';
export const COLOR_STORAGE_KEY = 'app-color';
export const BASE_COLOR_STORAGE_KEY = 'app-base-color';

// Style presets
export const AVAILABLE_STYLES = ['vega', 'nova', 'maia', 'lyra', 'mira'] as const;
export type StylePreset = (typeof AVAILABLE_STYLES)[number];

export const STYLE_CONFIG: Record<StylePreset, {
  name: string;
  description: string;
  radius: 'none' | 'sm' | 'md' | 'lg';
  spacing: number; // rem units base spacing
  tracking: number; // em letter spacing
  shadow: 'subtle' | 'bold';
}> = {
  vega: { name: 'Vega', description: 'Classic shadcn/ui look', radius: 'md', spacing: 0.25, tracking: 0, shadow: 'subtle' },
  nova: { name: 'Nova', description: 'Reduced padding/margins, compact', radius: 'sm', spacing: 0.125, tracking: 0, shadow: 'subtle' },
  maia: { name: 'Maia', description: 'Soft and rounded, generous spacing', radius: 'lg', spacing: 0.5, tracking: 0, shadow: 'subtle' },
  lyra: { name: 'Lyra', description: 'Boxy and sharp, pairs with mono', radius: 'none', spacing: 0.25, tracking: 0, shadow: 'bold' },
  mira: { name: 'Mira', description: 'Compact, dense interfaces', radius: 'sm', spacing: 0.125, tracking: -0.01, shadow: 'subtle' }
};

export const DEFAULT_STYLE: StylePreset = 'vega';

// Radius options
export const AVAILABLE_RADII = ['none', 'sm', 'md', 'lg'] as const;
export type RadiusOption = (typeof AVAILABLE_RADII)[number];

// Menu accent options
export const AVAILABLE_MENU_ACCENTS = ['subtle', 'bold'] as const;
export type MenuAccent = (typeof AVAILABLE_MENU_ACCENTS)[number];
export const DEFAULT_MENU_ACCENT: MenuAccent = 'subtle';

export const STYLE_STORAGE_KEY = 'app-style';
export const RADIUS_STORAGE_KEY = 'app-radius';
export const MENU_ACCENT_STORAGE_KEY = 'app-menu-accent';
export const DARK_MODE_STORAGE_KEY = 'app-dark-mode';
export const LAYOUT_MODE_STORAGE_KEY = 'app-layout-mode';

// Font options
export const AVAILABLE_SANS_FONTS = ['default', 'inter', 'noto', 'nunito', 'figtree'] as const;
export type FontSansOption = (typeof AVAILABLE_SANS_FONTS)[number];

export const AVAILABLE_SERIF_FONTS = ['default', 'georgia'] as const;
export type FontSerifOption = (typeof AVAILABLE_SERIF_FONTS)[number];

export const AVAILABLE_MONO_FONTS = ['default', 'geist-mono'] as const;
export type FontMonoOption = (typeof AVAILABLE_MONO_FONTS)[number];

/**
 * Convert hex color to oklch
 * Used for applying theme colors dynamically
 */
export function hexToOklch(hex: string): string {
  // Simple conversion - in production, use a proper color library
  // This is a placeholder that maintains the color hue
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // Basic oklch approximation
  const L = (0.2126 * r + 0.7152 * g + 0.0722 * b).toFixed(3);
  const C = '0.2';
  const H = Math.round((Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180) / Math.PI + 360) % 360;

  return `oklch(${L} ${C} ${H})`;
}
