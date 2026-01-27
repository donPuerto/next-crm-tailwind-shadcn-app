"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Bell, MessageSquare } from "lucide-react"

import { CommandSearch } from "./command-search"
import { NavbarApps } from "./navbar-apps"
import { UserNav } from "./user-nav"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSwitcher } from "./language-switcher"
import { NotificationsSheet } from "./notifications-sheet"
import { ChatSheet } from "./chat-sheet"

export function DashboardNavbar() {
    return (
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 shadow-sm">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-6" />
                <CommandSearch />
            </div>

            <div className="flex flex-1 justify-end items-center gap-2">

                {/* Language */}
                <LanguageSwitcher />

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Notifications */}
                <NotificationsSheet />

                {/* Chat */}
                <ChatSheet />

                {/* Apps Menu */}
                <NavbarApps />

                <Separator orientation="vertical" className="h-6 bg-border mx-2" />

                {/* User Profile */}
                <UserNav />
            </div>
        </header>
    )
}
