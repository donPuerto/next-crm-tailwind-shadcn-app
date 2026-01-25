'use client';

import { useTheme } from '@/app/hooks/useTheme';
import {
  THEME_CONFIG,
  AVAILABLE_THEMES,
  COLOR_CONFIG,
  AVAILABLE_COLORS,
  AVAILABLE_BASE_COLORS,
  BASE_COLOR_CONFIG,
  AVAILABLE_STYLES,
  STYLE_CONFIG,
  AVAILABLE_RADII,
  AVAILABLE_MENU_ACCENTS
} from '@/lib/constants/themes';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select';

/**
 * ThemeSwitcher - UI component to switch between themes and colors
 * Can be used in a navbar, settings panel, or anywhere in the app
 */
export function ThemeSwitcher() {
  const {
    theme,
    color,
    baseColor,
    style,
    radius,
    menuAccent,
    fontSans,
    fontSerif,
    fontMono,
    setTheme,
    setColor,
    setBaseColor,
    setStyle,
    setRadius,
    setMenuAccent,
    setFonts,
    mounted
  } = useTheme();

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-4 p-4 bg-card border border-border rounded-lg">
      {/* Theme Switcher */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Theme</label>
        <Select value={theme} onValueChange={(v) => setTheme(v as any)}>
          <SelectTrigger aria-label="Select Theme" size="sm" className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {AVAILABLE_THEMES.map((themeOption) => (
              <SelectItem key={themeOption} value={themeOption} aria-label={`Switch to ${THEME_CONFIG[themeOption].name} theme`}>
                {THEME_CONFIG[themeOption].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Color Switcher */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Accent Color</label>
        <Select value={color} onValueChange={(v) => setColor(v as any)}>
          <SelectTrigger aria-label="Select Accent Color" size="sm" className="w-full">
            <SelectValue placeholder="Accent Color" />
          </SelectTrigger>
          <SelectContent>
            {AVAILABLE_COLORS.map((colorOption) => (
              <SelectItem key={colorOption} value={colorOption} aria-label={`Select ${COLOR_CONFIG[colorOption].name} color`}>
                {COLOR_CONFIG[colorOption].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Base Color */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Base Neutral</label>
        <div className="grid grid-cols-8 gap-2">
          {AVAILABLE_BASE_COLORS.map((base) => {
            const info = BASE_COLOR_CONFIG[base];
            return (
              <button
                key={base}
                onClick={() => setBaseColor(base)}
                className={`px-2 py-1 rounded border text-xs transition-colors ${
                  baseColor === base ? 'bg-muted text-foreground border-foreground' : 'bg-background text-foreground border-border hover:bg-muted'
                }`}
                aria-label={`Set base color ${info.name}`}
              >
                {info.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Style Preset */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Style</label>
        <Select value={style} onValueChange={(v) => setStyle(v as any)}>
          <SelectTrigger aria-label="Select Style" size="sm" className="w-full">
            <SelectValue placeholder="Style" />
          </SelectTrigger>
          <SelectContent>
            {AVAILABLE_STYLES.map((s) => (
              <SelectItem key={s} value={s} aria-label={`Switch to ${STYLE_CONFIG[s].name} style`}>
                {STYLE_CONFIG[s].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Radius Preset */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Radius</label>
        <Select value={radius} onValueChange={(v) => setRadius(v as any)}>
          <SelectTrigger aria-label="Select Radius" size="sm" className="w-full">
            <SelectValue placeholder="Radius" />
          </SelectTrigger>
          <SelectContent>
            {AVAILABLE_RADII.map((r) => (
              <SelectItem key={r} value={r} aria-label={`Set radius ${r}`}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Menu Accent */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Menu Accent</label>
        <div className="flex gap-2">
          {AVAILABLE_MENU_ACCENTS.map((m) => (
            <button
              key={m}
              onClick={() => setMenuAccent(m)}
              className={`px-2 py-1 rounded border text-xs transition-colors ${
                menuAccent === m ? 'bg-muted text-foreground border-foreground' : 'bg-background text-foreground border-border hover:bg-muted'
              }`}
              aria-label={`Set menu accent ${m}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Font Overrides */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Fonts</label>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-xs">Sans</span>
            <Select value={fontSans} onValueChange={(v) => setFonts({ sans: v as any })}>
              <SelectTrigger aria-label="Select Sans Font" size="sm" className="w-full">
                <SelectValue placeholder="Sans" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Theme Default</SelectItem>
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="noto">Noto Sans</SelectItem>
                <SelectItem value="nunito">Nunito Sans</SelectItem>
                <SelectItem value="figtree">Figtree</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs">Serif</span>
            <Select value={fontSerif} onValueChange={(v) => setFonts({ serif: v as any })}>
              <SelectTrigger aria-label="Select Serif Font" size="sm" className="w-full">
                <SelectValue placeholder="Serif" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Theme Default</SelectItem>
                <SelectItem value="georgia">Georgia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs">Mono</span>
            <Select value={fontMono} onValueChange={(v) => setFonts({ mono: v as any })}>
              <SelectTrigger aria-label="Select Mono Font" size="sm" className="w-full">
                <SelectValue placeholder="Mono" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Theme Default</SelectItem>
                <SelectItem value="geist-mono">Geist Mono</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
