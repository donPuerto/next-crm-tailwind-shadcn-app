"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeSwitcher } from "@/components/themes/theme-switcher";

/**
 * Primary site navigation with theme controls.
 * @returns Sticky navbar with actions
 */
export function Navbar() {
  return (
    // Sticky header container
    <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur-sm">
      {/* Layout wrapper */}
      <div className="navbar-container layout-container layout-padding mx-auto flex h-12 items-center justify-between">
        {/* Brand section */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
            <Logo size="sm" />
            <span>Don Puerto</span>
          </Link>
        </div>

        {/* Navigation actions */}
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/settings">Settings</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/sales">Sales</Link>
          </Button>

          <Separator orientation="vertical" className="mx-1 h-6" />

          {/* Theme control dropdown */}
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
}
