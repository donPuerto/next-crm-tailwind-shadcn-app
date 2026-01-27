"use client"

import { useTheme } from "@/app/hooks/useTheme"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Bell, MessageSquare, PanelRightOpen } from "lucide-react"

import { CommandSearch } from "./command-search"
import { NavbarApps } from "./navbar-apps"
import { UserNav } from "./user-nav"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSwitcher } from "./language-switcher"

export function DashboardNavbar() {
    const { layoutMode, setLayoutMode } = useTheme()

    const toggleLayout = () => {
        setLayoutMode(layoutMode === 'layout-full' ? 'layout-fixed' : 'layout-full')
    }

    return (
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 shadow-sm">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-6" />
                <CommandSearch />
            </div>

            <div className="flex flex-1 justify-end items-center gap-2">
                {/* Layout Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleLayout}
                    title={layoutMode === 'layout-full' ? 'Switch to Fixed Layout' : 'Switch to Full Width'}
                >
                    <PanelRightOpen className={`h-5 w-5 transition-transform ${layoutMode === 'layout-fixed' ? 'rotate-180' : ''}`} />
                    <span className="sr-only">Toggle Layout</span>
                </Button>

                {/* Language */}
                <LanguageSwitcher />

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Notifications */}
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>

                {/* Chat */}
                <Button variant="ghost" size="icon">
                    <MessageSquare className="h-5 w-5" />
                    <span className="sr-only">Chat</span>
                </Button>

                {/* Apps Menu */}
                <NavbarApps />

                <Separator orientation="vertical" className="h-6 bg-border mx-2" />

                {/* User Profile */}
                <UserNav />
            </div>
        </header>
    )
}
