'use client';

import { useState, useEffect } from 'react';
import {
  Theme,
  ThemeColor,
  AVAILABLE_THEMES,
  AVAILABLE_COLORS,
  DEFAULT_THEME,
  DEFAULT_COLOR,
  THEME_STORAGE_KEY,
  COLOR_STORAGE_KEY,
  COLOR_CONFIG,
  BaseColor,
  AVAILABLE_BASE_COLORS,
  BASE_COLOR_CONFIG,
  DEFAULT_BASE_COLOR,
  BASE_COLOR_STORAGE_KEY,
  StylePreset,
  AVAILABLE_STYLES,
  STYLE_CONFIG,
  DEFAULT_STYLE,
  AVAILABLE_RADII,
  RadiusOption,
  AVAILABLE_MENU_ACCENTS,
  MenuAccent,
  DEFAULT_MENU_ACCENT,
  STYLE_STORAGE_KEY,
  RADIUS_STORAGE_KEY,
  MENU_ACCENT_STORAGE_KEY,
  DARK_MODE_STORAGE_KEY,
  LAYOUT_MODE_STORAGE_KEY
} from '@/lib/constants/themes';

/**
 * Hook to manage theme and color switching
 * Handles localStorage persistence and DOM updates
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [color, setColorState] = useState<ThemeColor>(DEFAULT_COLOR);
  const [baseColor, setBaseColorState] = useState<BaseColor>(DEFAULT_BASE_COLOR);
  const [style, setStyleState] = useState<StylePreset>(DEFAULT_STYLE);
  const [radius, setRadiusState] = useState<RadiusOption>('md');
  const [menuAccent, setMenuAccentState] = useState<MenuAccent>(DEFAULT_MENU_ACCENT);
  const [isDark, setIsDark] = useState(false);
  const [layoutMode, setLayoutModeState] = useState<'layout-full' | 'layout-fixed'>('layout-full');

  // Font overrides (optional) - defaults to theme-defined fonts
  type FontChoice = 'default' | 'inter' | 'noto' | 'nunito' | 'figtree';
  const [fontSans, setFontSans] = useState<FontChoice>('default');
  const [fontSerif, setFontSerif] = useState<'default' | 'georgia'>('default');
  const [fontMono, setFontMono] = useState<'default' | 'geist-mono'>('default');
  const [mounted, setMounted] = useState(false);

  // Initialize theme and color from localStorage on client-side
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    const savedColor = localStorage.getItem(COLOR_STORAGE_KEY) as ThemeColor | null;
    const savedBaseColor = localStorage.getItem(BASE_COLOR_STORAGE_KEY) as BaseColor | null;
    const savedStyle = localStorage.getItem(STYLE_STORAGE_KEY) as StylePreset | null;
    const savedRadius = localStorage.getItem(RADIUS_STORAGE_KEY) as RadiusOption | null;
    const savedMenuAccent = localStorage.getItem(MENU_ACCENT_STORAGE_KEY) as MenuAccent | null;
    const savedDarkMode = localStorage.getItem(DARK_MODE_STORAGE_KEY);
    const savedLayoutMode = localStorage.getItem(LAYOUT_MODE_STORAGE_KEY) as 'layout-full' | 'layout-fixed' | null;

    const initialTheme = (savedTheme && AVAILABLE_THEMES.includes(savedTheme)) ? savedTheme : DEFAULT_THEME;
    const initialColor = (savedColor && AVAILABLE_COLORS.includes(savedColor)) ? savedColor : DEFAULT_COLOR;
    const initialBaseColor = (savedBaseColor && AVAILABLE_BASE_COLORS.includes(savedBaseColor)) ? savedBaseColor : DEFAULT_BASE_COLOR;
    const initialStyle = (savedStyle && AVAILABLE_STYLES.includes(savedStyle)) ? savedStyle : DEFAULT_STYLE;
    const initialRadius = (savedRadius && AVAILABLE_RADII.includes(savedRadius)) ? savedRadius : 'md';
    const initialMenuAccent = (savedMenuAccent && AVAILABLE_MENU_ACCENTS.includes(savedMenuAccent)) ? savedMenuAccent : DEFAULT_MENU_ACCENT;
    const initialDark = savedDarkMode === 'true';
    const initialLayout = savedLayoutMode === 'layout-fixed' ? 'layout-fixed' : 'layout-full';

    setThemeState(initialTheme);
    setColorState(initialColor);
    setBaseColorState(initialBaseColor);
    setStyleState(initialStyle);
    setRadiusState(initialRadius);
    setMenuAccentState(initialMenuAccent);
    setIsDark(initialDark);
    setLayoutModeState(initialLayout);

    applyAll({
      theme: initialTheme,
      color: initialColor,
      baseColor: initialBaseColor,
      style: initialStyle,
      radius: initialRadius,
      menuAccent: initialMenuAccent,
      dark: initialDark,
      layoutMode: initialLayout,
      fontSans,
      fontSerif,
      fontMono
    });

    setMounted(true);
  }, []);

  /**
   * Apply theme by updating data-theme attribute on document element
   */
  const applyTheme = (newTheme: Theme) => {
    if (!AVAILABLE_THEMES.includes(newTheme)) return;
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    setThemeState(newTheme);
  };

  /**
   * Apply color by updating CSS variables
   */
  const applyColor = (newColor: ThemeColor) => {
    if (!AVAILABLE_COLORS.includes(newColor)) return;

    const colorValue = COLOR_CONFIG[newColor];
    const root = document.documentElement;

    // Update primary/accent tokens to match selected color
    root.style.setProperty('--primary-color', colorValue.hex);
    root.style.setProperty('--color-custom-accent', newColor);
    root.style.setProperty('--primary', colorValue.hex);
    root.style.setProperty('--accent', colorValue.hex);
    root.style.setProperty('--ring', colorValue.hex);

    const hex = colorValue.hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const foreground = luminance > 0.5 ? '#000000' : '#FFFFFF';
    root.style.setProperty('--primary-foreground', foreground);
    root.style.setProperty('--accent-foreground', foreground);

    localStorage.setItem(COLOR_STORAGE_KEY, newColor);
    setColorState(newColor);
  };

  /**
   * Apply base color (neutral surface tone)
   */
  const applyBaseColor = (newBase: BaseColor) => {
    if (!AVAILABLE_BASE_COLORS.includes(newBase)) return;
    const base = BASE_COLOR_CONFIG[newBase];
    const root = document.documentElement;
    root.style.setProperty('--base-color', base.hex);
    localStorage.setItem(BASE_COLOR_STORAGE_KEY, newBase);
    setBaseColorState(newBase);
  };

  /**
   * Apply style preset
   */
  const applyStyle = (newStyle: StylePreset) => {
    if (!AVAILABLE_STYLES.includes(newStyle)) return;
    const s = STYLE_CONFIG[newStyle];
    const root = document.documentElement;
    // Map style preset to CSS variables used globally
    const radiusMap: Record<'none' | 'sm' | 'md' | 'lg', string> = {
      none: '0px',
      sm: '6px',
      md: '8px',
      lg: '12px'
    };
    root.style.setProperty('--radius', radiusMap[s.radius]);
    root.style.setProperty('--spacing-base', `${s.spacing}rem`);
    root.style.setProperty('--tracking', `${s.tracking}em`);
    root.style.setProperty('--shadow-weight', s.shadow);
    localStorage.setItem(STYLE_STORAGE_KEY, newStyle);
    setStyleState(newStyle);
  };

  /**
   * Apply explicit radius override (if user chooses independent of style)
   */
  const applyRadius = (newRadius: RadiusOption) => {
    if (!AVAILABLE_RADII.includes(newRadius)) return;
    const root = document.documentElement;
    const radiusMap: Record<RadiusOption, string> = {
      none: '0px',
      sm: '6px',
      md: '8px',
      lg: '12px'
    };
    root.style.setProperty('--radius', radiusMap[newRadius]);
    localStorage.setItem(RADIUS_STORAGE_KEY, newRadius);
    setRadiusState(newRadius);
  };

  /**
   * Apply menu accent weight
   */
  const applyMenuAccent = (newAccent: MenuAccent) => {
    if (!AVAILABLE_MENU_ACCENTS.includes(newAccent)) return;
    const root = document.documentElement;
    root.style.setProperty('--menu-accent-weight', newAccent);
    localStorage.setItem(MENU_ACCENT_STORAGE_KEY, newAccent);
    setMenuAccentState(newAccent);
  };

  /**
   * Apply dark mode by toggling the `dark` class on html
   */
  const applyDarkMode = (nextDark: boolean) => {
    const root = document.documentElement;
    if (nextDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(DARK_MODE_STORAGE_KEY, String(nextDark));
    setIsDark(nextDark);
  };

  /**
   * Apply layout mode by toggling html class
   */
  const applyLayoutMode = (nextMode: 'layout-full' | 'layout-fixed') => {
    const root = document.documentElement;
    root.classList.remove('layout-full', 'layout-fixed');
    root.classList.add(nextMode);
    localStorage.setItem(LAYOUT_MODE_STORAGE_KEY, nextMode);
    setLayoutModeState(nextMode);
  };

  /**
   * Apply font overrides (optional)
   */
  const applyFonts = (opts: { sans?: FontChoice; serif?: 'default' | 'georgia'; mono?: 'default' | 'geist-mono' }) => {
    const root = document.documentElement;
    if (opts.sans) {
      setFontSans(opts.sans);
      const map: Record<FontChoice, string> = {
        default: 'var(--font-sans)', // keep theme default
        inter: 'var(--font-inter)',
        noto: 'var(--font-noto-sans)',
        nunito: 'var(--font-nunito-sans)',
        figtree: 'var(--font-figtree)'
      };
      root.style.setProperty('--font-sans', map[opts.sans]);
    }
    if (opts.serif) {
      setFontSerif(opts.serif);
      const map: Record<'default' | 'georgia', string> = {
        default: 'var(--font-serif)', // keep theme default
        georgia: 'Georgia, "Times New Roman", serif'
      };
      root.style.setProperty('--font-serif', map[opts.serif]);
    }
    if (opts.mono) {
      setFontMono(opts.mono);
      const map: Record<'default' | 'geist-mono', string> = {
        default: 'var(--font-mono)', // keep theme default
        'geist-mono': 'var(--font-geist-mono)'
      };
      root.style.setProperty('--font-mono', map[opts.mono]);
    }
  };

  /**
   * Apply both theme and color together
   */
  const applyThemeAndColor = (newTheme: Theme, newColor: ThemeColor) => {
    applyTheme(newTheme);
    applyColor(newColor);
  };

  /**
   * Apply all configurable options cohesively
   */
  const applyAll = (opts: {
    theme?: Theme;
    color?: ThemeColor;
    baseColor?: BaseColor;
    style?: StylePreset;
    radius?: RadiusOption;
    menuAccent?: MenuAccent;
    dark?: boolean;
    layoutMode?: 'layout-full' | 'layout-fixed';
    fontSans?: FontChoice;
    fontSerif?: 'default' | 'georgia';
    fontMono?: 'default' | 'geist-mono';
  }) => {
    if (opts.theme) applyTheme(opts.theme);
    if (opts.color) applyColor(opts.color);
    if (opts.baseColor) applyBaseColor(opts.baseColor);
    if (opts.style) applyStyle(opts.style);
    if (opts.radius) applyRadius(opts.radius);
    if (opts.menuAccent) applyMenuAccent(opts.menuAccent);
    if (typeof opts.dark === 'boolean') applyDarkMode(opts.dark);
    if (opts.layoutMode) applyLayoutMode(opts.layoutMode);
    applyFonts({ sans: opts.fontSans, serif: opts.fontSerif, mono: opts.fontMono });
  };

  return {
    theme,
    color,
    baseColor,
    style,
    radius,
    menuAccent,
    isDark,
    layoutMode,
    fontSans,
    fontSerif,
    fontMono,
    setTheme: applyTheme,
    setColor: applyColor,
    setBaseColor: applyBaseColor,
    setStyle: applyStyle,
    setRadius: applyRadius,
    setMenuAccent: applyMenuAccent,
    setDarkMode: applyDarkMode,
    setLayoutMode: applyLayoutMode,
    setFonts: applyFonts,
    setThemeAndColor: applyThemeAndColor,
    applyAll,
    mounted,
    isVercel: theme === 'vercel',
    isNeoBrutalism: theme === 'neo-brutalism'
  };
}
