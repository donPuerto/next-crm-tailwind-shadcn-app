'use client';

import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

import { DEFAULT_THEME, ThemeColor, COLOR_CONFIG } from '@/components/themes/theme.config';

const THEME_COOKIE = 'active_theme';
const COLOR_COOKIE = 'active_color';

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

export function ActiveThemeProvider({
    children,
    initialTheme
}: {
    children: ReactNode;
    initialTheme?: string;
}) {
    const themeToUse = initialTheme || DEFAULT_THEME;
    const [activeTheme, setActiveTheme] = useState<string>(themeToUse);
    const [activeColor, setActiveColor] = useState<ThemeColor | undefined>(undefined);

    // Handle Theme Style Change
    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme !== activeTheme) {
            setCookie(THEME_COOKIE, activeTheme);
            document.documentElement.removeAttribute('data-theme');

            // Cleanup old theme classes
            Array.from(document.body.classList)
                .filter((className) => className.startsWith('theme-'))
                .forEach((className) => document.body.classList.remove(className));

            // Set new theme
            if (activeTheme) {
                document.documentElement.setAttribute('data-theme', activeTheme);
            }
        }
    }, [activeTheme]);

    // Handle Color Change
    useEffect(() => {
        if (!activeColor) return;

        setCookie(COLOR_COOKIE, activeColor);
        const colorConfig = COLOR_CONFIG[activeColor];
        if (colorConfig) {
            // Override CSS variables for primary color
            document.documentElement.style.setProperty('--primary', colorConfig.hex);
            document.documentElement.style.setProperty('--ring', colorConfig.hex);
            // We might need to adjust foregrounds based on contrast, but for now simple override

            // Also helpful to set a data attribute for styling hooks
            document.documentElement.setAttribute('data-color', activeColor);
        }
    }, [activeColor]);

    return (
        <ThemeContext.Provider value={{ activeTheme, setActiveTheme, activeColor, setActiveColor }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeConfig() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeConfig must be used within an ActiveThemeProvider');
    }
    return context;
}