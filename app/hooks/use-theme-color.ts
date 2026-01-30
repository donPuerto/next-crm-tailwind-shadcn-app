'use client';

import { useEffect, useState } from 'react';
import { COLOR_CONFIG, THEME_DEFAULT_COLORS } from '@/components/themes/theme.config';
import type { ThemeColor } from '@/components/themes/theme.config';

/**
 * Hook to get the current theme color hex value from localStorage or theme defaults.
 * Used in landing page and other components that need dynamic color updates.
 * Returns hex color string from localStorage override, or theme's default color.
 */
export function useThemeColor() {
  const [color, setColor] = useState<string>('#EC4899'); // initial fallback
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Function to get color from localStorage or theme default
    const getCurrentColor = () => {
      const storedColor = localStorage.getItem('app-color') as ThemeColor | null;
      if (storedColor && COLOR_CONFIG[storedColor]) {
        return COLOR_CONFIG[storedColor].hex;
      }
      
      // If no localStorage color, use theme's default color
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'vercel';
      return THEME_DEFAULT_COLORS[currentTheme] || '#EC4899';
    };
    
    // Get initial color
    setColor(getCurrentColor());

    // Listen for theme changes
    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.color) {
        const colorName = customEvent.detail.color as ThemeColor;
        if (COLOR_CONFIG[colorName]) {
          setColor(COLOR_CONFIG[colorName].hex);
        }
      } else {
        // No color in event = theme switched, use CSS default
        setColor(getCurrentColor());
      }
    };

    window.addEventListener('theme-changed', handleThemeChange);
    
    // Poll for changes every 500ms (fallback)
    const pollInterval = setInterval(() => {
      const storedColor = localStorage.getItem('app-color') as ThemeColor | null;
      if (storedColor && COLOR_CONFIG[storedColor]) {
        const newColor = COLOR_CONFIG[storedColor].hex;
        if (newColor !== color) {
          setColor(newColor);
        }
      } else {
        // No localStorage color = use theme default
        const defaultColor = getCurrentColor();
        if (defaultColor !== color) {
          setColor(defaultColor);
        }
      }
    }, 500);

    return () => {
      window.removeEventListener('theme-changed', handleThemeChange);
      clearInterval(pollInterval);
    };
  }, [color]);

  return { color, mounted };
}
