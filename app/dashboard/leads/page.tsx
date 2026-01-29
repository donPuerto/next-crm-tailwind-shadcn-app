"use client";

import { useState, useEffect, useMemo } from "react";
import { useTheme } from "@/app/hooks/useTheme";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { format } from "date-fns";
import { sourceIcons, sourceLabels } from "./data";
import { generatedLeads as leadsData } from "./leads";
import { COLOR_CONFIG } from "@/lib/constants/themes";

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

const chartConfig = {
  leads: {
    label: "Leads",
    color: "var(--chart-1)",
  },
  converted: {
    label: "Converted",
    color: "var(--chart-2)",
  },
  value: {
    label: "Value",
    color: "var(--chart-3)",
  },
  calls: {
    label: "Calls",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const getValueNumber = (value: ValueType) => {
  const rawValue = Array.isArray(value) ? value[0] : value;
  return Number(rawValue);
};

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
  const { theme, color } = useTheme();
  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets);
  const [showWidgetSettings, setShowWidgetSettings] = useState(false);
  const [colors, setColors] = useState(() => {
    // Initialize with current theme color from localStorage
    if (typeof window !== 'undefined') {
      const currentColor = (localStorage.getItem('app-color') || 'pink') as keyof typeof COLOR_CONFIG;
      const baseColor = COLOR_CONFIG[currentColor]?.hex || '#EC4899';

      const adjustBrightness = (hex: string, percent: number): string => {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, (num >> 16) + amt);
        const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
        const B = Math.min(255, (num & 0x0000FF) + amt);
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
          (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
          (B < 255 ? B < 1 ? 0 : B : 255))
          .toString(16).slice(1);
      };

      return {
        chart1: baseColor,
        chart2: adjustBrightness(baseColor, -15),
        chart3: adjustBrightness(baseColor, -30),
        chart4: adjustBrightness(baseColor, 15),
      };
    }

    // Fallback for SSR
    return {
      chart1: '#EC4899',
      chart2: '#D1397A',
      chart3: '#B62A5B',
      chart4: '#FF5DB8',
    };
  });
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    return { from: today, to: today };
  });
  const [tempDateRange, setTempDateRange] = useState<{ from: Date; to: Date }>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    return { from: today, to: today };
  });
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Helper function to convert hex to oklch (simplified - uses the hex color directly)
  const hexToColor = (hex: string): string => {
    return hex; // Recharts accepts hex colors directly
  };

  // Helper function to adjust color brightness
  const adjustBrightness = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255))
      .toString(16).slice(1);
  };

  // Update chart colors when theme or color changes
  useEffect(() => {
    const updateColors = () => {
      // Re-read color from localStorage to get latest value
      const currentColor = (localStorage.getItem('app-color') || 'pink') as keyof typeof COLOR_CONFIG;
      const baseColor = COLOR_CONFIG[currentColor]?.hex || '#EC4899';

      // Generate 4 variations of the selected color
      const newColors = {
        chart1: baseColor,
        chart2: adjustBrightness(baseColor, -15), // Darker
        chart3: adjustBrightness(baseColor, -30), // Much darker
        chart4: adjustBrightness(baseColor, 15),  // Lighter
      };

      setColors(newColors);
    };

    updateColors();

    // Listen for custom theme change events
    const handleThemeChange = () => {
      updateColors();
    };

    // Listen for page visibility changes (in case theme changed in another tab/component)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateColors();
      }
    };

    window.addEventListener('theme-changed', handleThemeChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Poll for changes every 500ms as a fallback
    const intervalId = setInterval(updateColors, 500);

    return () => {
      window.removeEventListener('theme-changed', handleThemeChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array - only run on mount and when event fires

  // Log when date range changes (for debugging/demonstration)
  useEffect(() => {
    // TODO: In production, this would trigger an API call to fetch filtered data
    // For now, the data is static so visual changes won't occur
  }, [dateRange]);

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

  // Filter leads data based on selected date range
  const filteredLeads = useMemo(() => {
    return leadsData.filter(lead => {
      const leadDate = new Date(lead.created_at);
      const startDate = new Date(dateRange.from);
      const endDate = new Date(dateRange.to);

      // Reset time part to compare only dates
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      return leadDate >= startDate && leadDate <= endDate;
    });
  }, [dateRange]);

  // Calculate stats from filtered leads data
  const totalLeads = filteredLeads.length;
  const convertedLeads = filteredLeads.filter(l => l.status === "converted").length;
  const lostLeads = filteredLeads.filter(l => l.status === "lost").length;
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : "0.0";

  // Calculate number of days in range
  const daysDiff = Math.max(1, Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1);

  // Calculate per-day metrics
  const leadsPerDay = (totalLeads / daysDiff).toFixed(1);
  const conversionsPerDay = (convertedLeads / daysDiff).toFixed(1);
  const lostPerDay = (lostLeads / daysDiff).toFixed(1);

  // Calculate revenue (assuming $8,450 average per converted lead)
  const avgDealValue = 8450;
  const totalRevenue = convertedLeads * avgDealValue;
  const revenuePerDay = (totalRevenue / daysDiff).toFixed(0);

  const totalCallsMade = 511;
  const avgResponseTime = "14 min";

  // Lead sources stats from filtered data with conversion rates
  const sourceStats = [
    { source: "website1", count: filteredLeads.filter(l => l.source === "website1").length, converted: filteredLeads.filter(l => l.source === "website1" && l.status === "converted").length },
    { source: "website2", count: filteredLeads.filter(l => l.source === "website2").length, converted: filteredLeads.filter(l => l.source === "website2" && l.status === "converted").length },
    { source: "trade_site", count: filteredLeads.filter(l => l.source === "trade_site").length, converted: filteredLeads.filter(l => l.source === "trade_site" && l.status === "converted").length },
    { source: "inbound_call", count: filteredLeads.filter(l => l.source === "inbound_call").length, converted: filteredLeads.filter(l => l.source === "inbound_call" && l.status === "converted").length },
    { source: "voicemail", count: filteredLeads.filter(l => l.source === "voicemail").length, converted: filteredLeads.filter(l => l.source === "voicemail" && l.status === "converted").length },
    { source: "email", count: filteredLeads.filter(l => l.source === "email").length, converted: filteredLeads.filter(l => l.source === "email" && l.status === "converted").length },
    { source: "facebook_campaign", count: filteredLeads.filter(l => l.source === "facebook_campaign").length, converted: filteredLeads.filter(l => l.source === "facebook_campaign" && l.status === "converted").length },
    { source: "facebook_messenger", count: filteredLeads.filter(l => l.source === "facebook_messenger").length, converted: filteredLeads.filter(l => l.source === "facebook_messenger" && l.status === "converted").length },
    { source: "instagram", count: filteredLeads.filter(l => l.source === "instagram").length, converted: filteredLeads.filter(l => l.source === "instagram" && l.status === "converted").length },
    { source: "whatsapp", count: filteredLeads.filter(l => l.source === "whatsapp").length, converted: filteredLeads.filter(l => l.source === "whatsapp" && l.status === "converted").length },
  ].map(s => ({
    ...s,
    conversionRate: s.count > 0 ? ((s.converted / s.count) * 100).toFixed(1) : "0.0",
    percentage: totalLeads > 0 ? ((s.count / totalLeads) * 100).toFixed(1) : "0.0"
  })).sort((a, b) => b.count - a.count);

  // Team performance data from filtered leads
  const teamStats = [
    { name: "Emily Rodriguez", leads: filteredLeads.filter(l => l.assigned_to === "Emily Rodriguez").length, converted: filteredLeads.filter(l => l.assigned_to === "Emily Rodriguez" && l.status === "converted").length },
    { name: "Michael Chen", leads: filteredLeads.filter(l => l.assigned_to === "Michael Chen").length, converted: filteredLeads.filter(l => l.assigned_to === "Michael Chen" && l.status === "converted").length },
    { name: "James Wilson", leads: filteredLeads.filter(l => l.assigned_to === "James Wilson").length, converted: filteredLeads.filter(l => l.assigned_to === "James Wilson" && l.status === "converted").length },
    { name: "Sarah Thompson", leads: filteredLeads.filter(l => l.assigned_to === "Sarah Thompson").length, converted: filteredLeads.filter(l => l.assigned_to === "Sarah Thompson" && l.status === "converted").length },
  ].map(t => ({
    ...t,
    lost: filteredLeads.filter(l => l.assigned_to === t.name && l.status === "lost").length,
    conversionRate: t.leads > 0 ? ((t.converted / t.leads) * 100).toFixed(1) : "0.0"
  })).sort((a, b) => b.leads - a.leads);

  const renderWidget = (widget: Widget) => {
    // Create sourceDistributionData dynamically with all lead sources and percentages from FILTERED data
    const allSourceData = [
      { name: sourceLabels.website1 || "Website 1", count: filteredLeads.filter(l => l.source === "website1").length },
      { name: sourceLabels.website2 || "Website 2", count: filteredLeads.filter(l => l.source === "website2").length },
      { name: sourceLabels.trade_site || "Trade Sites", count: filteredLeads.filter(l => l.source === "trade_site").length },
      { name: sourceLabels.inbound_call || "Inbound Calls", count: filteredLeads.filter(l => l.source === "inbound_call").length },
      { name: sourceLabels.voicemail || "Voicemail", count: filteredLeads.filter(l => l.source === "voicemail").length },
      { name: sourceLabels.email || "Email", count: filteredLeads.filter(l => l.source === "email").length },
      { name: sourceLabels.facebook_campaign || "Facebook Campaign", count: filteredLeads.filter(l => l.source === "facebook_campaign").length },
      { name: sourceLabels.facebook_messenger || "Facebook Messenger", count: filteredLeads.filter(l => l.source === "facebook_messenger").length },
    ];

    const totalSources = allSourceData.reduce((sum, item) => sum + item.count, 0);
    const chartColors = [colors.chart1, colors.chart2, colors.chart3, colors.chart4, adjustBrightness(colors.chart1, 10), adjustBrightness(colors.chart2, 10), adjustBrightness(colors.chart3, 10), adjustBrightness(colors.chart4, 10)];

    const sourceDistributionData = allSourceData.map((item, index) => ({
      name: item.name,
      value: item.count,
      percentage: totalSources > 0 ? ((item.count / totalSources) * 100).toFixed(1) : "0",
      fill: chartColors[index % chartColors.length],
    })).filter(item => item.value > 0) // Only show sources with leads
      .sort((a, b) => b.value - a.value) // Sort by count descending
      .slice(0, 6); // Show top 6 sources only

    // Custom label renderer for pie chart
    const renderCustomLabel = (entry: any) => {
      return `${entry.name}\n${entry.value} (${entry.percentage}%)`;
    };

    switch (widget.type) {
      case "conversion_number":
        return (
          <Card key={`widget-${widget.id}-${colors.chart1}-${colors.chart2}`}>
            <CardHeader>
              <CardTitle>Lead Conversion by Count</CardTitle>
              <CardDescription>Leads vs conversions</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px] w-full" key={`leads-area-${colors.chart1}-${colors.chart2}`}>
                <AreaChart data={conversionDataByNumber}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-muted-foreground" />
                  <YAxis tickLine={false} axisLine={false} className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="leads" stroke={colors.chart1} fill={colors.chart1} fillOpacity={0.3} label={{ position: 'top' }} />
                  <Area type="monotone" dataKey="converted" stroke={colors.chart2} fill={colors.chart2} fillOpacity={0.15} label={{ position: 'top' }} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );

      case "conversion_value":
        return (
          <Card key={`widget-${widget.id}-${colors.chart3}`}>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue from conversions</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px] w-full" key={`value-bar-${colors.chart3}`}>
                <BarChart data={conversionDataByValue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(value: any) => `$${(value / 1000).toFixed(0)}k`} />
                  <ChartTooltip content={<ChartTooltipContent formatter={(value: ValueType) => `$${getValueNumber(value).toLocaleString()}`} />} />
                  <Bar dataKey="value" fill={colors.chart3} radius={[4, 4, 0, 0]} label={{ position: 'top', formatter: (value: ValueType) => `$${(getValueNumber(value) / 1000).toFixed(0)}k` }} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );

      case "call_activity":
        return (
          <Card key={widget.id}>
            <CardHeader>
              <CardTitle>Call Activity Today</CardTitle>
              <CardDescription>Calls made by hour</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px] w-full" key={`calls-bar-${colors.chart4}`}>
                <BarChart data={callActivityData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" tickLine={false} axisLine={false} className="text-muted-foreground" />
                  <YAxis tickLine={false} axisLine={false} className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="calls" fill={colors.chart4} radius={[4, 4, 0, 0]} label={{ position: 'top' }} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );

      case "team_performance":
        return (
          <Card key={widget.id}>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>Individual rep metrics and leaderboard</CardDescription>
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
            <CardHeader>
              <CardTitle>Source Performance</CardTitle>
              <CardDescription>Visual breakdown of lead channels</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80 w-full flex items-center justify-center" key={`pie-${colors.chart1}-${colors.chart2}`}>
                <PieChart width={400} height={320}>
                  <Pie
                    data={sourceDistributionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={renderCustomLabel}
                    labelLine={false}
                  >
                    {sourceDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent formatter={(value: ValueType, name: NameType) => {
                    const displayName = String(name);
                    const percentage = sourceDistributionData.find(d => d.name === displayName)?.percentage;
                    return [`${getValueNumber(value)} leads (${percentage ?? 0}%)`, displayName];
                  }} />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  // Prevent hydration mismatch for date-dependent content
  if (!mounted) {
    return (
      <div className="p-4 md:p-6 flex items-center justify-center h-96">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Lead Dashboard</h1>
          </div>
          <p className="text-sm font-normal text-muted-foreground mt-1">
            Performance metrics, conversion tracking, and team analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setShowWidgetSettings(!showWidgetSettings)}>
            <Settings2 className="h-4 w-4" />
            Customize Widgets
          </Button>
          <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-[200px] font-normal">
                <CalendarIcon className="h-4 w-4 mr-2" />
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
              <div className="flex flex-wrap justify-end gap-2 p-2 border-b">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    setTempDateRange({ from: today, to: today });
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
                    setTempDateRange({ from: weekAgo, to: today });
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
                    setTempDateRange({ from: monthAgo, to: today });
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
                    setTempDateRange({ from: sixMonthsAgo, to: today });
                  }}
                >
                  Last 6 Months
                </Button>
              </div>
              <Calendar
                mode="range"
                defaultMonth={tempDateRange?.from}
                selected={{ from: tempDateRange?.from, to: tempDateRange?.to }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setTempDateRange({ from: range.from, to: range.to });
                  }
                }}
                numberOfMonths={2}
              />
              <div className="flex justify-end gap-2 p-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTempDateRange(dateRange);
                    setIsDatePopoverOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setDateRange(tempDateRange);
                    setIsDatePopoverOpen(false);
                  }}
                >
                  Apply
                </Button>
              </div>
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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Leads */}
        <Card
          key={`kpi-leads-${colors.chart1}`}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg relative"
          onMouseMove={(e) => handleMouseMove(e, "Total Leads")}
          onMouseLeave={handleMouseLeave}
          style={{
            ...(hoveredCard === "Total Leads" && {
              background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)`,
            })
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1 text-primary">
                <TrendingUp className="h-3 w-3" />
                {leadsPerDay} average leads per day
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Total Conversions */}
        <Card
          key={`kpi-conversions-${colors.chart1}`}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg relative"
          onMouseMove={(e) => handleMouseMove(e, "Total Conversions")}
          onMouseLeave={handleMouseLeave}
          style={{
            ...(hoveredCard === "Total Conversions" && {
              background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)`,
            })
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
            <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-primary/10">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold">{convertedLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1 text-primary">
                <TrendingUp className="h-3 w-3" />
                {conversionsPerDay} average conversions per day
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card
          key={`kpi-revenue-${colors.chart1}`}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg relative"
          onMouseMove={(e) => handleMouseMove(e, "Total Revenue")}
          onMouseLeave={handleMouseLeave}
          style={{
            ...(hoveredCard === "Total Revenue" && {
              background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)`,
            })
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-primary/10">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold">${(totalRevenue / 1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1 text-primary">
                <TrendingUp className="h-3 w-3" />
                average ${(Number(revenuePerDay) / 1000).toFixed(1)}k per day
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Total Lost */}
        <Card
          key={`kpi-lost-${colors.chart1}`}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg relative"
          onMouseMove={(e) => handleMouseMove(e, "Total Lost")}
          onMouseLeave={handleMouseLeave}
          style={{
            ...(hoveredCard === "Total Lost" && {
              background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)`,
            })
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Total Lost</CardTitle>
            <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-red-500/10">
              <X className="h-5 w-5 text-red-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold">{lostLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1 text-red-500">
                <TrendingDown className="h-3 w-3" />
                {lostPerDay} average lost per day
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* COLLAPSIBLE CATEGORIES */}
      <Accordion type="multiple" defaultValue={["performance", "team", "sources", "activity"]} className="space-y-4">
        {/* PERFORMANCE METRICS CATEGORY */}
        <AccordionItem value="performance" className="border rounded-lg px-6">
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">Performance Metrics</h2>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="grid gap-4 lg:grid-cols-2 pt-2">
              {activeWidgets.filter(w => w.type === "conversion_number" || w.type === "conversion_value").map(widget => renderWidget(widget))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* TEAM PERFORMANCE CATEGORY */}
        <AccordionItem value="team" className="border rounded-lg px-6">
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">Team Performance</h2>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <Card>
              <CardHeader>
                <CardTitle>Leads per Sales Person</CardTitle>
                <CardDescription>Lead distribution and conversion performance by team member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {teamStats.map((member, index) => {
                    const maxLeads = Math.max(...teamStats.map(t => t.leads));
                    const barWidth = (member.leads / maxLeads) * 100;
                    const convertedWidth = member.leads > 0 ? (member.converted / member.leads) * 100 : 0;
                    const lostWidth = member.leads > 0 ? (member.lost / member.leads) * 100 : 0;

                    return (
                      <div key={member.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                              #{index + 1}
                            </div>
                            <div>
                              <p className="font-semibold flex items-center gap-2">
                                {member.name}
                                {index === 0 && <Award className="h-4 w-4 text-yellow-500" />}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {member.leads} leads • {member.converted} converted • {member.conversionRate}% rate
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
                          <div
                            className="absolute left-0 top-0 h-full bg-primary/20 transition-all duration-500"
                            style={{ width: `${barWidth}%` }}
                          />
                          <div
                            className="absolute left-0 top-0 h-full bg-primary transition-all duration-500"
                            style={{ width: `${(member.converted / maxLeads) * 100}%` }}
                          />
                          <div className="absolute inset-0 flex items-center justify-between px-3">
                            <span className="text-xs font-semibold text-primary-foreground drop-shadow-sm">
                              {member.converted} converted
                            </span>
                            <span className="text-xs font-medium">
                              {member.leads} total
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* LEAD SOURCES CATEGORY */}
        <AccordionItem value="sources" className="border rounded-lg px-6">
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">Lead Sources</h2>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="grid gap-4 lg:grid-cols-2 pt-2">
              {/* Lead Sources Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Source Distribution</CardTitle>
                  <CardDescription>Lead volume and conversion rate by channel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sourceStats.slice(0, 8).map((stat) => {
                      const Icon = sourceIcons[stat.source as keyof typeof sourceIcons];
                      const maxCount = Math.max(...sourceStats.map(s => s.count));
                      const barWidth = stat.count > 0 ? (stat.count / maxCount) * 100 : 0;

                      return (
                        <div key={stat.source} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 flex-1">
                              <Icon className="h-4 w-4 text-primary" />
                              <span className="font-medium">{sourceLabels[stat.source as keyof typeof sourceLabels]}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{stat.count} leads</span>
                              <span className="text-primary font-semibold">{stat.conversionRate}%</span>
                            </div>
                          </div>
                          <div className="relative h-6 bg-muted rounded-md overflow-hidden">
                            <div
                              className="absolute left-0 top-0 h-full bg-primary/20 transition-all duration-500"
                              style={{ width: `${barWidth}%` }}
                            />
                            <div
                              className="absolute left-0 top-0 h-full bg-primary transition-all duration-500"
                              style={{ width: `${(stat.converted / maxCount) * 100}%` }}
                            />
                            <div className="absolute inset-0 flex items-center px-2">
                              <span className="text-xs font-semibold text-primary-foreground drop-shadow-sm">
                                {stat.percentage}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Source Distribution Pie Chart */}
              {activeWidgets.filter(w => w.type === "source_distribution").map(widget => renderWidget(widget))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ACTIVITY & INSIGHTS CATEGORY */}
        <AccordionItem value="activity" className="border rounded-lg px-6 pb-0">
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">Activity & Insights</h2>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="grid gap-4 lg:grid-cols-2 pt-2">
              {activeWidgets.filter(w => w.type === "call_activity").map(widget => renderWidget(widget))}
              {activeWidgets.filter(w => w.type === "team_performance").map(widget => renderWidget(widget))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* QUICK ACTIONS */}
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
  );
}
