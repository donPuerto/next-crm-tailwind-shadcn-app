"use client";

import { Monitor, Tablet, Smartphone, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DeviceType = "desktop" | "tablet" | "mobile" | "full";

interface DeviceToolbarProps {
    currentDevice: DeviceType;
    onDeviceChange: (device: DeviceType) => void;
}

export function DeviceToolbar({ currentDevice, onDeviceChange }: DeviceToolbarProps) {
    return (
        <div className="flex items-center justify-center border-b bg-muted/30 p-2 backdrop-blur-sm sticky top-0 z-50 overflow-x-auto">
            <div className="flex items-center gap-2 bg-background p-1 rounded-full border shadow-sm">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeviceChange("full")}
                    className={cn("h-8 w-8 rounded-full p-0", currentDevice === "full" && "bg-primary/10 text-primary")}
                    title="Full Width"
                >
                    <Maximize2 className="h-4 w-4" />
                </Button>
                <div className="w-px h-4 bg-border" />
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeviceChange("desktop")}
                    className={cn("h-8 w-8 rounded-full p-0", currentDevice === "desktop" && "bg-primary/10 text-primary")}
                    title="Desktop (1280px)"
                >
                    <Monitor className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeviceChange("tablet")}
                    className={cn("h-8 w-8 rounded-full p-0", currentDevice === "tablet" && "bg-primary/10 text-primary")}
                    title="Tablet (768px)"
                >
                    <Tablet className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeviceChange("mobile")}
                    className={cn("h-8 w-8 rounded-full p-0", currentDevice === "mobile" && "bg-primary/10 text-primary")}
                    title="Mobile (375px)"
                >
                    <Smartphone className="h-4 w-4" />
                </Button>
            </div>
            <span className="ml-4 text-xs text-muted-foreground hidden sm:inline-block">
                Responsive Preview Mode
            </span>
        </div>
    );
}
