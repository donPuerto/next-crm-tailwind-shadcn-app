'use client';

import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

import { DEFAULT_THEME, ThemeColor, COLOR_CONFIG, AVAILABLE_COLORS } from '@/components/themes/theme.config';

const THEME_COOKIE = 'active_theme';
const COLOR_COOKIE = 'active_color';

/**
 * Persist theme values as cookies for SSR alignment.
 * @param name - Cookie name
 * @param value - Cookie value
 */
function setCookie(name: string, value: string) {
    if (typeof window === 'undefined') return;
    document.cookie = `${name}=${value}; path=/; max-age=31536000; SameSite=Lax; ${window.location.protocol === 'https:' ? 'Secure;' : ''}`;
}

type ThemeContextType = {
    activeTheme: string;
    setActiveTheme: (theme: string) => void;
    activeColor: ThemeColor | undefined;
    setActiveColor: (color: ThemeColor) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Active theme provider that syncs theme and color with cookies and DOM.
 * @param children - Wrapped application content
 * @param initialTheme - Initial theme from SSR cookies
 * @returns Theme context provider
 */
export function ActiveThemeProvider({
    children,
    initialTheme,
    initialColor
}: {
    children: ReactNode;
    initialTheme?: string;
    initialColor?: string;
}) {
    const themeToUse = initialTheme || DEFAULT_THEME;
    const [activeTheme, setActiveTheme] = useState<string>(themeToUse);
    const [activeColor, setActiveColor] = useState<ThemeColor | undefined>(() => {
        // Only set color from cookie if user explicitly selected one
        // Otherwise, let theme's CSS handle the default color
        if (initialColor && (AVAILABLE_COLORS as readonly string[]).includes(initialColor)) {
            return initialColor as ThemeColor;
        }
        return undefined;
    });

    // Apply theme style changes and notify listeners
    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme !== activeTheme) {
            setCookie(THEME_COOKIE, activeTheme);
            localStorage.setItem('app-theme', activeTheme);
            document.documentElement.removeAttribute('data-theme');

            // Cleanup old theme classes to avoid style leakage
            Array.from(document.body.classList)
                .filter((className) => className.startsWith('theme-'))
                .forEach((className) => document.body.classList.remove(className));

            // Set new theme attribute for CSS variables
            if (activeTheme) {
                document.documentElement.setAttribute('data-theme', activeTheme);
            }

            // Reset color to undefined when switching themes
            // This lets the theme's own CSS variables define the primary color
            // Only apply a color override if user explicitly selected one
            if (activeColor) {
                setActiveColor(undefined);
            }
            
            // Always clear color cookies/localStorage when theme changes
            // This prevents old color selections from persisting across theme switches
            document.cookie = `${COLOR_COOKIE}=; path=/; max-age=0; SameSite=Lax;`;
            localStorage.removeItem('app-color');

            // Broadcast theme change for charts and listeners
            window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: activeTheme } }));
        }
    }, [activeTheme, activeColor]);

    // Apply color changes and notify listeners
    useEffect(() => {
        if (!activeColor) {
            // Clear color override - use theme's default color
            document.documentElement.removeAttribute('data-color');
            document.documentElement.style.removeProperty('--primary');
            document.documentElement.style.removeProperty('--ring');
            
            // Clear cookies and localStorage when no color is selected
            document.cookie = `${COLOR_COOKIE}=; path=/; max-age=0; SameSite=Lax;`;
            localStorage.removeItem('app-color');
            return;
        }

        setCookie(COLOR_COOKIE, activeColor);
        localStorage.setItem('app-color', activeColor);
        const colorConfig = COLOR_CONFIG[activeColor];
        if (colorConfig) {
            // Override CSS variables for primary color
            document.documentElement.style.setProperty('--primary', colorConfig.hex);
            document.documentElement.style.setProperty('--ring', colorConfig.hex);
            // We might need to adjust foregrounds based on contrast, but for now simple override

            // Also helpful to set a data attribute for styling hooks
            document.documentElement.setAttribute('data-color', activeColor);

            // Broadcast color change for charts and listeners
            window.dispatchEvent(new CustomEvent('theme-changed', { detail: { color: activeColor } }));
        }
    }, [activeColor]);

    return (
        // Theme context provider wrapper
        <ThemeContext.Provider value={{ activeTheme, setActiveTheme, activeColor, setActiveColor }}>
            {children}
        </ThemeContext.Provider>
    );
}

/**
 * Access the active theme context.
 * @returns Theme context values
 */
export function useThemeConfig() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeConfig must be used within an ActiveThemeProvider');
    }
    return context;
}