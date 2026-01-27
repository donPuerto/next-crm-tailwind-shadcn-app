import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MessageSquare, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ChatSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative group/chat">
                    <MessageSquare className="h-5 w-5 transition-transform group-hover/chat:scale-110" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-background transition-colors group-hover/chat:bg-blue-500" />
                    <span className="sr-only">Chat</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] flex flex-col p-0 sm:w-[540px]">
                <SheetHeader className="p-4 border-b space-y-4">
                    <div className="flex items-center gap-4">
                        <SheetTitle>Messages</SheetTitle>
                        <SheetDescription className="sr-only">
                            View and manage your messages.
                        </SheetDescription>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                            <span className="sr-only">New Message</span>
                            <MessageSquare className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search messages..." className="pl-8 bg-muted/50" />
                    </div>
                </SheetHeader>
                <ScrollArea className="flex-1">
                    <div className="flex flex-col">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors border-b last:border-0 cursor-pointer"
                            >
                                <Avatar>
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                                    <AvatarFallback>U{i}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium leading-none">User {i + 1}</p>
                                        <span className="text-xs text-muted-foreground">2m ago</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {i % 2 === 0
                                            ? "Hey, can you check the latest design updates I sent over?"
                                            : "The meeting has been rescheduled to tomorrow at 10 AM."}
                                    </p>
                                </div>
                                {i < 3 && (
                                    <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t bg-muted/20">
                    <Button className="w-full">
                        View All Messages
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
