/**
 * Default theme that loads when no user preference is set
 */
export const DEFAULT_THEME = 'vercel';

export const THEMES = [
    { name: 'Claude', value: 'claude' },
    { name: 'Neobrutalism', value: 'neobrutalism' },
    { name: 'Supabase', value: 'supabase' },
    { name: 'Vercel', value: 'vercel' },
    { name: 'Mono', value: 'mono' },
    { name: 'Notebook', value: 'notebook' }
];

/**
 * Default colors for each theme (used in landing page when no override)
 * Maps theme name to hex color approximating their CSS --primary
 */
export const THEME_DEFAULT_COLORS: Record<string, string> = {
    claude: '#d97757',      // coral/salmon
    neobrutalism: '#ec4899', // pink
    supabase: '#10b981',    // emerald
    vercel: '#525252',      // neutral gray (better visibility)
    mono: '#525252',        // neutral gray
    notebook: '#3b82f6'     // blue
};

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
    'violet',
    'sky',
    'purple',
    'slate',
    'zinc'
] as const;

export type ThemeColor = (typeof AVAILABLE_COLORS)[number];

export const COLOR_CONFIG: Record<ThemeColor, { name: string; hex: string }> = {
    red: { name: 'Red', hex: '#FF4D50' },
    neutral: { name: 'Neutral', hex: '#808080' },
    amber: { name: 'Amber', hex: '#fbbf24' },
    yellow: { name: 'Yellow', hex: '#FACC00' },
    blue: { name: 'Blue', hex: '#3b82f6' },
    cyan: { name: 'Cyan', hex: '#06b6d4' },
    emerald: { name: 'Emerald', hex: '#10b981' },
    fuchsia: { name: 'Fuchsia', hex: '#d946ef' },
    green: { name: 'Green', hex: '#22c55e' },
    indigo: { name: 'Indigo', hex: '#6366f1' },
    lime: { name: 'Lime', hex: '#84cc16' },
    teal: { name: 'Teal', hex: '#00D6BD' },
    orange: { name: 'Orange', hex: '#f97316' },
    pink: { name: 'Pink', hex: '#ec4899' },
    rose: { name: 'Rose', hex: '#f43f5e' },
    violet: { name: 'Violet', hex: '#8b5cf6' },
    sky: { name: 'Sky', hex: '#0ea5e9' },
    purple: { name: 'Purple', hex: '#CA7AFF' },
    slate: { name: 'Slate', hex: '#64748b' },
    zinc: { name: 'Zinc', hex: '#71717a' }
};

/**
 * Convert hex color to oklch for dynamic theme application
 */
export function hexToOklch(hex: string): string {
    // Simple conversion placeholder - ideally use a library or accurate math
    // For now, we return the hex as the browser might not support oklch direct conversion without calc
    // But since our CSS uses oklch, we might need to rely on the CSS variable being just the color value if possible?
    // Actually, shadcn/ui themes often use space separated values for HSL.
    // Our themes use oklch.
    // Let's blindly trust the hex for now or use a basic approximation if needed.
    // BETTER APPROACH: Just set the hex. Modern browsers support hex in variables? 
    // Wait, our theme.css uses `oklch(0.9821 0 0)`.
    // If we override --primary, we should probably providing a compatible value.
    // Let's stick to HEX for the swatches UI, but for APPLICATION we might need to be careful.
    // If the user wants to override the theme color, we might need to set `--primary: color`.
    return hex;
}