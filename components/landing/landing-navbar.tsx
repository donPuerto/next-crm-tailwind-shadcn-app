"use client";

import Link from "next/link";
import { Menu, X, ArrowRight, Github } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { useTheme } from "next-themes";
import { useThemeConfig } from "@/components/themes/active-theme";
import { AVAILABLE_THEMES, THEME_CONFIG } from "@/lib/constants/themes";

const NAV_ITEMS = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Integrations", href: "#integrations" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
];

interface LandingNavbarProps {
    className?: string;
}

/**
 * LandingNavbar - Fully responsive navigation bar
 * Breakpoint behavior:
 * - XL (1280px+): Full nav with all items
 * - LG (1024px+): Nav links + theme + buttons (hide "Star on GitHub")
 * - MD (768px+): Nav links + theme + Dashboard button
 * - SM (640px+): Logo + theme + Dashboard button + hamburger
 * - XS (<640px): Logo + hamburger menu
 */
export function LandingNavbar({ className }: LandingNavbarProps) {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const { theme: darkMode, setTheme: setDarkMode } = useTheme();
    const { activeTheme, setActiveTheme } = useThemeConfig();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "z-40 transition-all duration-300 ease-in-out border-b border-transparent",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-border shadow-sm py-2"
                    : "bg-transparent py-4",
                className
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                {/* Logo Area */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#FF3B6B]/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Logo size="md" className="relative bg-background group-hover:scale-105 transition-transform duration-300 text-[#FF3B6B] border-[#FF3B6B]/20" />
                        </div>
                        <span className="font-bold text-base sm:text-lg tracking-tight hidden sm:inline-block">
                            Don Puerto
                        </span>
                    </Link>
                </div>

                {/* Desktop Nav Links - Hidden below LG */}
                <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-base font-semibold text-muted-foreground hover:text-[#FF3B6B] transition-colors relative group"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF3B6B] rounded-full group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}
                </nav>

                {/* Actions Area */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Theme Dropdown - Always visible */}
                    {mounted && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full hover:bg-[#FF3B6B]/10 hover:text-[#FF3B6B] transition-colors"
                                >
                                    <Icon name="Palette" size={20} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setDarkMode(darkMode === 'dark' ? 'light' : 'dark')}>
                                    <Icon name={darkMode === 'dark' ? "Sun" : "Moon"} className="mr-2 h-4 w-4" />
                                    {darkMode === 'dark' ? "Light Mode" : "Dark Mode"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel className="text-xs text-muted-foreground">Themes</DropdownMenuLabel>
                                {AVAILABLE_THEMES.slice(0, 5).map((t) => (
                                    <DropdownMenuItem key={t} onClick={() => setActiveTheme(t)} className="justify-between">
                                        {THEME_CONFIG[t].name}
                                        {activeTheme === t && <Icon name="Check" className="h-3 w-3" />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    {/* Star on GitHub - Visible XL and above */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full hidden xl:flex border-[#FF3B6B]/20 hover:bg-[#FF3B6B]/5 hover:border-[#FF3B6B]/40 transition-all"
                        asChild
                    >
                        <Link href="https://github.com/donpuerto" target="_blank">
                            <Github className="mr-2 h-4 w-4" /> Star on GitHub
                        </Link>
                    </Button>

                    {/* Dashboard Button - Visible SM and above */}
                    <Button
                        size="sm"
                        className="rounded-full px-4 sm:px-6 shadow-lg shadow-[#FF3B6B]/20 hover:shadow-[#FF3B6B]/40 transition-all hover:scale-105 active:scale-95 bg-[#FF3B6B] hover:bg-[#E63560] hidden sm:flex"
                        asChild
                    >
                        <Link href="/dashboard">
                            Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>

                    {/* Mobile Menu Toggle - Visible below LG */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden rounded-full hover:bg-[#FF3B6B]/10 hover:text-[#FF3B6B]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Overlay - Shown when menu is open and below LG */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b p-4 lg:hidden shadow-xl animate-in slide-in-from-top-4 duration-200">
                    <nav className="flex flex-col gap-4">
                        {/* Nav Links */}
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-medium p-2 hover:bg-muted rounded-lg transition-colors hover:text-[#FF3B6B]"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="h-px bg-border my-2" />

                        {/* Mobile-only Dashboard Button (for XS screens) */}
                        <Button
                            className="w-full justify-center rounded-full bg-[#FF3B6B] hover:bg-[#E63560] sm:hidden"
                            asChild
                        >
                            <Link href="/dashboard">
                                Access Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>

                        {/* GitHub Link in Mobile Menu */}
                        <Button
                            variant="outline"
                            className="w-full justify-center rounded-full border-[#FF3B6B]/20 hover:bg-[#FF3B6B]/5"
                            asChild
                        >
                            <Link href="https://github.com/donpuerto" target="_blank">
                                <Github className="mr-2 h-4 w-4" /> Star on GitHub
                            </Link>
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
}
