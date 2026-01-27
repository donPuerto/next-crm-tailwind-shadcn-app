"use client"

import * as React from "react"
import { LayoutGrid, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NavbarApps() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <LayoutGrid className="h-5 w-5" />
                    <span className="sr-only">Apps</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Apps</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        <div className="flex flex-col gap-1">
                            <span className="font-medium">Project Board</span>
                            <span className="text-xs text-muted-foreground">Manage tasks and projects</span>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Plus className="mr-2 h-4 w-4" />
                        <div className="flex flex-col gap-1">
                            <span className="font-medium">New Quote</span>
                            <span className="text-xs text-muted-foreground">Create a new sales quote</span>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
