"use client";

import { TrendingUp, Users, Clock } from "lucide-react";
import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";
import { useThemeColor } from "@/app/hooks/use-theme-color";
import { cn } from "@/lib/utils";

const STATS = [
    {
        icon: Users,
        value: "10,000+",
        label: "Active Users",
        description: "Growing every day"
    },
    {
        icon: TrendingUp,
        value: "50,000+",
        label: "Deals Closed",
        description: "And counting"
    },
    {
        icon: Clock,
        value: "40%",
        label: "Time Saved",
        description: "On average"
    }
];

export function StatsSection() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
    const { color: themeColor } = useThemeColor();

    return (
        <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30 relative group">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
                background: `linear-gradient(to right, ${themeColor}00, ${themeColor}26, ${themeColor}00)`
            }} />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {STATS.map((stat, index) => (
                        <div
                            key={index}
                            className={cn(
                                "text-center transform transition-all duration-700",
                                isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            )}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300" style={{
                                backgroundColor: `${themeColor}1a`,
                                color: themeColor
                            }}>
                                <stat.icon className="w-8 h-8" />
                            </div>
                            <div className="text-4xl md:text-5xl font-extrabold mb-2 bg-clip-text text-transparent" style={{
                                backgroundImage: `linear-gradient(to right, ${themeColor}, ${themeColor}cc)`
                            }}>
                                {stat.value}
                            </div>
                            <div className="text-lg font-bold text-foreground mb-1">
                                {stat.label}
                            </div>
                            <div className="text-sm text-muted-foreground font-medium">
                                {stat.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
