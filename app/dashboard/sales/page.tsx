"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { CheckCircle2, DollarSign, TrendingUp, Target } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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

const deals = [
  { company: "Summit Real Estate Group", contact: "Michael Chen", value: "$125,000", stage: "Negotiation", probability: "75%", source: "Website" },
  { company: "Wellness Pro Gym", contact: "Sarah Martinez", value: "$89,500", stage: "Proposal Sent", probability: "60%", source: "Referral" },
  { company: "Local Dental Care", contact: "Dr. James Wilson", value: "$215,000", stage: "Discovery", probability: "40%", source: "Cold Outreach" },
  { company: "AutoMax Dealership", contact: "Lisa Thompson", value: "$156,000", stage: "Closed Won", probability: "100%", source: "Facebook Ad" },
  { company: "Home Services Plus", contact: "Robert Anderson", value: "$78,500", stage: "Qualification", probability: "30%", source: "Google Ads" }
];

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
    <>
      <header className="layout-padding flex items-center gap-2 py-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex w-full items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Sales</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="layout-padding w-full flex-1 pt-2 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            <h1 className="text-xl font-semibold">Sales</h1>
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
                      <span className="font-medium">{kpi.title}</span>
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
                  <Button variant="secondary" size="xs">Pipeline</Button>
                  <span>Opportunities</span>
                  <span>Won Deals</span>
                  <span>Proposals</span>
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
                        <th className="px-3 py-2 text-left">Stage</th>
                        <th className="px-3 py-2 text-left">Probability</th>
                        <th className="px-3 py-2 text-left">Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deals.map((deal) => (
                        <tr key={deal.company} className="border-t border-border hover:bg-muted/50 transition-colors">
                          <td className="px-3 py-2 font-medium">{deal.company}</td>
                          <td className="px-3 py-2 text-xs text-muted-foreground">{deal.contact}</td>
                          <td className="px-3 py-2 font-semibold text-green-600 dark:text-green-400">{deal.value}</td>
                          <td className="px-3 py-2">
                            <span className={`rounded-full px-2 py-1 text-xs ${
                              deal.stage === 'Closed Won' 
                                ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                                : deal.stage === 'Negotiation'
                                ? 'bg-blue-500/20 text-blue-700 dark:text-blue-400'
                                : 'bg-muted'
                            }`}>
                              {deal.stage}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    parseInt(deal.probability) >= 70 
                                      ? 'bg-green-500' 
                                      : parseInt(deal.probability) >= 50 
                                      ? 'bg-blue-500' 
                                      : 'bg-orange-500'
                                  }`}
                                  style={{ width: deal.probability }}
                                />
                              </div>
                              <span className="text-xs font-medium w-10 text-right">{deal.probability}</span>
                            </div>
                          </td>
                          <td className="px-3 py-2 text-xs text-muted-foreground">{deal.source}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>
      </main>
    </>
  );
}
