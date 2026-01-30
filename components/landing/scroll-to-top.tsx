"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useThemeColor } from "@/app/hooks/use-theme-color";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const { color: themeColor } = useThemeColor();

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Button
            size="icon"
            className={cn(
                "fixed bottom-8 right-8 z-50 rounded-full transition-all duration-300 hover:scale-110",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            )}
            style={{
                backgroundColor: themeColor,
                boxShadow: `0 10px 15px ${themeColor}33`
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(0.9)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'brightness(1)';
            }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            <ArrowUp className="h-5 w-5" />
        </Button>
    );
}
