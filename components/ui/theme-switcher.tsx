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
        <div className="flex gap-2">
          {AVAILABLE_THEMES.map((themeOption) => (
            <button
              key={themeOption}
              onClick={() => setTheme(themeOption)}
              className={`px-3 py-2 rounded border transition-colors text-sm ${
                theme === themeOption
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-foreground border-border hover:bg-muted'
              }`}
              aria-label={`Switch to ${THEME_CONFIG[themeOption].name} theme`}
            >
              {THEME_CONFIG[themeOption].name}
            </button>
          ))}
        </div>
      </div>

      {/* Color Switcher */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Accent Color</label>
        <div className="grid grid-cols-6 gap-2">
          {AVAILABLE_COLORS.map((colorOption) => {
            const colorInfo = COLOR_CONFIG[colorOption];
            return (
              <button
                key={colorOption}
                onClick={() => setColor(colorOption)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  color === colorOption ? 'border-foreground ring-2 ring-offset-2' : 'border-transparent'
                }`}
                style={{ backgroundColor: colorInfo.hex }}
                title={colorInfo.name}
                aria-label={`Select ${colorInfo.name} color`}
              />
            );
          })}
        </div>
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
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_STYLES.map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-3 py-2 rounded border text-sm transition-colors ${
                style === s ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border hover:bg-muted'
              }`}
              aria-label={`Switch to ${STYLE_CONFIG[s].name} style`}
            >
              {STYLE_CONFIG[s].name}
            </button>
          ))}
        </div>
      </div>

      {/* Radius Preset */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Radius</label>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_RADII.map((r) => (
            <button
              key={r}
              onClick={() => setRadius(r)}
              className={`px-2 py-1 rounded border text-xs transition-colors ${
                radius === r ? 'bg-muted text-foreground border-foreground' : 'bg-background text-foreground border-border hover:bg-muted'
              }`}
              aria-label={`Set radius ${r}`}
            >
              {r}
            </button>
          ))}
        </div>
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
            <select
              className="px-2 py-1 rounded border bg-background text-foreground border-border"
              value={fontSans}
              onChange={(e) => setFonts({ sans: e.target.value as any })}
            >
              <option value="default">Theme Default</option>
              <option value="inter">Inter</option>
              <option value="noto">Noto Sans</option>
              <option value="nunito">Nunito Sans</option>
              <option value="figtree">Figtree</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs">Serif</span>
            <select
              className="px-2 py-1 rounded border bg-background text-foreground border-border"
              value={fontSerif}
              onChange={(e) => setFonts({ serif: e.target.value as any })}
            >
              <option value="default">Theme Default</option>
              <option value="georgia">Georgia</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs">Mono</span>
            <select
              className="px-2 py-1 rounded border bg-background text-foreground border-border"
              value={fontMono}
              onChange={(e) => setFonts({ mono: e.target.value as any })}
            >
              <option value="default">Theme Default</option>
              <option value="geist-mono">Geist Mono</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
