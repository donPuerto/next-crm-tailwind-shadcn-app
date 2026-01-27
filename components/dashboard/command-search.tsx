"use client"

import * as React from "react"
import {
    CreditCard,
    Mail,
    MessageSquare,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
    Search,
    Phone,
    Building2,
    Wrench,
} from "lucide-react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

export function CommandSearch() {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>
            <Button
                variant="outline"
                className="w-full justify-start text-sm text-muted-foreground sm:w-64 md:w-80 lg:w-96"
                onClick={() => setOpen(true)}
            >
                <Search className="mr-2 h-4 w-4" />
                Search contacts, users, companies...
                <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Contacts & Users">
                        <CommandItem>
                            <Users className="mr-2 h-4 w-4" />
                            <span>Search Contacts</span>
                        </CommandItem>
                        <CommandItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Search Users</span>
                        </CommandItem>
                        <CommandItem>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Search Emails</span>
                        </CommandItem>
                        <CommandItem>
                            <Phone className="mr-2 h-4 w-4" />
                            <span>Search Phone Numbers</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Organization">
                        <CommandItem>
                            <Building2 className="mr-2 h-4 w-4" />
                            <span>Search Companies</span>
                        </CommandItem>
                        <CommandItem>
                            <Wrench className="mr-2 h-4 w-4" />
                            <span>Search Technicians</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Actions">
                        <CommandItem>
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span>Add Contact</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            <span>New Deal</span>
                            <CommandShortcut>⌘N</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Billing Settings</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
