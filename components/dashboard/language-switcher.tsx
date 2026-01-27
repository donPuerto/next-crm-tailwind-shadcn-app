"use client"

import * as React from "react"
import { Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">Switch language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <span className="mr-2">🇺🇸</span> English
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <span className="mr-2">🇪🇸</span> Spanish
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <span className="mr-2">🇫🇷</span> French
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <span className="mr-2">🇩🇪</span> German
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
