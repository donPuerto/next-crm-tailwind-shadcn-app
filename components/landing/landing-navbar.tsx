"use client";

import Link from "next/link";
import { Menu, X, ArrowRight, Github } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ThemeSwitcher } from "@/components/themes/theme-switcher";
import { useThemeColor } from "@/app/hooks/use-theme-color";

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
    const [mounted, setMounted] = React.useState(false);
    const [radiusValue, setRadiusValue] = React.useState("0.5rem");
    const { color, mounted: colorMounted } = useThemeColor();

    React.useEffect(() => {
        setMounted(true);
        
        // Get initial radius value from CSS variable
        const root = document.documentElement;
        const radiusValue = getComputedStyle(root).getPropertyValue('--radius').trim();
        if (radiusValue) setRadiusValue(radiusValue);
        
        // Listen for radius changes via MutationObserver on style attribute
        const observer = new MutationObserver(() => {
            const newRadius = getComputedStyle(root).getPropertyValue('--radius').trim();
            if (newRadius && newRadius !== radiusValue) {
                setRadiusValue(newRadius);
            }
        });
        
        observer.observe(root, { attributes: true, attributeFilter: ['style'] });
        return () => observer.disconnect();
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
                            <div className="absolute inset-0 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity bg-primary/20" />
                            <Logo 
                                size="md" 
                                className="relative bg-background group-hover:scale-105 transition-transform duration-300 text-primary border-primary/20" 
                                color={colorMounted ? color : undefined} 
                            />
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
                            className="text-base font-semibold text-muted-foreground hover:text-primary transition-colors relative group"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 rounded-full bg-primary group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}
                </nav>

                {/* Actions Area */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Theme Switcher - Always visible */}
                    {mounted && <ThemeSwitcher />}

                    {/* Star on GitHub - Visible XL and above */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="hidden xl:flex transition-all"
                        style={{
                            borderRadius: radiusValue,
                        }}
                        asChild
                    >
                        <Link href="https://github.com/donpuerto" target="_blank">
                            <Github className="mr-2 h-4 w-4" /> Star on GitHub
                        </Link>
                    </Button>

                    {/* Dashboard Button - Visible SM and above */}
                    <Button
                        size="sm"
                        className="px-4 sm:px-6 transition-all hover:scale-105 active:scale-95 hidden sm:flex"
                        style={{
                            borderRadius: radiusValue,
                        }}
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
                        className="lg:hidden"
                        style={{
                            borderRadius: radiusValue,
                        }}
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
                                className="text-lg font-medium p-2 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                                style={{
                                    borderRadius: radiusValue,
                                }}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="h-px bg-border my-2" />

                        {/* Mobile-only Dashboard Button (for XS screens) */}
                        <Button
                            className="w-full justify-center sm:hidden"
                            style={{
                                borderRadius: radiusValue,
                            }}
                            asChild
                        >
                            <Link href="/dashboard">
                                Access Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>

                        {/* GitHub Link in Mobile Menu */}
                        <Button
                            variant="outline"
                            className="w-full justify-center"
                            style={{
                                borderRadius: radiusValue,
                            }}
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
