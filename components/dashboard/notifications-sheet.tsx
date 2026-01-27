import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function NotificationsSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative group/notif">
                    <Bell className="h-5 w-5 transition-transform group-hover/notif:scale-110" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600 ring-2 ring-background transition-colors group-hover/notif:bg-red-500" />
                    <span className="sr-only">Notifications</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] flex flex-col p-0 sm:w-[540px]">
                <SheetHeader className="p-6 border-b">
                    <SheetTitle>Notifications</SheetTitle>
                    <SheetDescription>
                        You have 3 unread messages.
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="flex-1">
                    <div className="flex flex-col">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex flex-col gap-1 p-4 border-b hover:bg-muted/50 transition-colors last:border-0"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                                    <span className="text-sm font-semibold">New Message</span>
                                    <span className="ml-auto text-xs text-muted-foreground">
                                        {i + 1}h ago
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground pl-4">
                                    You have received a new message regarding the project timeline updates.
                                </p>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t bg-muted/20">
                    <Button variant="outline" className="w-full">
                        Mark all as read
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
