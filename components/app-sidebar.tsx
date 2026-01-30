"use client"

import * as React from "react"
import {
  AudioWaveform,
  BarChart3,
  Building2,
  Calendar,
  Command,
  DollarSign,
  Briefcase,
  Package,
  Warehouse,
  Receipt,
  GalleryVerticalEnd,
  Settings2,
  Target,
  TrendingUp,
  Users,
  Zap,
  UserPlus,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Don Puerto",
    email: "m@example.com",
    avatar: "",
  },
  teams: [
    {
      name: "HighLevel Marketing",
      logo: GalleryVerticalEnd,
      plan: "Agency Pro",
    },
    {
      name: "Digital Solutions Co",
      logo: AudioWaveform,
      plan: "Business",
    },
    {
      name: "Growth Partners LLC",
      logo: Command,
      plan: "Starter",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Leads",
          url: "/dashboard/leads",
        },
        {
          title: "Sales",
          url: "/dashboard/sales",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
        {
          title: "Marketing",
          url: "/dashboard/marketing",
        },
      ],
    },
    {
      title: "Conversations",
      url: "/dashboard/conversations",
      icon: Calendar,
      items: [
        {
          title: "Inbox",
          url: "/dashboard/conversations/inbox",
        },
        {
          title: "SMS",
          url: "/dashboard/conversations/sms",
        },
        {
          title: "Email",
          url: "/dashboard/conversations/email",
        },
        {
          title: "Calls",
          url: "/dashboard/conversations/calls",
        },
      ],
    },
    {
      title: "Leads",
      url: "/dashboard/leads",
      icon: UserPlus,
      items: [
        {
          title: "All Leads",
          url: "/dashboard/leads/all",
        },
        {
          title: "Add Lead",
          url: "/dashboard/leads/add",
        },
        {
          title: "Round Robin",
          url: "/dashboard/leads/round-robin",
        },
      ],
    },
    {
      title: "Contacts",
      url: "/dashboard/contacts",
      icon: Users,
      items: [
        {
          title: "All Contacts",
          url: "/dashboard/contacts",
        },
        {
          title: "Smart Lists",
          url: "/dashboard/contacts/lists",
        },
        {
          title: "Tags",
          url: "/dashboard/contacts/tags",
        },
      ],
    },
    {
      title: "Companies",
      url: "/dashboard/companies",
      icon: Building2,
      items: [
        {
          title: "All Companies",
          url: "/dashboard/companies",
        },
        {
          title: "Add Company",
          url: "/dashboard/companies/add",
        },
      ],
    },
    {
      title: "Opportunities",
      url: "/dashboard/opportunities",
      icon: DollarSign,
      items: [
        {
          title: "Pipeline",
          url: "/dashboard/opportunities/pipeline",
        },
        {
          title: "Deals",
          url: "/dashboard/opportunities/deals",
        },
        {
          title: "Proposals",
          url: "/dashboard/opportunities/proposals",
        },
      ],
    },
    {
      title: "Automation",
      url: "/dashboard/automation",
      icon: Zap,
      items: [
        {
          title: "Workflows",
          url: "/dashboard/automation/workflows",
        },
        {
          title: "Campaigns",
          url: "/dashboard/automation/campaigns",
        },
        {
          title: "Triggers",
          url: "/dashboard/automation/triggers",
        },
      ],
    },
    {
      title: "Jobs",
      url: "/dashboard/jobs",
      icon: Briefcase,
      items: [
        {
          title: "All Jobs",
          url: "/dashboard/jobs",
        },
        {
          title: "Schedule",
          url: "/dashboard/jobs/schedule",
        },
        {
          title: "Dispatch",
          url: "/dashboard/jobs/dispatch",
        },
        {
          title: "Completed",
          url: "/dashboard/jobs/completed",
        },
      ],
    },
    {
      title: "Quotes",
      url: "/dashboard/quotes",
      icon: Receipt,
      items: [
        {
          title: "All Quotes",
          url: "/dashboard/quotes",
        },
        {
          title: "Pending",
          url: "/dashboard/quotes/pending",
        },
        {
          title: "Approved",
          url: "/dashboard/quotes/approved",
        },
        {
          title: "Templates",
          url: "/dashboard/quotes/templates",
        },
      ],
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: Package,
      items: [
        {
          title: "Catalog",
          url: "/dashboard/products",
        },
        {
          title: "Categories",
          url: "/dashboard/products/categories",
        },
        {
          title: "Pricing",
          url: "/dashboard/products/pricing",
        },
      ],
    },
    {
      title: "Inventory",
      url: "/dashboard/inventory",
      icon: Warehouse,
      items: [
        {
          title: "Stock Levels",
          url: "/dashboard/inventory",
        },
        {
          title: "Warehouses",
          url: "/dashboard/inventory/warehouses",
        },
        {
          title: "Purchase Orders",
          url: "/dashboard/inventory/po",
        },
        {
          title: "Transfers",
          url: "/dashboard/inventory/transfers",
        },
      ],
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: Users,
      items: [
        {
          title: "All Users",
          url: "/dashboard/users",
        },
        {
          title: "Roles & Permissions",
          url: "/dashboard/users/roles",
        },
        {
          title: "Activity Log",
          url: "/dashboard/users/activity",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/dashboard/settings/general",
        },
        {
          title: "Team",
          url: "/dashboard/settings/team",
        },
        {
          title: "Integrations",
          url: "/dashboard/settings/integrations",
        },
        {
          title: "Billing",
          url: "/dashboard/settings/billing",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Q1 2026 Campaign",
      url: "/dashboard/projects/q1",
      icon: Target,
    },
    {
      name: "Real Estate Funnel",
      url: "/dashboard/projects/realestate",
      icon: Building2,
    },
    {
      name: "Lead Generation",
      url: "/dashboard/projects/leadgen",
      icon: TrendingUp,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader data-slot="sidebar-header">
        {/* TeamSwitcher removed */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
