"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function DashboardBreadcrumbs({ fontSize = "text-sm" }: { fontSize?: string }) {
    const pathname = usePathname()
    const pathSegments = pathname.split("/").filter((segment) => segment !== "")

    return (
        <Breadcrumb className={cn("font-sans", fontSize)}>
            <BreadcrumbList className="gap-0 text-[14px] font-normal leading-[20px] text-[#94a3b8] items-baseline">
                {/* Home Link (Text Only) */}
                <BreadcrumbItem className="align-baseline">
                    <BreadcrumbLink asChild className="text-primary hover:text-primary/80 transition-colors font-medium">
                        <Link href="/dashboard">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {pathSegments.length > 1 && <BreadcrumbSeparator className="text-[#94a3b8] px-1" />}

                {/* Dynamic Segments */}
                {pathSegments.map((segment, index) => {
                    // Skip the first "dashboard" segment if we're already showing Home
                    if (segment === "dashboard") return null

                    const href = `/${pathSegments.slice(0, index + 1).join("/")}`
                    const isLast = index === pathSegments.length - 1
                    const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")

                    return (
                        <React.Fragment key={href}>
                            <BreadcrumbItem className="align-baseline">
                                {isLast ? (
                                    <BreadcrumbPage className="text-[#94a3b8] font-normal">{title}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild className="text-[#94a3b8] hover:text-foreground">
                                        <Link href={href}>{title}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator className="text-[#94a3b8] px-1" />}
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
