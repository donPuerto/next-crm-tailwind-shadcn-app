"use client"

import {
    BadgeCheck,
    HelpCircle,
    LayoutDashboard,
    Lock,
    LogOut,
    MessageSquare,
    Settings,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function UserNav() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt="@donpuerto" />
                        <AvatarFallback>DP</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Don Puerto</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            m@example.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <BadgeCheck className="mr-2 h-4 w-4" />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Messages
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Taskboard
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Help
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Lock className="mr-2 h-4 w-4" />
                        Lockscreen
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
