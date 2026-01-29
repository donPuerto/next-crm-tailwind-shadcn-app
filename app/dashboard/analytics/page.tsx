"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/app/hooks/useTheme";
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Calendar
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { COLOR_CONFIG } from "@/lib/constants/themes";

const revenueData = [
  { month: "Jan", revenue: 45000, target: 40000 },
  { month: "Feb", revenue: 52000, target: 45000 },
  { month: "Mar", revenue: 48000, target: 45000 },
  { month: "Apr", revenue: 61000, target: 50000 },
  { month: "May", revenue: 58000, target: 50000 },
  { month: "Jun", revenue: 67000, target: 55000 },
];

const leadConversionData = [
  { stage: "Leads", count: 450 },
  { stage: "Qualified", count: 180 },
  { stage: "Proposals", count: 95 },
  { stage: "Negotiations", count: 52 },
  { stage: "Closed Won", count: 38 },
];

const customerAcquisitionData = [
  { month: "Jan", new: 12, churned: 2 },
  { month: "Feb", new: 15, churned: 3 },
  { month: "Mar", new: 18, churned: 1 },
  { month: "Apr", new: 22, churned: 4 },
  { month: "May", new: 19, churned: 2 },
  { month: "Jun", new: 25, churned: 3 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  target: {
    label: "Target",
    color: "var(--chart-2)",
  },
  new: {
    label: "New Customers",
    color: "var(--chart-1)",
  },
  churned: {
    label: "Churned",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

// Helper function to get computed CSS variable value
function getComputedColor(variableName: string): string {
  if (typeof window === 'undefined') return 'oklch(0.81 0.17 75.35)'; // fallback for SSR
  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  return value || 'oklch(0.81 0.17 75.35)';
}

export default function AnalyticsPage() {
  const { theme, color } = useTheme();
  const [colors, setColors] = useState({
    chart1: "oklch(0.81 0.17 75.35)",
    chart2: "oklch(0.55 0.22 264.53)",
    chart3: "oklch(0.72 0 0)",
  });

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
    const baseColor = COLOR_CONFIG[color]?.hex || '#EC4899';


    // Generate 3 variations of the selected color
    const newColors = {
      chart1: baseColor,
      chart2: adjustBrightness(baseColor, -15), // Darker
      chart3: adjustBrightness(baseColor, -30), // Much darker
    };

    setColors(newColors);
  }, [color, theme]);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          </div>
          <p className="text-sm font-normal text-muted-foreground mt-1">
            Comprehensive insights into your business performance
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$331,000</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+16.5%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">284</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+23</span> this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+1.2%</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,711</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-600">-3.2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Target</CardTitle>
            <CardDescription>Monthly revenue performance against targets</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-75 w-full" key={`revenue-area-${colors.chart1}`}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={colors.chart1}
                  fill={colors.chart1}
                  fillOpacity={0.3}
                  label={{ position: 'top' }}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke={colors.chart2}
                  fill={colors.chart2}
                  fillOpacity={0.15}
                  strokeDasharray="5 5"
                  label={{ position: 'top' }}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Conversion Funnel</CardTitle>
            <CardDescription>Lead journey through sales pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-75 w-full">
              <BarChart data={leadConversionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                  dataKey="stage"
                  type="category"
                  width={100}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Acquisition</CardTitle>
            <CardDescription>New customers vs churned customers</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-75 w-full" key={`acquisition-bar-${colors.chart1}`}>
              <BarChart data={customerAcquisitionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="new" fill={colors.chart1} radius={[4, 4, 0, 0]} label={{ position: 'top' }} />
                <Bar dataKey="churned" fill={colors.chart3} radius={[4, 4, 0, 0]} label={{ position: 'top' }} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
            <CardDescription>Important business indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Activity className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Customer Lifetime Value</p>
                    <p className="text-xs text-muted-foreground">Average LTV</p>
                  </div>
                </div>
                <p className="text-lg font-bold">$42,350</p>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Calendar className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Customer Retention</p>
                    <p className="text-xs text-muted-foreground">Last 12 months</p>
                  </div>
                </div>
                <p className="text-lg font-bold">94.2%</p>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <BarChart3 className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sales Velocity</p>
                    <p className="text-xs text-muted-foreground">Avg. time to close</p>
                  </div>
                </div>
                <p className="text-lg font-bold">18 days</p>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <PieChart className="h-4 w-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Win Rate</p>
                    <p className="text-xs text-muted-foreground">Closed won/total</p>
                  </div>
                </div>
                <p className="text-lg font-bold">34.8%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
