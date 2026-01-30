"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useThemeColor } from "@/app/hooks/use-theme-color";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";

interface ContactFormProps {
    forceMobile?: boolean;
}

export function ContactForm({ forceMobile = false }: ContactFormProps) {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.1 });
    const { color: themeColor } = useThemeColor();

    return (
        <section className="py-16 md:py-24 relative group" id="contact">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
                background: `linear-gradient(to right, ${themeColor}00, ${themeColor}26, ${themeColor}00)`
            }} />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div
                    ref={headerRef}
                    className={cn(
                        "text-center mb-16 transition-all duration-700",
                        headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    <h2 className={cn("font-bold tracking-tight mb-4", forceMobile ? "text-3xl" : "text-4xl md:text-5xl")}>Let&apos;s Work Together</h2>
                    <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
                        Ready to transform your business? Get in touch with us today.
                    </p>
                </div>

                <div
                    ref={cardsRef}
                    className={cn("grid gap-8 items-stretch", forceMobile ? "grid-cols-1" : "lg:grid-cols-2")}
                >
                    {/* Left Column: Contact Info */}
                    <Card className={cn(
                        "bg-white dark:bg-card transition-all duration-700",
                        cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                    style={{
                        borderColor: `${themeColor}33`,
                        boxShadow: `0 20px 25px ${themeColor}1a`
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 25px 50px ${themeColor}26`;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = `0 20px 25px ${themeColor}1a`;
                    }}
                    >
                        <CardContent className="p-8 space-y-8 h-full flex flex-col">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Let&apos;s Connect</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    I&apos;m here to help you automate and scale. Share your goals and I&apos;ll get back within one business day.
                                </p>
                            </div>

                            <div className="space-y-6 flex-1">
                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 rounded-lg" style={{ color: themeColor }}>
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-muted-foreground mb-1">Email</p>
                                        <p className="text-foreground font-medium break-all">don.puerto.1003@gmail.com</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 rounded-lg" style={{ color: themeColor }}>
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-muted-foreground mb-1">Phone</p>
                                        <p className="text-foreground font-medium">0976 093 8376</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 rounded-lg" style={{ color: themeColor }}>
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-muted-foreground mb-1">Location</p>
                                        <p className="text-foreground font-medium">Davao City, Philippines</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Column: Form */}
                    <Card className={cn(
                        "bg-white dark:bg-card transition-all duration-700 delay-150",
                        cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                    style={{
                        borderColor: `${themeColor}33`,
                        boxShadow: `0 20px 25px ${themeColor}1a`
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 25px 50px ${themeColor}26`;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = `0 20px 25px ${themeColor}1a`;
                    }}
                    >
                        <CardContent className="p-8 space-y-6 h-full flex flex-col">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-base font-bold">Name <span className="text-red-500">*</span></Label>
                                <Input
                                    id="name"
                                    placeholder="Your full name"
                                    className="h-12 focus-visible:ring-offset-0"
                                    style={{
                                        backgroundColor: `${themeColor}08`,
                                        borderColor: `${themeColor}33`,
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.outlineColor = themeColor;
                                    }}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-base font-bold">Email <span className="text-red-500">*</span></Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your.email@example.com"
                                    className="h-12 focus-visible:ring-offset-0"
                                    style={{
                                        backgroundColor: `${themeColor}08`,
                                        borderColor: `${themeColor}33`,
                                    }}
                                />
                            </div>

                            <div className="space-y-2 flex-1 flex flex-col">
                                <Label htmlFor="message" className="text-base font-bold">Message <span className="text-red-500">*</span></Label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell us about your project or inquiry..."
                                    className="flex-1 resize-none focus-visible:ring-offset-0"
                                    style={{
                                        backgroundColor: `${themeColor}08`,
                                        borderColor: `${themeColor}33`,
                                    }}
                                />
                            </div>

                            <Button
                                className="w-full h-12 text-lg font-bold text-white transition-all hover:scale-[1.02]"
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
                            >
                                <Send className="mr-2 h-5 w-5" /> Send Message
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
