"use client";

import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
    {
        name: "Sarah Chen",
        role: "Sales Director",
        company: "TechFlow Inc",
        content: "This CRM transformed our sales process. We closed 40% more deals in the first quarter alone. The pipeline view is a game-changer.",
        rating: 5,
        initials: "SC"
    },
    {
        name: "Marcus Johnson",
        role: "Founder",
        company: "GrowthLabs",
        content: "Finally, a CRM that doesn't require a PhD to use. My team was up and running in less than an hour. The automation features save us 10+ hours weekly.",
        rating: 5,
        initials: "MJ"
    },
    {
        name: "Elena Rodriguez",
        role: "Operations Manager",
        company: "Velocity Solutions",
        content: "The best investment we've made this year. Customer support is incredible, and the mobile app means I can manage deals from anywhere.",
        rating: 5,
        initials: "ER"
    }
];

export function TestimonialsSection() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

    return (
        <section ref={ref} id="testimonials" className="py-16 md:py-24 bg-background relative group">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF3B6B]/0 via-[#FF3B6B]/5 to-[#FF3B6B]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Loved by teams everywhere
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what real users have to say.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <Card
                            key={index}
                            className={cn(
                                "border-[#FF3B6B]/20 hover:border-[#FF3B6B]/40 hover:shadow-xl hover:shadow-[#FF3B6B]/10 transition-all duration-500 hover:-translate-y-2 transform",
                                isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            )}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <CardContent className="p-6 space-y-4">
                                {/* Quote Icon */}
                                <div className="text-[#FF3B6B]/20">
                                    <Quote className="w-10 h-10" />
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-[#FF3B6B] text-[#FF3B6B]" />
                                    ))}
                                </div>

                                {/* Content */}
                                <p className="text-muted-foreground leading-relaxed font-medium">
                                    "{testimonial.content}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 pt-4 border-t">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF3B6B] to-[#E63560] flex items-center justify-center text-white font-bold text-sm">
                                        {testimonial.initials}
                                    </div>
                                    <div>
                                        <div className="font-bold text-foreground">{testimonial.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {testimonial.role} at {testimonial.company}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
