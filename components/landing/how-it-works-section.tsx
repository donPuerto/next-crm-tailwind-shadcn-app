"use client";

import { UserPlus, Settings, Rocket, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";
import { useThemeColor } from "@/app/hooks/use-theme-color";
import { cn } from "@/lib/utils";

const STEPS = [
    {
        number: "01",
        title: "Sign Up",
        description: "Create your account in seconds. No credit card required for the 14-day trial.",
        icon: UserPlus
    },
    {
        number: "02",
        title: "Import & Setup",
        description: "Import your contacts and customize your pipeline to match your workflow.",
        icon: Settings
    },
    {
        number: "03",
        title: "Launch",
        description: "Invite your team and start managing deals. Our AI helps you get organized fast.",
        icon: Rocket
    },
    {
        number: "04",
        title: "Grow",
        description: "Watch your sales soar with automated workflows and actionable insights.",
        icon: TrendingUp
    }
];

export function HowItWorksSection() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
    const { color: themeColor } = useThemeColor();

    return (
        <section ref={ref} id="how-it-works" className="py-16 md:py-24 bg-background relative group">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
                background: `linear-gradient(to right, ${themeColor}00, ${themeColor}26, ${themeColor}00)`
            }} />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        How it works
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
                        Get up and running in minutes, not months. Here&apos;s how simple it is.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Desktop: Horizontal Timeline */}
                    <div className="hidden md:grid md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="absolute top-16 left-0 right-0 h-0.5" style={{
                            backgroundImage: `linear-gradient(to right, ${themeColor}33, ${themeColor}66, ${themeColor}33)`
                        }} />

                        {STEPS.map((step, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "relative transform transition-all duration-700",
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                )}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                {/* Icon Circle */}
                                <div className="relative z-10 mx-auto w-32 h-32 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 text-white" style={{
                                    backgroundImage: `linear-gradient(to bottom right, ${themeColor}, ${themeColor}cc)`,
                                    boxShadow: `0 20px 25px -5px ${themeColor}4d`
                                }}>
                                    <step.icon className="w-14 h-14" />
                                </div>

                                {/* Step Number */}
                                <div className="text-center mt-6 mb-3">
                                    <span className="text-6xl font-black" style={{ color: `${themeColor}1a` }}>
                                        {step.number}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="text-center">
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile: Vertical Timeline */}
                    <div className="md:hidden space-y-8">
                        {STEPS.map((step, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex gap-6 transform transition-all duration-700",
                                    isVisible
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 -translate-x-8"
                                )}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                {/* Icon Circle */}
                                <div className="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center shadow-lg text-white" style={{
                                    backgroundImage: `linear-gradient(to bottom right, ${themeColor}, ${themeColor}cc)`,
                                    boxShadow: `0 10px 15px -3px ${themeColor}4d`
                                }}>
                                    <step.icon className="w-10 h-10" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 pt-2">
                                    <div className="text-4xl font-black mb-2" style={{ color: `${themeColor}1a` }}>
                                        {step.number}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
