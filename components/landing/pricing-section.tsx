"use client";

import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";
import { useThemeColor } from "@/app/hooks/use-theme-color";
import { cn } from "@/lib/utils";
import Link from "next/link";

const PRICING_TIERS = [
    {
        name: "Starter",
        price: "$29",
        period: "/month",
        description: "Perfect for small teams getting started",
        features: [
            "Up to 1,000 contacts",
            "Basic pipeline management",
            "Email integration",
            "Mobile app access",
            "5 GB storage",
            "Community support"
        ],
        cta: "Start Free Trial",
        popular: false
    },
    {
        name: "Pro",
        price: "$79",
        period: "/month",
        description: "For growing teams that need more power",
        features: [
            "Unlimited contacts",
            "Advanced pipeline & automation",
            "Email + Calendar sync",
            "Priority support",
            "50 GB storage",
            "Custom fields & reports",
            "API access",
            "Team collaboration tools"
        ],
        cta: "Start Free Trial",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "Tailored solutions for large organizations",
        features: [
            "Everything in Pro",
            "Unlimited storage",
            "Dedicated account manager",
            "Custom integrations",
            "Advanced security & compliance",
            "SLA guarantee",
            "White-label options",
            "On-premise deployment"
        ],
        cta: "Contact Sales",
        popular: false
    }
];

export function PricingSection() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const { color: themeColor } = useThemeColor();

    return (
        <section ref={ref} id="pricing" className="py-16 md:py-24 bg-muted/70 relative group">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
                background: `linear-gradient(to right, ${themeColor}00, ${themeColor}26, ${themeColor}00)`
            }} />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
                        Choose the plan that fits your needs. All plans include a 14-day free trial.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {PRICING_TIERS.map((tier, index) => (
                        <Card
                            key={index}
                            className={cn(
                                "relative border-2 transition-all duration-500 hover:-translate-y-2 transform",
                                tier.popular ? "scale-105" : "border-border",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                            style={{
                                transitionDelay: `${index * 150}ms`,
                                borderColor: tier.popular ? themeColor : undefined,
                                boxShadow: tier.popular ? `0 25px 50px -12px ${themeColor}33` : undefined,
                            }}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <Badge className="text-white px-4 py-1 text-sm font-bold shadow-lg" style={{ backgroundColor: themeColor }}>
                                        <Zap className="w-3 h-3 mr-1" /> Most Popular
                                    </Badge>
                                </div>
                            )}

                            <CardHeader className="text-center pb-8 pt-8">
                                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-5xl font-extrabold bg-clip-text text-transparent" style={{
                                        backgroundImage: `linear-gradient(to right, ${themeColor}, ${themeColor}cc)`
                                    }}>
                                        {tier.price}
                                    </span>
                                    <span className="text-muted-foreground font-medium">{tier.period}</span>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <ul className="space-y-3">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="rounded-full p-1 mt-0.5" style={{ backgroundColor: `${themeColor}1a` }}>
                                                <Check className="w-3 h-3" style={{ color: themeColor }} />
                                            </div>
                                            <span className="text-sm font-medium text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    className={cn(
                                        "w-full h-12 text-base font-bold rounded-full transition-all hover:scale-105",
                                        tier.popular ? "shadow-lg text-white" : "bg-background hover:bg-muted border-2 text-foreground"
                                    )}
                                    style={{
                                        backgroundColor: tier.popular ? themeColor : undefined,
                                        boxShadow: tier.popular ? `0 10px 20px ${themeColor}33` : undefined,
                                        borderColor: !tier.popular ? `${themeColor}33` : undefined,
                                    }}
                                    asChild
                                >
                                    <Link href="/dashboard">{tier.cta}</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
