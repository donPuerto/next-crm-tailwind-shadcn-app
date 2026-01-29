"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { CheckCircle2, DollarSign, TrendingUp, Target } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { DUMMY_OPPORTUNITIES, DUMMY_CONTACTS, DUMMY_COMPANIES, DUMMY_USERS } from "@/lib/constants/dummy-data";

type Period = "3months" | "30days" | "7days";

const kpiData = {
  "3months": [
    { title: "Opportunities Won", value: "142", delta: "+18.2%", trend: "up", note: "85 closed this quarter", icon: CheckCircle2 },
    { title: "Revenue Generated", value: "$1,245,000", delta: "+12.5%", trend: "up", note: "Strong Q1 performance", icon: DollarSign },
    { title: "New Leads", value: "1,247", delta: "+24%", trend: "up", note: "Best quarter for inbound", icon: TrendingUp },
    { title: "Conversion Rate", value: "11.4%", delta: "+2.8%", trend: "up", note: "Above target benchmark", icon: Target }
  ],
  "30days": [
    { title: "Opportunities Won", value: "38", delta: "+15.1%", trend: "up", note: "28 closed this month", icon: CheckCircle2 },
    { title: "Revenue Generated", value: "$425,000", delta: "+8.3%", trend: "up", note: "Trending above forecast", icon: DollarSign },
    { title: "New Leads", value: "412", delta: "-5%", trend: "down", note: "Slower than last month", icon: TrendingUp },
    { title: "Conversion Rate", value: "9.2%", delta: "+1.1%", trend: "up", note: "Steady improvement", icon: Target }
  ],
  "7days": [
    { title: "Opportunities Won", value: "12", delta: "+33.3%", trend: "up", note: "9 closed this week", icon: CheckCircle2 },
    { title: "Revenue Generated", value: "$156,000", delta: "+42%", trend: "up", note: "Record weekly close", icon: DollarSign },
    { title: "New Leads", value: "124", delta: "+18%", trend: "up", note: "Strong inbound week", icon: TrendingUp },
    { title: "Conversion Rate", value: "9.7%", delta: "+3.2%", trend: "up", note: "Exceptional week", icon: Target }
  ]
};

const opportunities = DUMMY_OPPORTUNITIES;

const chartData = [
  { month: "Jan", revenue: 32000 },
  { month: "Feb", revenue: 41000 },
  { month: "Mar", revenue: 38000 },
  { month: "Apr", revenue: 46000 },
  { month: "May", revenue: 52000 },
  { month: "Jun", revenue: 61000 },
  { month: "Jul", revenue: 57000 },
  { month: "Aug", revenue: 64000 },
  { month: "Sep", revenue: 60000 },
  { month: "Oct", revenue: 69000 },
  { month: "Nov", revenue: 72000 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export default function SalesDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("3months");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const kpis = kpiData[selectedPeriod];

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <DollarSign className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Sales</h1>
          </div>
          <p className="text-sm font-normal text-muted-foreground mt-1">
            Monitor revenue, opportunities, and sales performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={selectedPeriod === "3months" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("3months")}
          >
            Last 3 months
          </Button>
          <Button
            variant={selectedPeriod === "30days" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("30days")}
          >
            Last 30 days
          </Button>
          <Button
            variant={selectedPeriod === "7days" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("7days")}
          >
            Last 7 days
          </Button>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card
            key={kpi.title}
            className="gap-0 overflow-hidden transition-all duration-300 hover:shadow-lg relative"
            onMouseMove={(e) => handleMouseMove(e, kpi.title)}
            onMouseLeave={handleMouseLeave}
            style={
              hoveredCard === kpi.title
                ? {
                  background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)`,
                }
                : undefined
            }
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <kpi.icon className="h-4 w-4" />
                  <CardTitle>{kpi.title}</CardTitle>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className={`rounded px-2.5 py-1 text-xs font-semibold ${kpi.trend === 'up' ? 'bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-red-500/20 text-red-700 dark:text-red-400'}`}>
                      {kpi.delta}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Compared to previous period</TooltipContent>
                </Tooltip>
              </div>
              <CardTitle className="text-3xl font-bold mt-2">{kpi.value}</CardTitle>
              <CardDescription className="text-sm mt-1">{kpi.note}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="mt-6">
        <Card>
          <CardHeader>
            <div>
              <CardTitle className="text-sm">Revenue Trend</CardTitle>
              <CardDescription>Total for the last 3 months</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="h-48 w-full"
            >
              <AreaChart data={chartData} margin={{ left: 0, right: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Area
                  dataKey="revenue"
                  type="monotone"
                  stroke="var(--color-revenue)"
                  fill="var(--color-revenue)"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Button variant="secondary" size="xs">Sales Pipeline</Button>
              <span>Opportunities</span>
              <span>Open Quotes</span>
              <span>Leads</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-md border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted text-xs text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left">Company</th>
                    <th className="px-3 py-2 text-left">Contact</th>
                    <th className="px-3 py-2 text-left">Value</th>
                    <th className="px-3 py-2 text-left">Pipeline</th>
                    <th className="px-3 py-2 text-left">Technician</th>
                    <th className="px-3 py-2 text-left">Probability</th>
                    <th className="px-3 py-2 text-left">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {opportunities.map((opp) => {
                    const contact = DUMMY_CONTACTS.find(c => c.id === opp.contactId);
                    const company = DUMMY_COMPANIES.find(c => c.id === opp.companyId);
                    return (
                      <tr key={opp.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                        <td className="px-3 py-2 font-medium">{company?.name || "Independent"}</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">{contact?.firstName} {contact?.lastName}</td>
                        <td className="px-3 py-2 font-semibold text-green-600 dark:text-green-400">${opp.value.toLocaleString()}</td>
                        <td className="px-3 py-2">
                          <span className={`rounded-full px-2 py-1 text-xs capitalize ${opp.pipeline === 'completed'
                            ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                            : opp.pipeline === 'lost'
                              ? 'bg-red-500/10 text-red-600'
                              : opp.pipeline === 'booked'
                                ? 'bg-blue-500/20 text-blue-700 dark:text-blue-400'
                                : 'bg-muted'
                            }`}>
                            {opp.pipeline}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          {opp.technicianId ? (
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <span className="text-[10px] font-bold text-primary">
                                  {(() => {
                                    const u = DUMMY_USERS.find(u => u.id === opp.technicianId);
                                    return u ? `${u.firstName[0]}${u.lastName[0]}` : '';
                                  })()}
                                </span>
                              </div>
                              <span className="text-xs font-medium">
                                {(() => {
                                  const u = DUMMY_USERS.find(u => u.id === opp.technicianId);
                                  return u ? `${u.firstName} ${u.lastName}` : 'Unknown';
                                })()}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">Unassigned</span>
                          )}
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${opp.probability >= 70
                                  ? 'bg-green-500'
                                  : opp.probability >= 40
                                    ? 'bg-blue-500'
                                    : 'bg-orange-500'
                                  }`}
                                style={{ width: `${opp.probability}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium w-10 text-right">{opp.probability}%</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-xs text-muted-foreground capitalize">{opp.source}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
