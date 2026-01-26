"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  Clock,
  CheckCircle2,
  DollarSign,
  Award,
  Zap,
  Phone,
  Plus,
  Settings2,
  X,
  CalendarIcon,
  Globe,
  Mail,
  Facebook,
  MessageCircle,
  Instagram,
  Voicemail,
  Wrench
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { format } from "date-fns";
import { leadsData, sourceIcons, sourceLabels } from "./data";

// Sample data for charts
const conversionDataByNumber = [
  { month: "Aug", leads: 75, converted: 11 },
  { month: "Sep", leads: 82, converted: 13 },
  { month: "Oct", leads: 88, converted: 15 },
  { month: "Nov", leads: 92, converted: 17 },
  { month: "Dec", leads: 87, converted: 16 },
  { month: "Jan", leads: 95, converted: 19 },
];

const conversionDataByValue = [
  { month: "Aug", value: 92500 },
  { month: "Sep", value: 109800 },
  { month: "Oct", value: 126750 },
  { month: "Nov", value: 143650 },
  { month: "Dec", value: 135200 },
  { month: "Jan", value: 160550 },
];

const callActivityData = [
  { time: "9AM", calls: 8 },
  { time: "10AM", calls: 12 },
  { time: "11AM", calls: 15 },
  { time: "12PM", calls: 9 },
  { time: "1PM", calls: 7 },
  { time: "2PM", calls: 11 },
  { time: "3PM", calls: 13 },
  { time: "4PM", calls: 10 },
  { time: "5PM", calls: 6 },
];

const teamPerformanceData = [
  { name: "Emily Rodriguez", leads: 142, converted: 28, conversion_rate: 19.7, calls_made: 156 },
  { name: "Michael Chen", leads: 128, converted: 18, conversion_rate: 14.1, calls_made: 142 },
  { name: "James Wilson", leads: 105, converted: 15, conversion_rate: 14.3, calls_made: 118 },
  { name: "Sarah Thompson", leads: 89, converted: 12, conversion_rate: 13.5, calls_made: 95 },
];

const sourceDistributionData = [
  { name: "Website", value: 35, fill: "var(--color-leads)" },
  { name: "Phone Calls", value: 28, fill: "var(--color-converted)" },
  { name: "Social Media", value: 22, fill: "var(--color-value)" },
  { name: "Trade Sites", value: 15, fill: "var(--color-calls)" },
];

const chartConfig = {
  leads: {
    label: "Leads",
  },
  converted: {
    label: "Converted",
  },
  value: {
    label: "Value",
  },
  calls: {
    label: "Calls",
  },
} satisfies ChartConfig;

type WidgetType = "conversion_number" | "conversion_value" | "call_activity" | "team_performance" | "source_distribution";

interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  enabled: boolean;
}

const defaultWidgets: Widget[] = [
  { id: "1", type: "conversion_number", title: "Lead Conversion (Count)", enabled: true },
  { id: "2", type: "conversion_value", title: "Lead Conversion (Value)", enabled: true },
  { id: "3", type: "call_activity", title: "Call Activity Today", enabled: true },
  { id: "4", type: "team_performance", title: "Team Performance", enabled: true },
  { id: "5", type: "source_distribution", title: "Lead Source Distribution", enabled: true },
];

export default function LeadDashboardPage() {
  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets);
  const [showWidgetSettings, setShowWidgetSettings] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>(() => {
    const today = new Date();
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    return { from: monthAgo, to: today };
  });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const toggleWidget = (widgetId: string) => {
    setWidgets(prev => prev.map(w => w.id === widgetId ? { ...w, enabled: !w.enabled } : w));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardTitle: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
    setHoveredCard(cardTitle);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const activeWidgets = widgets.filter(w => w.enabled);

  // Calculate stats from leads data
  const totalLeads = leadsData.length;
  const convertedLeads = leadsData.filter(l => l.status === "converted").length;
  const conversionRate = ((convertedLeads / totalLeads) * 100).toFixed(1);
  const avgDealValue = 8450;
  const totalCallsMade = 511;
  const avgResponseTime = "14 min";

  // Lead sources stats
  const sourceStats = [
    { source: "website1", count: leadsData.filter(l => l.source === "website1").length },
    { source: "website2", count: leadsData.filter(l => l.source === "website2").length },
    { source: "trade_site", count: leadsData.filter(l => l.source === "trade_site").length },
    { source: "inbound_call", count: leadsData.filter(l => l.source === "inbound_call").length },
    { source: "voicemail", count: leadsData.filter(l => l.source === "voicemail").length },
    { source: "email", count: leadsData.filter(l => l.source === "email").length },
    { source: "facebook_campaign", count: leadsData.filter(l => l.source === "facebook_campaign").length },
    { source: "facebook_messenger", count: leadsData.filter(l => l.source === "facebook_messenger").length },
    { source: "instagram", count: leadsData.filter(l => l.source === "instagram").length },
    { source: "whatsapp", count: leadsData.filter(l => l.source === "whatsapp").length },
  ].sort((a, b) => b.count - a.count);

  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case "conversion_number":
        return (
          <Card key={widget.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Lead Conversion by Number</CardTitle>
                <CardDescription>Leads vs conversions</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => toggleWidget(widget.id)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <AreaChart data={conversionDataByNumber}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-muted-foreground" />
                  <YAxis tickLine={false} axisLine={false} className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="leads" stroke="var(--color-leads)" fill="var(--color-leads)" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="converted" stroke="var(--color-converted)" fill="var(--color-converted)" fillOpacity={0.2} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );

      case "conversion_value":
        return (
          <Card key={widget.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Lead Conversion by Value</CardTitle>
                <CardDescription>Revenue from conversions</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => toggleWidget(widget.id)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <BarChart data={conversionDataByValue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <ChartTooltip content={<ChartTooltipContent formatter={(value) => `$${value.toLocaleString()}`} />} />
                  <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );

      case "call_activity":
        return (
          <Card key={widget.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Call Activity Today</CardTitle>
                <CardDescription>Calls made by hour</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => toggleWidget(widget.id)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <BarChart data={callActivityData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" tickLine={false} axisLine={false} className="text-muted-foreground" />
                  <YAxis tickLine={false} axisLine={false} className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="calls" fill="var(--color-calls)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );

      case "team_performance":
        return (
          <Card key={widget.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Individual rep metrics and leaderboard</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => toggleWidget(widget.id)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamPerformanceData.map((member, index) => (
                  <div key={member.name} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-semibold">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">{member.name}</p>
                        {index === 0 && <Award className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">Leads</p>
                          <p className="font-semibold">{member.leads}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Converted</p>
                          <p className="font-semibold text-green-600">{member.converted}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Conv. Rate</p>
                          <p className="font-semibold">{member.conversion_rate}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Calls Made</p>
                          <p className="font-semibold">{member.calls_made}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case "source_distribution":
        return (
          <Card key={widget.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Lead Source Distribution</CardTitle>
                <CardDescription>Where leads are coming from</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => toggleWidget(widget.id)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <PieChart>
                  <Pie data={sourceDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {sourceDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <header className="flex shrink-0 items-center gap-2 border-b bg-background px-6 py-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Leads</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="p-6">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Lead Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Performance metrics, conversion tracking, and team analytics
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2" onClick={() => setShowWidgetSettings(!showWidgetSettings)}>
                <Settings2 className="h-4 w-4" />
                Customize Widgets
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[300px] justify-start text-left font-normal gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "MMM dd, yyyy")} - {format(dateRange.to, "MMM dd, yyyy")}
                        </>
                      ) : (
                        format(dateRange.from, "MMM dd, yyyy")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <div className="flex flex-col gap-2 p-3 border-b">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const today = new Date();
                        setDateRange({ from: today, to: today });
                      }}
                    >
                      Today
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const today = new Date();
                        const weekAgo = new Date(today);
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        setDateRange({ from: weekAgo, to: today });
                      }}
                    >
                      Last 7 Days
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const today = new Date();
                        const monthAgo = new Date(today);
                        monthAgo.setMonth(monthAgo.getMonth() - 1);
                        setDateRange({ from: monthAgo, to: today });
                      }}
                    >
                      Last 30 Days
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const today = new Date();
                        const sixMonthsAgo = new Date(today);
                        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                        setDateRange({ from: sixMonthsAgo, to: today });
                      }}
                    >
                      Last 6 Months
                    </Button>
                  </div>
                  <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={{ from: dateRange?.from, to: dateRange?.to }}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        setDateRange({ from: range.from, to: range.to });
                      }
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Widget Settings Panel */}
          {showWidgetSettings && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Widget Settings</CardTitle>
                <CardDescription>Enable or disable widgets to customize your dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {widgets.map(widget => (
                    <Button
                      key={widget.id}
                      variant={widget.enabled ? "default" : "outline"}
                      className="h-auto py-3 flex flex-col items-center gap-2"
                      onClick={() => toggleWidget(widget.id)}
                    >
                      <span className="text-sm text-center">{widget.title}</span>
                      <span className="text-xs opacity-70">{widget.enabled ? "Enabled" : "Disabled"}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* KPI Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card
              className="overflow-hidden transition-all duration-300 hover:shadow-lg relative"
              onMouseMove={(e) => handleMouseMove(e, "Conversion Rate")}
              onMouseLeave={handleMouseLeave}
              style={
                hoveredCard === "Conversion Rate"
                  ? {
                      background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)`,
                    }
                  : undefined
              }
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{conversionRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +2.3% from last period
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card
              className="overflow-hidden transition-all duration-300 hover:shadow-lg relative"
              onMouseMove={(e) => handleMouseMove(e, "Avg Response Time")}
              onMouseLeave={handleMouseLeave}
              style={
                hoveredCard === "Avg Response Time"
                  ? {
                      background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)`,
                    }
                  : undefined
              }
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgResponseTime}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                    <TrendingDown className="h-3 w-3" />
                    -3 min faster
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card
              className="overflow-hidden transition-all duration-300 hover:shadow-lg relative"
              onMouseMove={(e) => handleMouseMove(e, "Total Calls Made")}
              onMouseLeave={handleMouseLeave}
              style={
                hoveredCard === "Total Calls Made"
                  ? {
                      background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)`,
                    }
                  : undefined
              }
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Calls Made</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCallsMade}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Selected period
                </p>
              </CardContent>
            </Card>

            <Card
              className="overflow-hidden transition-all duration-300 hover:shadow-lg relative"
              onMouseMove={(e) => handleMouseMove(e, "Avg Deal Value")}
              onMouseLeave={handleMouseLeave}
              style={
                hoveredCard === "Avg Deal Value"
                  ? {
                      background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)`,
                    }
                  : undefined
              }
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Deal Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${avgDealValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  From converted leads
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Lead Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Sources</CardTitle>
              <CardDescription>Distribution of leads by source channel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {sourceStats.map((stat) => {
                  const Icon = sourceIcons[stat.source as keyof typeof sourceIcons];
                  const cardKey = `source-${stat.source}`;
                  return (
                    <Card 
                      key={stat.source} 
                      className="overflow-hidden transition-all duration-300 hover:shadow-lg relative cursor-pointer"
                      onMouseMove={(e) => handleMouseMove(e, cardKey)}
                      onMouseLeave={handleMouseLeave}
                      style={
                        hoveredCard === cardKey
                          ? {
                              background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)`,
                            }
                          : undefined
                      }
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground truncate">
                              {sourceLabels[stat.source as keyof typeof sourceLabels]}
                            </p>
                            <p className="text-2xl font-bold">{stat.count}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Leads by CSR */}
          <Card>
            <CardHeader>
              <CardTitle>Leads per Sales Person</CardTitle>
              <CardDescription>Lead distribution and performance by team member</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamPerformanceData.map((member, index) => {
                  const memberKey = `sales-${member.name}`;
                  return (
                  <div 
                    key={member.name} 
                    className="flex items-center gap-4 p-4 border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg relative cursor-pointer"
                    onMouseMove={(e) => handleMouseMove(e, memberKey)}
                    onMouseLeave={handleMouseLeave}
                    style={
                      hoveredCard === memberKey
                        ? {
                            background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)`,
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-semibold">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">{member.name}</p>
                        {index === 0 && <Award className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">Leads</p>
                          <p className="font-semibold">{member.leads}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Converted</p>
                          <p className="font-semibold text-green-600 dark:text-green-400">{member.converted}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Conv. Rate</p>
                          <p className="font-semibold">{member.conversion_rate}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Calls Made</p>
                          <p className="font-semibold">{member.calls_made}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Performance Charts */}
          <div className="grid gap-4 lg:grid-cols-2">
            {activeWidgets.filter(w => w.type === "conversion_number" || w.type === "conversion_value").map(widget => renderWidget(widget))}
          </div>

          {/* Activity & Team Performance */}
          <div className="grid gap-4 lg:grid-cols-2">
            {activeWidgets.filter(w => w.type === "call_activity").map(widget => renderWidget(widget))}
            {activeWidgets.filter(w => w.type === "source_distribution").map(widget => renderWidget(widget))}
          </div>

          {/* Team Performance Widget (if enabled) */}
          {activeWidgets.filter(w => w.type === "team_performance").map(widget => renderWidget(widget))}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common lead management tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Link href="/dashboard/leads/all">
                  <Button variant="outline" className="w-full gap-2">
                    <Users className="h-4 w-4" />
                    View All Leads
                  </Button>
                </Link>
                <Link href="/dashboard/leads/add">
                  <Button variant="outline" className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Add New Lead
                  </Button>
                </Link>
                <Link href="/dashboard/leads/round-robin">
                  <Button variant="outline" className="w-full gap-2">
                    <Zap className="h-4 w-4" />
                    Round Robin
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
