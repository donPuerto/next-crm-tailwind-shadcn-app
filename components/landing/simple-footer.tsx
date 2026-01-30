"use client";

import Link from "next/link";
import { Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useThemeColor } from "@/app/hooks/use-theme-color";
import { cn } from "@/lib/utils";

interface SimpleFooterProps {
    forceMobile?: boolean;
}

export function SimpleFooter({ forceMobile = false }: SimpleFooterProps) {
    const { color: themeColor } = useThemeColor();
    return (
        <footer className="bg-background pt-16 pb-8 border-t">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Connect Section */}
                <div className="flex flex-col items-center justify-center text-center mb-16 space-y-6">
                    <h2 className={cn("font-bold tracking-tight", forceMobile ? "text-3xl" : "text-3xl md:text-4xl")}>
                        Connect with me
                    </h2>
                    <p className="text-muted-foreground font-medium" style={{ color: themeColor }}>
                        Get in touch with me for any inquiries
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-12 w-12 rounded-lg border-2 transition-colors"
                            style={{ borderColor: `${themeColor}66` }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = themeColor;
                                e.currentTarget.style.color = themeColor;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = `${themeColor}66`;
                                e.currentTarget.style.color = 'currentColor';
                            }}
                            asChild
                        >
                            <Link href="https://linkedin.com" target="_blank">
                                <Linkedin className="h-6 w-6" />
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-12 w-12 rounded-lg border-2 transition-colors"
                            style={{ borderColor: `${themeColor}66` }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = themeColor;
                                e.currentTarget.style.color = themeColor;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = `${themeColor}66`;
                                e.currentTarget.style.color = 'currentColor';
                            }}
                            asChild
                        >
                            <Link href="mailto:don.puerto.1003@gmail.com">
                                <Mail className="h-6 w-6" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="h-px bg-border w-full mb-8" />

                {/* Bottom Bar */}
                <div className={cn("flex flex-col items-center justify-between gap-6 text-sm", !forceMobile && "md:flex-row")}>
                    <div className="flex items-center gap-3">
                        <Logo size="sm" style={{ color: themeColor, borderColor: `${themeColor}33` }} />
                        <p className="font-semibold text-muted-foreground">
                            © 2026 Don Puerto. All rights reserved.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-muted-foreground font-medium">
                        <a
                            href="mailto:don.puerto.1003@gmail.com"
                            className="flex items-center gap-2 transition-colors"
                            style={{ color: 'inherit' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = themeColor;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'inherit';
                            }}
                        >
                            <Mail className="h-4 w-4" style={{ color: themeColor }} />
                            <span className="hidden sm:inline">don.puerto.1003@gmail.com</span>
                        </a>
                        <div className="h-4 w-px bg-border hidden sm:block" />
                        <a
                            href="tel:09760938376"
                            className="flex items-center gap-2 transition-colors"
                            style={{ color: 'inherit' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = themeColor;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'inherit';
                            }}
                        >
                            <Phone className="h-4 w-4" style={{ color: themeColor }} />
                            <span className="hidden sm:inline">0976 093 8376</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
