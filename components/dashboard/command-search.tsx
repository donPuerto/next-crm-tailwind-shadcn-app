"use client"

import * as React from "react"
import {
    CreditCard,
    Mail,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
    Search,
    Phone,
    Building2,
    Wrench,
    Smartphone,
    Building,
    MapPin,
    Target,
    Activity,
    Compass,
    CheckCircle2,
    DollarSign,
    XCircle,
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
import { DUMMY_CONTACTS, DUMMY_USERS, DUMMY_COMPANIES, DUMMY_OPPORTUNITIES, type Contact, type Opportunity } from "@/lib/constants/dummy-data"
import { cn } from "@/lib/utils"

export function CommandSearch() {
    const [open, setOpen] = React.useState(false)
    const [recentIds, setRecentIds] = React.useState<string[]>([])
    const [category, setCategory] = React.useState<"all" | "contacts" | "companies" | "users" | "opportunities">("all")

    // Load recent contacts and category from localStorage on mount
    React.useEffect(() => {
        const savedRecent = localStorage.getItem("recent-contacts")
        if (savedRecent) {
            try {
                setRecentIds(JSON.parse(savedRecent))
            } catch (e) {
                console.error("Failed to parse recent contacts", e)
            }
        }

        const savedCategory = localStorage.getItem("search-category")
        if (savedCategory && ["all", "contacts", "companies", "users", "opportunities"].includes(savedCategory)) {
            setCategory(savedCategory as any)
        }
    }, [])

    // Update localStorage when category changes
    const handleCategoryChange = (newCategory: "all" | "contacts" | "companies" | "users" | "opportunities") => {
        setCategory(newCategory)
        localStorage.setItem("search-category", newCategory)
    }

    const recentContacts = recentIds
        .map(id => DUMMY_CONTACTS.find(c => c.id === id))
        .filter((c): c is Contact => !!c)

    const displayedContacts = DUMMY_CONTACTS.slice(0, 5)
    const displayedCompanies = DUMMY_COMPANIES.slice(0, 5)
    const displayedUsers = DUMMY_USERS.slice(0, 5)
    const displayedOpportunities = DUMMY_OPPORTUNITIES

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

    const handleSelectContact = (contact: Contact) => {
        const newIds = [contact.id, ...recentIds.filter(id => id !== contact.id)].slice(0, 5)
        setRecentIds(newIds)
        localStorage.setItem("recent-contacts", JSON.stringify(newIds))
        setOpen(false)
    }

    const clearRecent = () => {
        setRecentIds([])
        localStorage.removeItem("recent-contacts")
    }

    return (
        <>
            <Button
                variant="outline"
                className="w-full justify-start text-sm text-muted-foreground sm:w-64 md:w-80 lg:w-96 transition-all hover:bg-muted/50 border-input shadow-none h-9"
                onClick={() => setOpen(true)}
            >
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <span className="truncate">Search contacts, users, opportunities...</span>
                <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen} className="sm:max-w-lg lg:max-w-xl overflow-hidden p-0 gap-0 border-none shadow-2xl">
                <div className="flex flex-col h-full max-h-[85vh]">
                    <CommandInput
                        placeholder="Type name, email, phone, company or job title..."
                        className="h-14 text-base px-5"
                    />

                    {/* Sticky Filter Bar */}
                    <div className="flex items-center gap-1.5 p-3 border-b bg-muted/30 sticky top-0 z-10 backdrop-blur-md">
                        <Button
                            variant={category === "all" ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => handleCategoryChange("all")}
                            className={cn(
                                "h-8 px-3 text-[12px] font-semibold rounded-lg transition-all",
                                category === "all" ? "shadow-md bg-background text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )}
                        >
                            All
                        </Button>
                        <Button
                            variant={category === "contacts" ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => handleCategoryChange("contacts")}
                            className={cn(
                                "h-8 px-3 text-[12px] font-semibold rounded-lg transition-all",
                                category === "contacts" ? "shadow-md bg-background text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )}
                        >
                            <Users className="mr-2 h-3.5 w-3.5" />
                            Contacts
                        </Button>
                        <Button
                            variant={category === "companies" ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => handleCategoryChange("companies")}
                            className={cn(
                                "h-8 px-3 text-[12px] font-semibold rounded-lg transition-all",
                                category === "companies" ? "shadow-md bg-background text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )}
                        >
                            <Building2 className="mr-2 h-3.5 w-3.5" />
                            Companies
                        </Button>
                        <Button
                            variant={category === "users" ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => handleCategoryChange("users")}
                            className={cn(
                                "h-8 px-3 text-[12px] font-semibold rounded-lg transition-all",
                                category === "users" ? "shadow-md bg-background text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )}
                        >
                            <User className="mr-2 h-3.5 w-3.5" />
                            Users
                        </Button>
                        <Button
                            variant={category === "opportunities" ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => handleCategoryChange("opportunities")}
                            className={cn(
                                "h-8 px-3 text-[12px] font-semibold rounded-lg transition-all",
                                category === "opportunities" ? "shadow-md bg-background text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )}
                        >
                            <Target className="mr-2 h-3.5 w-3.5" />
                            Opportunities
                        </Button>
                    </div>

                    <CommandList className="flex-1 overflow-y-auto min-h-[300px]">
                        <CommandEmpty className="py-12 text-sm text-center text-muted-foreground">
                            No results found.
                        </CommandEmpty>

                        {(category === "all" || category === "contacts") && recentContacts.length > 0 && (
                            <>
                                <CommandGroup
                                    heading={
                                        <div className="flex items-center justify-between w-full pr-1">
                                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">Recent Contacts</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    clearRecent()
                                                }}
                                                className="h-6 py-0 px-2 text-[10px] font-bold text-primary/70 hover:text-primary hover:bg-primary/5 rounded-md"
                                            >
                                                Clear All
                                            </Button>
                                        </div>
                                    }
                                >
                                    {recentContacts.map((contact) => (
                                        <ContactItem key={`recent-${contact.id}`} contact={contact} onSelect={handleSelectContact} />
                                    ))}
                                </CommandGroup>
                                <CommandSeparator />
                            </>
                        )}

                        {(category === "all" || category === "contacts") && (
                            <CommandGroup heading={category === "contacts" ? undefined : <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">Contacts</span>}>
                                {displayedContacts.map((contact) => (
                                    <ContactItem key={contact.id} contact={contact} onSelect={handleSelectContact} />
                                ))}
                            </CommandGroup>
                        )}

                        {(category === "all" || category === "companies") && (
                            <>
                                {category === "all" && <CommandSeparator />}
                                <CommandGroup heading={<span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">Companies</span>}>
                                    {displayedCompanies.map((company) => (
                                        <CommandItem
                                            key={company.id}
                                            value={`${company.name} ${company.email} ${company.phone} ${company.mobile} ${company.address}`}
                                            onSelect={() => setOpen(false)}
                                            className="px-4 py-4 cursor-pointer group data-[selected=true]:bg-primary/[0.12]"
                                        >
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex items-center gap-4 text-foreground transition-colors group-data-[selected=true]:text-primary">
                                                    <div className="h-11 w-11 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 group-data-[selected=true]:bg-orange-600 group-data-[selected=true]:text-white transition-all shadow-sm">
                                                        <Building2 className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="font-bold text-[15px] group-data-[selected=true]:text-slate-900 dark:group-data-[selected=true]:text-white">{company.name}</span>
                                                        <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                                                            <div className="flex items-center gap-1.5 group-data-[selected=true]:text-primary-900/60 dark:group-data-[selected=true]:text-primary-100/60 transition-colors">
                                                                <Mail className="h-3.5 w-3.5 opacity-50" />
                                                                <span>{company.email}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5 border-l pl-3 group-data-[selected=true]:text-primary-900/60 dark:group-data-[selected=true]:text-primary-100/60 group-data-[selected=true]:border-primary/20 transition-all">
                                                                <Phone className="h-3.5 w-3.5 opacity-50" />
                                                                <span>{company.phone}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1.5 text-[11px] text-muted-foreground/70 font-bold shrink-0">
                                                    <div className="flex items-center gap-2 group-data-[selected=true]:text-primary-800 dark:group-data-[selected=true]:text-primary-200 transition-all">
                                                        <Smartphone className="h-3 w-3 text-primary/60" />
                                                        <span>{company.mobile}</span>
                                                    </div>
                                                    <span className="max-w-[150px] truncate opacity-60 group-data-[selected=true]:text-primary-900/50 dark:group-data-[selected=true]:text-primary-100/50">{company.address}</span>
                                                </div>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </>
                        )}

                        {(category === "all" || category === "users") && (
                            <>
                                {category === "all" && <CommandSeparator />}
                                <CommandGroup heading={<span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">System Users</span>}>
                                    {displayedUsers.map((user) => (
                                        <CommandItem
                                            key={user.id}
                                            value={`${user.firstName} ${user.lastName} ${user.email} ${user.role} ${user.department} ${user.phone} ${user.mobile || ''} ${user.address || ''}`}
                                            onSelect={() => setOpen(false)}
                                            className="flex items-center gap-4 px-4 py-4 cursor-pointer group data-[selected=true]:bg-primary/[0.12]"
                                        >
                                            <div className={cn(
                                                "h-11 w-11 rounded-xl flex items-center justify-center shrink-0 border-2 border-transparent transition-all shadow-sm",
                                                user.role === "technician" ? "bg-amber-500/10 text-amber-600 group-data-[selected=true]:bg-amber-600 group-data-[selected=true]:text-white" : "bg-blue-500/10 text-blue-600 group-data-[selected=true]:bg-blue-600 group-data-[selected=true]:text-white"
                                            )}>
                                                <span className="text-xs font-black">
                                                    {user.firstName[0]}{user.lastName[0]}
                                                </span>
                                            </div>
                                            <div className="flex flex-col flex-1 gap-0.5">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-[15px] text-foreground group-data-[selected=true]:text-slate-900 dark:group-data-[selected=true]:text-white transition-colors uppercase tracking-tight">{user.firstName} {user.lastName}</span>
                                                    <span className={cn(
                                                        "text-[10px] px-2 py-0.5 font-bold rounded-full capitalize transition-all",
                                                        user.role === "technician" ? "bg-amber-500/10 text-amber-600 group-data-[selected=true]:bg-amber-600 group-data-[selected=true]:text-white" : "bg-blue-500/10 text-blue-600 group-data-[selected=true]:bg-blue-600 group-data-[selected=true]:text-white"
                                                    )}>
                                                        {user.role}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                                                    <div className="flex items-center gap-1.5 group-data-[selected=true]:text-primary-900/60 dark:group-data-[selected=true]:text-primary-100/60 transition-colors">
                                                        <Mail className="h-3.5 w-3.5 opacity-50" />
                                                        <span>{user.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 border-l pl-3 group-data-[selected=true]:text-primary-900/60 dark:group-data-[selected=true]:text-primary-100/60 group-data-[selected=true]:border-primary/20 transition-all">
                                                        <Phone className="h-3.5 w-3.5 opacity-50" />
                                                        <span>{user.phone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1 shrink-0">
                                                <div className="flex items-center gap-1.5">
                                                    <div className={cn(
                                                        "h-1.5 w-1.5 rounded-full",
                                                        user.status === "active" ? "bg-green-500" :
                                                            user.status === "on_field" ? "bg-blue-500" : "bg-muted-foreground/30"
                                                    )} />
                                                    <span className="text-[10px] font-bold text-muted-foreground/70 capitalize group-data-[selected=true]:text-primary-800/70 dark:group-data-[selected=true]:text-primary-100/70">{user.status.replace('_', ' ')}</span>
                                                </div>
                                                <span className="text-[10px] font-bold text-muted-foreground/40 group-data-[selected=true]:text-primary-900/40 dark:group-data-[selected=true]:text-primary-100/40 uppercase tracking-tighter">{user.department}</span>
                                                {(user.tasks_completed !== undefined || user.tasks_in_progress !== undefined) && (
                                                    <div className="flex gap-2 text-[9px] font-black opacity-60">
                                                        <span className="text-green-600">✓{user.tasks_completed || 0}</span>
                                                        <span className="text-amber-600">!{user.tasks_in_progress || 0}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </>
                        )}
                        {(category === "all" || category === "opportunities") && (
                            <>
                                {category === "all" && <CommandSeparator />}
                                <CommandGroup heading={<span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">Opportunities</span>}>
                                    {displayedOpportunities.map((opportunity) => (
                                        <OpportunityItem key={opportunity.id} opportunity={opportunity} onSelect={() => setOpen(false)} />
                                    ))}
                                </CommandGroup>
                            </>
                        )}

                    </CommandList>
                </div>
            </CommandDialog>
        </>
    )
}

function ContactItem({ contact, onSelect }: { contact: Contact, onSelect: (c: Contact) => void }) {
    return (
        <CommandItem
            value={`${contact.firstName} ${contact.lastName} ${contact.email} ${contact.phone} ${contact.mobile} ${contact.company || ''} ${contact.jobTitle || ''} ${contact.streetAddress || ''} ${contact.suburb || ''} ${contact.postalCode || ''} ${contact.city || ''} ${contact.state || ''}`}
            onSelect={() => onSelect(contact)}
            className="py-4 px-4 cursor-pointer data-[selected=true]:bg-primary/[0.12] group"
        >
            <div className="flex w-full items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary font-black text-sm group-data-[selected=true]:bg-primary group-data-[selected=true]:text-white transition-all shadow-sm group-data-[selected=true]:shadow-md mt-1">
                    {contact.firstName[0]}{contact.lastName[0]}
                </div>

                <div className="flex flex-col flex-1 min-w-0 gap-1.5">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-[16px] text-foreground group-data-[selected=true]:text-slate-900 dark:group-data-[selected=true]:text-white transition-colors capitalize truncate">
                            {contact.firstName} {contact.lastName}
                        </span>
                        {contact.jobTitle && (
                            <span className="text-[10px] font-extrabold text-muted-foreground bg-muted group-data-[selected=true]:bg-primary/20 group-data-[selected=true]:text-primary-700 dark:group-data-[selected=true]:text-primary-300 px-2 py-0.5 rounded-full uppercase tracking-tighter transition-all shrink-0">
                                {contact.jobTitle}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted-foreground font-semibold">
                        <div className="flex items-center gap-1.5 group-data-[selected=true]:text-primary-900/80 dark:group-data-[selected=true]:text-primary-100/80 transition-colors">
                            <Smartphone className="h-4 w-4 text-primary/70 group-data-[selected=true]:text-primary/90" />
                            <span>{contact.mobile}</span>
                        </div>
                        <div className="flex items-center gap-1.5 border-l pl-4 group-data-[selected=true]:text-primary-900/80 dark:group-data-[selected=true]:text-primary-100/80 group-data-[selected=true]:border-primary/20 transition-all">
                            <Phone className="h-4 w-4 opacity-70" />
                            <span>{contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5 border-l pl-4 group-data-[selected=true]:text-primary-900/80 dark:group-data-[selected=true]:text-primary-100/80 group-data-[selected=true]:border-primary/20 transition-all">
                            <Mail className="h-4 w-4 opacity-70" />
                            <span className="truncate max-w-[200px]">{contact.email}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-0.5 mt-0.5">
                        {contact.streetAddress && (
                            <div className="flex items-center gap-1.5 text-[12px] group-data-[selected=true]:text-primary-800 dark:group-data-[selected=true]:text-primary-100 transition-colors">
                                <MapPin className="h-3.5 w-3.5 text-primary" />
                                <span className="font-bold truncate">{contact.streetAddress}, {contact.suburb} {contact.postalCode}</span>
                            </div>
                        )}
                        {contact.company && (
                            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/70 group-data-[selected=true]:text-primary-900/50 dark:group-data-[selected=true]:text-primary-100/50 transition-colors">
                                <Building className="h-3 w-3 opacity-50" />
                                <span className="uppercase tracking-tight font-medium">{contact.company}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </CommandItem>
    )
}

function OpportunityItem({ opportunity, onSelect }: { opportunity: Opportunity, onSelect: () => void }) {
    const contact = DUMMY_CONTACTS.find(c => c.id === opportunity.contactId)
    const company = DUMMY_COMPANIES.find(c => c.id === opportunity.companyId)

    const getStageColor = (stage: string) => {
        switch (stage) {
            case "leads": return "bg-gray-500/10 text-gray-600 group-data-[selected=true]:bg-gray-600 group-data-[selected=true]:text-white"
            case "contacted": return "bg-blue-500/10 text-blue-600 group-data-[selected=true]:bg-blue-600 group-data-[selected=true]:text-white"
            case "quoting": return "bg-purple-500/10 text-purple-600 group-data-[selected=true]:bg-purple-600 group-data-[selected=true]:text-white"
            case "booked": return "bg-orange-500/10 text-orange-600 group-data-[selected=true]:bg-orange-600 group-data-[selected=true]:text-white"
            case "completed": return "bg-green-500/10 text-green-600 group-data-[selected=true]:bg-green-600 group-data-[selected=true]:text-white"
            case "lost": return "bg-red-500/10 text-red-600 group-data-[selected=true]:bg-red-600 group-data-[selected=true]:text-white"
            default: return "bg-muted text-muted-foreground"
        }
    }

    const getStageIcon = (stage: string) => {
        switch (stage) {
            case "leads": return <Compass className="h-4 w-4" />
            case "contacted": return <Activity className="h-4 w-4" />
            case "quoting": return <PlusCircle className="h-4 w-4" />
            case "booked": return <Wrench className="h-4 w-4" />
            case "completed": return <CheckCircle2 className="h-4 w-4" />
            case "lost": return <XCircle className="h-4 w-4 text-red-500" />
            default: return <Target className="h-4 w-4" />
        }
    }

    return (
        <CommandItem
            value={`${opportunity.title} ${contact?.firstName} ${contact?.lastName} ${company?.name || ''} ${opportunity.pipeline}`}
            onSelect={onSelect}
            className="flex items-start gap-4 px-4 py-4 cursor-pointer group data-[selected=true]:bg-primary/[0.12]"
        >
            <div className={cn(
                "h-11 w-11 rounded-xl flex items-center justify-center shrink-0 border-2 border-transparent transition-all shadow-sm",
                getStageColor(opportunity.pipeline)
            )}>
                {getStageIcon(opportunity.pipeline)}
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-[15px] text-foreground group-data-[selected=true]:text-slate-900 dark:group-data-[selected=true]:text-white transition-colors capitalize truncate max-w-[200px]">{opportunity.title}</span>
                    <span className={cn(
                        "text-[9px] px-2 py-0.5 font-bold rounded-full uppercase tracking-tighter transition-all shadow-none",
                        getStageColor(opportunity.pipeline)
                    )}>
                        {opportunity.pipeline}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                    <div className="flex items-center gap-1.5 group-data-[selected=true]:text-primary-900/60 dark:group-data-[selected=true]:text-primary-100/60 transition-colors">
                        <User className="h-3 w-3 opacity-50" />
                        <span>{contact?.firstName} {contact?.lastName}</span>
                    </div>
                    {company && (
                        <div className="flex items-center gap-1.5 border-l pl-2 group-data-[selected=true]:text-primary-900/60 dark:group-data-[selected=true]:text-primary-100/60 group-data-[selected=true]:border-primary/20 transition-all">
                            <Building className="h-3 w-3 opacity-50" />
                            <span>{company.name}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0 text-right">
                <div className="flex items-center gap-1 text-[13px] font-bold text-green-600 dark:text-green-400 group-data-[selected=true]:text-green-700 dark:group-data-[selected=true]:text-green-300">
                    <DollarSign className="h-3.5 w-3.5" />
                    <span>{opportunity.value.toLocaleString()}</span>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">{opportunity.source}</span>
            </div>
        </CommandItem>
    )
}
