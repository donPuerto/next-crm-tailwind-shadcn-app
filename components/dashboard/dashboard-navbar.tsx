"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"



import { CommandSearch } from "./command-search"
import { NavbarApps } from "./navbar-apps"
import { UserNav } from "./user-nav"
import { LanguageSwitcher } from "./language-switcher"
import { NotificationsSheet } from "./notifications-sheet"
import { ChatSheet } from "./chat-sheet"
import { ThemeSwitcher } from "@/components/themes/theme-switcher"

export function DashboardNavbar() {
    return (
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 md:px-8 shadow-sm">
            <div className="flex items-center h-full">
                <SidebarTrigger className="-ml-1" />
                <div className="w-px h-6 bg-border ml-3 mr-5 shrink-0" aria-hidden="true" />
                <CommandSearch />
            </div>

            <div className="flex flex-1 justify-end items-center gap-2">

                {/* Language */}
                <LanguageSwitcher />

                {/* Theme Switcher (includes colors, radius, and dark/light mode) */}
                <ThemeSwitcher />

                {/* Notifications */}
                <NotificationsSheet />

                {/* Chat */}
                <ChatSheet />

                {/* Apps Menu */}
                <NavbarApps />

                <Separator orientation="vertical" className="h-6 bg-border mx-1" />

                {/* User Profile */}
                <UserNav />
            </div>
        </header>
    )
}
