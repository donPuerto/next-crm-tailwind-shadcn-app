"use client";

import * as React from "react";
import { DeviceToolbar, DeviceType } from "@/components/landing/device-toolbar";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { ContactForm } from "@/components/landing/contact-form";
import { ScrollToTop } from "@/components/landing/scroll-to-top";
import { SimpleFooter } from "@/components/landing/simple-footer";
import { StatsSection } from "@/components/landing/stats-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { Lightning } from "@/components/bits/lightning";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";
import {
    ArrowRight,
    TrendingUp,
    Users,
    Shield,
    Zap,
    Terminal,
    Cpu,
    Coffee,
    Sparkles,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";

export function LandingPageClient() {
    const [device, setDevice] = React.useState<DeviceType>("full");
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const getContainerWidth = () => {
        switch (device) {
            case "mobile": return "max-w-[375px]";
            case "tablet": return "max-w-[768px]";
            case "desktop": return "max-w-[1280px]";
            default: return "w-full";
        }
    };

    const isSimulated = device !== "full";
    const isMobile = device === "mobile";

    const getContainerClass = () => {
        if (device === "full") return "w-full relative bg-background";
        return cn(
            "mx-auto transition-all duration-500 ease-in-out border-x-8 border-y-[16px] border-slate-900 bg-background shadow-2xl my-8 overflow-x-hidden overflow-y-auto rounded-[2rem] relative ring-4 ring-black/5 h-[800px]",
            getContainerWidth()
        );
    };

    if (!mounted) return null;

    return (
        <div className="flex flex-col min-h-screen bg-muted/10 selection:bg-[#FF3B6B] selection:text-white">
            {/* Device Toolbar - Hidden in production */}
            {process.env.NODE_ENV === 'development' && <DeviceToolbar currentDevice={device} onDeviceChange={setDevice} />}

            {/* Main Content Wrapper - Simulator */}
            <div className={getContainerClass()}>
                {/* Navbar */}
                <LandingNavbar
                    className={cn(
                        isSimulated
                            ? "absolute top-0 w-full left-0 bg-background/50"
                            : process.env.NODE_ENV === 'development' ? "fixed top-[46px] w-full left-0 right-0 bg-background/80" : "fixed top-0 w-full left-0 right-0 bg-background/80"
                    )}
                />

                <main className="flex-1 relative pt-16">
                    {/* Animated Lightning Background */}
                    <div className={cn("absolute top-0 left-0 right-0 overflow-hidden pointer-events-none z-0", isSimulated ? "h-full" : "h-[800px]")}>
                        <Lightning className="opacity-70" intensity={2} />
                    </div>

                    {/* Hero Section */}
                    <HeroSection isMobile={isMobile} />

                    {/* Tech Stack - Banded Background */}
                    <TechStackSection />

                    {/* Stats Section */}
                    <StatsSection />

                    {/* Features Grid */}
                    <FeaturesSection isMobile={isMobile} />

                    {/* How It Works */}
                    <HowItWorksSection />

                    {/* Integrations */}
                    <IntegrationsSection />

                    {/* Testimonials */}
                    <TestimonialsSection />

                    {/* Pricing */}
                    <PricingSection />

                    {/* Contact Form Section */}
                    <ContactForm forceMobile={isMobile} />

                </main>

                {/* Simple Footer */}
                <SimpleFooter forceMobile={isMobile} />

                {/* Scroll To Top */}
                <div className={cn(isSimulated ? "absolute bottom-8 right-8" : "fixed bottom-8 right-8 z-50")}>
                    <ScrollToTop />
                </div>
            </div>
        </div>
    );
}

/**
 * Hero Section Component
 */
function HeroSection({ isMobile }: { isMobile: boolean }) {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

    return (
        <section ref={ref} className={cn("relative overflow-hidden", isMobile ? "pt-12 pb-12" : "pt-20 pb-16 md:pt-32 md:pb-24")}>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 text-center flex flex-col items-center relative z-10">
                {/* Enhanced Badge - Better Contrast */}
                <Badge
                    variant="outline"
                    className={cn(
                        "mb-6 py-2 px-4 rounded-full border-[#FF3B6B]/40 bg-[#FF3B6B]/10 backdrop-blur-sm text-foreground text-xs md:text-sm font-bold shadow-lg shadow-[#FF3B6B]/20 transition-all duration-700",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                >
                    <Sparkles className="w-3.5 h-3.5 mr-2 text-[#FF3B6B]" />
                    New: AI-Powered Automation
                </Badge>

                {/* Hero Heading - Bigger size */}
                <h1 className={cn(
                    "font-extrabold tracking-tight mb-6 leading-[1.1] transition-all duration-700 delay-100",
                    isMobile ? "text-4xl" : "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}>
                    Powerful CRM. <br />
                    <span className="text-[#FF3B6B] drop-shadow-sm">
                        Simple Setup.
                    </span>
                </h1>

                <p className={cn(
                    "text-muted-foreground mb-10 leading-relaxed font-medium mx-auto transition-all duration-700 delay-200",
                    isMobile ? "text-base max-w-sm" : "text-lg md:text-xl max-w-xl",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}>
                    Stop wrestling with complicated enterprise software.
                    Get the tools you need to manage leads, sales, and jobs without the headache.
                </p>

                <div className={cn(
                    "flex gap-4 w-full transition-all duration-700 delay-300",
                    isMobile ? "flex-col" : "flex-col sm:flex-row sm:w-auto",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}>
                    <Button size="lg" className="h-12 px-8 rounded-full text-base font-bold shadow-lg shadow-[#FF3B6B]/20 bg-[#FF3B6B] hover:bg-[#E63560] hover:-translate-y-1 transition-all duration-300" asChild>
                        <Link href="/dashboard">
                            Start for Free <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-base font-bold bg-white/50 backdrop-blur-sm border-2 hover:bg-white/80 transition-all duration-300" asChild>
                        <Link href="#features">See How It Works</Link>
                    </Button>
                </div>

                {/* Social Proof with Gradient Avatars */}
                <div className={cn(
                    "mt-12 flex items-center gap-4 text-xs md:text-sm font-medium text-muted-foreground bg-white/40 backdrop-blur-md px-5 py-2 rounded-full border shadow-sm transition-all duration-1000 delay-500",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}>
                    <div className="flex -space-x-3">
                        {/* Gradient Avatar 1 */}
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-[#FF3B6B] to-[#E63560] flex items-center justify-center text-[10px] font-bold text-white overflow-hidden">
                            SC
                        </div>
                        {/* Gradient Avatar 2 */}
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-[#E63560] to-[#FF3B6B] flex items-center justify-center text-[10px] font-bold text-white overflow-hidden">
                            MJ
                        </div>
                        {/* Gradient Avatar 3 */}
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-[#FF3B6B] via-[#E63560] to-[#FF3B6B] flex items-center justify-center text-[10px] font-bold text-white overflow-hidden">
                            ER
                        </div>
                    </div>
                    <p>Trusted by <span className="font-bold text-foreground">500+</span> pros.</p>
                </div>
            </div>
        </section>
    );
}

/**
 * Tech Stack Section Component
 */
function TechStackSection() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

    return (
        <section ref={ref} className="py-12 bg-muted/30 border-y relative group">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF3B6B]/0 via-[#FF3B6B]/15 to-[#FF3B6B]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
                <p className={cn(
                    "text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8 transition-all duration-500",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                    Built with modern tech
                </p>
                <div className={cn(
                    "flex flex-wrap justify-center gap-8 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500",
                    isVisible ? "opacity-70 scale-100" : "opacity-0 scale-95"
                )}>
                    <div className="flex items-center gap-2 font-bold text-lg">
                        <Terminal className="w-5 h-5" /> Next.js 16
                    </div>
                    <div className="flex items-center gap-2 font-bold text-lg text-[#FF3B6B]">
                        <Cpu className="w-5 h-5" /> Tailwind v4
                    </div>
                    <div className="flex items-center gap-2 font-bold text-lg text-emerald-500">
                        <Zap className="w-5 h-5" /> Supabase
                    </div>
                    <div className="flex items-center gap-2 font-bold text-lg">
                        <Coffee className="w-5 h-5" /> Shadcn UI
                    </div>
                </div>
            </div>
        </section>
    );
}

/**
 * Features Section Component
 */
function FeaturesSection({ isMobile }: { isMobile: boolean }) {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });

    return (
        <section ref={ref} id="features" className="py-20 bg-background relative group">
            {/* Gradient overlay on hover - Stronger for light mode */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF3B6B]/0 via-[#FF3B6B]/15 to-[#FF3B6B]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div
                    ref={headerRef}
                    className={cn(
                        "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
                        headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    <h2 className={cn("font-bold mb-6 tracking-tight", isMobile ? "text-3xl" : "text-3xl md:text-5xl")}>Everything needed.</h2>
                    <p className="text-lg text-muted-foreground">
                        We stripped away the clutter to give you a dashboard that actually makes sense.
                    </p>
                </div>

                <div className={cn("grid gap-8", isMobile ? "grid-cols-1" : "md:grid-cols-3")}>
                    {FEATURES.map((feature, i) => (
                        <Card
                            key={i}
                            className={cn(
                                "relative overflow-hidden border border-border/50 bg-white dark:bg-card hover:border-[#FF3B6B]/30 hover:shadow-xl hover:shadow-[#FF3B6B]/5 transition-all duration-300 rounded-2xl group/card hover:-translate-y-1 transform",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <CardHeader>
                                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-3 shadow-inner bg-pink-50 text-[#FF3B6B]")}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base leading-relaxed font-medium text-muted-foreground/80">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

const FEATURES = [
    {
        title: "Pipeline View",
        description: "Drag and drop deals like a pro. See exactly where your money is stuck and move it forward.",
        icon: TrendingUp,
    },
    {
        title: "Smart Contacts",
        description: "Not just a list. A living database of everyone you know, complete with history and notes.",
        icon: Users,
    },
    {
        title: "Lightning Fast",
        description: "Zero loading screens. Optimized for speed so you can get in, get out, and get paid.",
        icon: Zap,
    },
    {
        title: "Bank-Grade Security",
        description: "Your data is locked down tight with enterprise-grade encryption and access controls.",
        icon: Shield,
    },
    {
        title: "Automation Ready",
        description: "Connect to n8n, Zapier, or anything else. Let the robots do the boring work.",
        icon: Cpu,
    },
    {
        title: "Mobile First",
        description: "Looks perfect on your phone, tablet, or massive desktop monitor. Work from anywhere.",
        icon: Coffee,
    }
];
