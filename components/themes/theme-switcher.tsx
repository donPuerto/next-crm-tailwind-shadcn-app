'use client';

import { Check, Moon, Palette, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useThemeConfig } from './active-theme';
import { THEMES, COLOR_CONFIG, AVAILABLE_COLORS } from '@/components/themes/theme.config';

/**
 * Dual Theme Switcher
 * Select for Theme Style (Layout/Fonts)
 * Grid for Theme Color (Primary Color)
 */
export function ThemeSwitcher() {
    const { setTheme, resolvedTheme } = useTheme();
    const { activeTheme, setActiveTheme, activeColor, setActiveColor } = useThemeConfig();
    const [radius, setRadius] = React.useState(0.5);

    const handleThemeToggle = React.useCallback(
        (e?: React.MouseEvent) => {
            e?.stopPropagation();
            const newMode = resolvedTheme === 'dark' ? 'light' : 'dark';
            const root = document.documentElement;

            if (!document.startViewTransition) {
                setTheme(newMode);
                return;
            }

            if (e) {
                root.style.setProperty('--x', `${e.clientX}px`);
                root.style.setProperty('--y', `${e.clientY}px`);
            }

            document.startViewTransition(() => {
                setTheme(newMode);
            });
        },
        [resolvedTheme, setTheme]
    );

    const handleRadiusChange = (value: number[]) => {
        const newRadius = value[0];
        setRadius(newRadius);
        document.documentElement.style.setProperty('--radius', `${newRadius}rem`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='h-9 w-9'>
                    <Palette className='h-4 w-4' />
                    <span className='sr-only'>Theme settings</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-80 p-4'>
                {/* Header */}
                <div className='flex items-center justify-between mb-4'>
                    <span className='text-sm font-semibold leading-none'>Theme Settings</span>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={handleThemeToggle}
                        className='h-8 w-8 rounded-full hover:bg-muted'
                    >
                        <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                        <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                        <span className='sr-only'>Toggle theme</span>
                    </Button>
                </div>

                {/* Theme Style Selection (Dropdown) */}
                <div className='space-y-3'>
                    <Label className='text-xs text-muted-foreground font-medium uppercase tracking-wider'>
                        Theme Style
                    </Label>
                    <Select value={activeTheme} onValueChange={setActiveTheme}>
                        <SelectTrigger className='h-8'>
                            <SelectValue placeholder='Select theme' />
                        </SelectTrigger>
                        <SelectContent>
                            {THEMES.map((theme) => (
                                <SelectItem key={theme.value} value={theme.value}>
                                    {theme.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='my-4 h-px bg-border/50' />

                {/* Theme Color Selection (Grid) */}
                <div className='space-y-3'>
                    <Label className='text-xs text-muted-foreground font-medium uppercase tracking-wider'>
                        Theme Color
                    </Label>
                    <div className='grid grid-cols-5 gap-2'>
                        {AVAILABLE_COLORS.map((color) => (
                            <button
                                key={color}
                                onClick={() => setActiveColor(color)}
                                className={`group flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all hover:scale-105 ${activeColor === color
                                    ? 'border-primary ring-2 ring-primary/20 scale-105'
                                    : 'border-transparent hover:border-muted-foreground/30'
                                    }`}
                                style={{ backgroundColor: COLOR_CONFIG[color].hex }}
                                title={COLOR_CONFIG[color].name}
                            >
                                {activeColor === color && (
                                    <Check className='h-4 w-4 text-white drop-shadow-md' />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='my-4 h-px bg-border/50' />

                {/* Radius Slider */}
                <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                        <Label className='text-xs text-muted-foreground font-medium uppercase tracking-wider'>
                            Radius
                        </Label>
                        <span className='text-xs font-mono text-muted-foreground'>
                            {radius.toFixed(2)}rem
                        </span>
                    </div>
                    <Slider
                        min={0}
                        max={1}
                        step={0.1}
                        value={[radius]}
                        onValueChange={handleRadiusChange}
                        className='cursor-pointer'
                    />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
