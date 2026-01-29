"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  DollarSign,
  Calendar,
  Award,
  Zap
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const conversionFunnelData = [
  { stage: "Total Leads", count: 450, percentage: 100 },
  { stage: "Contacted", count: 342, percentage: 76 },
  { stage: "Qualified", count: 180, percentage: 40 },
  { stage: "Proposal Sent", count: 95, percentage: 21 },
  { stage: "Converted", count: 38, percentage: 8.4 },
];

const responseTimeData = [
  { time: "0-5 min", leads: 125, conversion: 18.4 },
  { time: "5-30 min", leads: 98, conversion: 12.2 },
  { time: "30-60 min", leads: 67, conversion: 8.9 },
  { time: "1-4 hrs", leads: 89, conversion: 6.5 },
  { time: "4+ hrs", leads: 71, conversion: 3.2 },
];

const teamPerformanceData = [
  { name: "Emily Rodriguez", leads: 142, converted: 28, conversion_rate: 19.7, avg_response: "8 min" },
  { name: "Michael Chen", leads: 128, converted: 18, conversion_rate: 14.1, avg_response: "12 min" },
  { name: "James Wilson", leads: 105, converted: 15, conversion_rate: 14.3, avg_response: "15 min" },
  { name: "Sarah Martinez", leads: 75, converted: 9, conversion_rate: 12.0, avg_response: "22 min" },
];

const weeklyTrendData = [
  { week: "Week 1", leads: 95, conversions: 12, conversion_rate: 12.6 },
  { week: "Week 2", leads: 102, conversions: 14, conversion_rate: 13.7 },
  { week: "Week 3", leads: 118, conversions: 18, conversion_rate: 15.3 },
  { week: "Week 4", leads: 135, conversions: 19, conversion_rate: 14.1 },
];

const chartConfig = {
  leads: {
    label: "Leads",
    color: "hsl(var(--chart-1))",
  },
  conversions: {
    label: "Conversions",
    color: "hsl(var(--chart-2))",
  },
  conversion_rate: {
    label: "Conversion Rate",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function LeadPerformancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "quarter">("month");

  return (
    <div className="flex flex-col gap-6 layout-padding py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lead Performance</h1>
          <p className="text-muted-foreground mt-1">
            Track conversion rates, response times, and team performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedPeriod === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("week")}
          >
            This Week
          </Button>
          <Button
            variant={selectedPeriod === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("month")}
          >
            This Month
          </Button>
          <Button
            variant={selectedPeriod === "quarter" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("quarter")}
          >
            This Quarter
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +2.1%
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14 min</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                -3 min faster
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground mt-1">
              342 of 450 leads contacted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,450</div>
            <p className="text-xs text-muted-foreground mt-1">
              From converted leads
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
          <CardDescription>Lead progression through sales stages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionFunnelData.map((stage, index) => {
              const isLast = index === conversionFunnelData.length - 1;
              return (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium min-w-[120px]">{stage.stage}</div>
                      <div className="text-2xl font-bold">{stage.count}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{stage.percentage}%</div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isLast ? 'bg-green-500' : 'bg-primary'
                        }`}
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>
                  {index < conversionFunnelData.length - 1 && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <XCircle className="h-3 w-3 text-red-500" />
                      {conversionFunnelData[index].count - conversionFunnelData[index + 1].count} lost
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance Trend</CardTitle>
            <CardDescription>Leads and conversions over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={weeklyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="week"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="var(--color-leads)"
                  fill="var(--color-leads)"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="conversions"
                  stroke="var(--color-conversions)"
                  fill="var(--color-conversions)"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Time Impact</CardTitle>
            <CardDescription>Conversion rate by response time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: number) => `${value}%`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="conversion" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
          <CardDescription>Individual sales rep lead performance metrics</CardDescription>
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
                    {index === 0 && (
                      <Award className="h-5 w-5 text-yellow-500" />
                    )}
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
                      <p className="text-muted-foreground text-xs">Avg Response</p>
                      <p className="font-semibold">{member.avg_response}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Performing Day</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Tuesday</div>
            <p className="text-xs text-muted-foreground mt-1">
              18.5% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9AM - 11AM</div>
            <p className="text-xs text-muted-foreground mt-1">
              Highest engagement window
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Follow-up Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Leads with 2+ follow-ups
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
