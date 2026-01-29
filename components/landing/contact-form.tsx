"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";

interface ContactFormProps {
    forceMobile?: boolean;
}

export function ContactForm({ forceMobile = false }: ContactFormProps) {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.1 });

    return (
        <section className="py-16 md:py-24 relative group" id="contact">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF3B6B]/0 via-[#FF3B6B]/5 to-[#FF3B6B]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

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
                        "border-[#FF3B6B]/20 shadow-xl shadow-[#FF3B6B]/10 bg-white dark:bg-card hover:shadow-2xl transition-all duration-700",
                        cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}>
                        <CardContent className="p-8 space-y-8 h-full flex flex-col">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Let&apos;s Connect</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    I&apos;m here to help you automate and scale. Share your goals and I&apos;ll get back within one business day.
                                </p>
                            </div>

                            <div className="space-y-4 flex-1">
                                {/* Email Card */}
                                <div className="flex items-start gap-4 p-4 rounded-xl border border-[#FF3B6B]/20 bg-[#FF3B6B]/5 hover:bg-[#FF3B6B]/10 transition-colors">
                                    <div className="bg-[#FF3B6B]/10 p-2.5 rounded-lg text-[#FF3B6B]">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Email</p>
                                        <p className="text-[#FF3B6B] font-medium break-all">don.puerto.1003@gmail.com</p>
                                    </div>
                                </div>

                                {/* Phone Card */}
                                <div className="flex items-start gap-4 p-4 rounded-xl border border-[#FF3B6B]/20 bg-[#FF3B6B]/5 hover:bg-[#FF3B6B]/10 transition-colors">
                                    <div className="bg-[#FF3B6B]/10 p-2.5 rounded-lg text-[#FF3B6B]">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Phone</p>
                                        <p className="text-[#FF3B6B] font-medium">0976 093 8376</p>
                                    </div>
                                </div>

                                {/* Location Card */}
                                <div className="flex items-start gap-4 p-4 rounded-xl border border-[#FF3B6B]/20 bg-[#FF3B6B]/5 hover:bg-[#FF3B6B]/10 transition-colors">
                                    <div className="bg-[#FF3B6B]/10 p-2.5 rounded-lg text-[#FF3B6B]">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Location</p>
                                        <p className="text-[#FF3B6B] font-medium">Davao City, Philippines</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Column: Form */}
                    <Card className={cn(
                        "border-[#FF3B6B]/20 shadow-xl shadow-[#FF3B6B]/10 bg-white dark:bg-card hover:shadow-2xl transition-all duration-700 delay-150",
                        cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}>
                        <CardContent className="p-8 space-y-6 h-full flex flex-col">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-base font-bold">Name <span className="text-red-500">*</span></Label>
                                <Input id="name" placeholder="Your full name" className="bg-[#FF3B6B]/5 border-[#FF3B6B]/20 focus-visible:ring-[#FF3B6B] h-12" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-base font-bold">Email <span className="text-red-500">*</span></Label>
                                <Input id="email" type="email" placeholder="your.email@example.com" className="bg-[#FF3B6B]/5 border-[#FF3B6B]/20 focus-visible:ring-[#FF3B6B] h-12" />
                            </div>

                            <div className="space-y-2 flex-1 flex flex-col">
                                <Label htmlFor="message" className="text-base font-bold">Message <span className="text-red-500">*</span></Label>
                                <Textarea id="message" placeholder="Tell us about your project or inquiry..." className="bg-[#FF3B6B]/5 border-[#FF3B6B]/20 focus-visible:ring-[#FF3B6B] flex-1 resize-none" />
                            </div>

                            <Button className="w-full h-12 text-lg font-bold bg-[#FF3B6B] hover:bg-[#E63560] shadow-lg shadow-[#FF3B6B]/20 transition-all hover:scale-[1.02]">
                                <Send className="mr-2 h-5 w-5" /> Send Message
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
