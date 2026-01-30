"use client";

import { Workflow, Mail, Calendar, MessageSquare, Database, Zap } from "lucide-react";
import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";
import { useThemeColor } from "@/app/hooks/use-theme-color";
import { cn } from "@/lib/utils";

const INTEGRATIONS = [
    {
        name: "n8n",
        description: "Workflow automation",
        icon: Workflow,
        color: "#FF6D5A"
    },
    {
        name: "Zapier",
        description: "Connect 5000+ apps",
        icon: Zap,
        color: "#FF4A00"
    },
    {
        name: "Gmail",
        description: "Email integration",
        icon: Mail,
        color: "#EA4335"
    },
    {
        name: "Google Calendar",
        description: "Schedule sync",
        icon: Calendar,
        color: "#4285F4"
    },
    {
        name: "Slack",
        description: "Team messaging",
        icon: MessageSquare,
        color: "#4A154B"
    },
    {
        name: "Supabase",
        description: "Database & Auth",
        icon: Database,
        color: "#3ECF8E"
    }
];

export function IntegrationsSection() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
    const { color: themeColor } = useThemeColor();

    return (
        <section ref={ref} id="integrations" className="py-16 md:py-24 bg-muted/70 relative group">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
                background: `linear-gradient(to right, ${themeColor}00, ${themeColor}26, ${themeColor}00)`
            }} />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Integrates with your stack
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
                        Connect with the tools you already use. No more data silos.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
                    {INTEGRATIONS.map((integration, index) => (
                        <div
                            key={index}
                            className={cn(
                                "group/card flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-border bg-background transition-all duration-500 hover:-translate-y-2 transform cursor-pointer",
                                isVisible
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-90"
                            )}
                            style={{ transitionDelay: `${index * 100}ms` }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = `${themeColor}66`;
                                e.currentTarget.style.boxShadow = `0 20px 25px ${themeColor}1a`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            {/* Icon */}
                            <div
                                className="w-16 h-16 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover/card:scale-110"
                                style={{
                                    backgroundColor: `${integration.color}15`,
                                }}
                            >
                                <integration.icon
                                    className="w-8 h-8 transition-colors duration-300"
                                    style={{
                                        color: integration.color,
                                    }}
                                />
                            </div>

                            {/* Name */}
                            <h3 className="font-bold text-sm text-center mb-1 transition-colors" style={{
                                "--hover-text": themeColor
                            } as React.CSSProperties}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = themeColor;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'currentColor';
                            }}
                            >
                                {integration.name}
                            </h3>

                            {/* Description */}
                            <p className="text-xs text-muted-foreground text-center">
                                {integration.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <p className="text-muted-foreground font-medium">
                        And many more through our API.
                        <a href="#" className="font-bold ml-1 underline underline-offset-4" style={{
                            color: themeColor
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.filter = 'brightness(0.9)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.filter = 'brightness(1)';
                        }}
                        >
                            View all integrations →
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
