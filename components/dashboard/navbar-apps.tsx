"use client"

import * as React from "react"
import { LayoutGrid, Plus, Shield, Zap, Globe, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

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
import { Switch } from "@/components/ui/switch"

const APPS = [
    { id: "crm", name: "Sales CRM", description: "Manage leads and deals", icon: Shield, defaultEnabled: true },
    { id: "marketing", name: "Marketing Ops", description: "Campaign automation", icon: Zap, defaultEnabled: true },
    { id: "contact", name: "Contact Center", description: "Omnichannel support", icon: MessageCircle, defaultEnabled: false },
    { id: "global", name: "Global Reach", description: "International expansion", icon: Globe, defaultEnabled: false },
]

export function NavbarApps() {
    const [enabledApps, setEnabledApps] = React.useState<Record<string, boolean>>(
        Object.fromEntries(APPS.map(app => [app.id, app.defaultEnabled]))
    )

    const toggleApp = (id: string, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setEnabledApps(prev => ({ ...prev, [id]: !prev[id] }))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                    <LayoutGrid className="h-5 w-5" />
                    <span className="sr-only">Apps</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72" align="end">
                <DropdownMenuLabel className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground py-2">
                    App Switcher
                    <span className="text-[10px] font-normal lowercase bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">simulation</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="p-1">
                    {APPS.map((app) => (
                        <DropdownMenuItem
                            key={app.id}
                            className="flex items-center justify-between py-3 px-3 cursor-default focus:bg-accent/50"
                            onSelect={(e) => e.preventDefault()}
                        >
                            <div className="flex items-start gap-3">
                                <div className={cn(
                                    "p-2 rounded-md transition-colors",
                                    enabledApps[app.id] ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                                )}>
                                    <app.icon className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 pointer-events-none">
                                    <span className={cn("text-sm font-medium", !enabledApps[app.id] && "text-muted-foreground")}>
                                        {app.name}
                                    </span>
                                    <span className="text-[11px] text-muted-foreground leading-tight">
                                        {app.description}
                                    </span>
                                </div>
                            </div>
                            <Switch
                                checked={enabledApps[app.id]}
                                onCheckedChange={() => setEnabledApps(prev => ({ ...prev, [app.id]: !prev[app.id] }))}
                                onClick={(e) => e.stopPropagation()}
                                className="scale-75 origin-right ml-2"
                            />
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="py-2 justify-center text-xs text-primary font-medium cursor-pointer">
                    <Plus className="mr-2 h-3.5 w-3.5" />
                    Connect more apps
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
