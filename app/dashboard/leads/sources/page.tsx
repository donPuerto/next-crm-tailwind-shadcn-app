"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Globe,
  Phone,
  Voicemail,
  Mail,
  Facebook,
  MessageCircle,
  Instagram,
  Wrench,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const sourceData = [
  { 
    source: "DoorWindowPro.com",
    type: "website1",
    icon: Globe,
    leads: 89,
    conversions: 18,
    conversion_rate: 20.2,
    cost_per_lead: 0,
    revenue: 152400,
    trend: "up",
    color: "bg-blue-500"
  },
  { 
    source: "HomeFix24.com",
    type: "website2",
    icon: Globe,
    leads: 67,
    conversions: 12,
    conversion_rate: 17.9,
    cost_per_lead: 0,
    revenue: 101400,
    trend: "up",
    color: "bg-indigo-500"
  },
  { 
    source: "Trade Sites",
    type: "trade_site",
    icon: Wrench,
    leads: 124,
    conversions: 22,
    conversion_rate: 17.7,
    cost_per_lead: 45,
    revenue: 185900,
    trend: "up",
    color: "bg-orange-500"
  },
  { 
    source: "Inbound Calls",
    type: "inbound_call",
    icon: Phone,
    leads: 98,
    conversions: 28,
    conversion_rate: 28.6,
    cost_per_lead: 0,
    revenue: 236800,
    trend: "up",
    color: "bg-green-500"
  },
  { 
    source: "Voicemail",
    type: "voicemail",
    icon: Voicemail,
    leads: 34,
    conversions: 4,
    conversion_rate: 11.8,
    cost_per_lead: 0,
    revenue: 33800,
    trend: "down",
    color: "bg-purple-500"
  },
  { 
    source: "Email",
    type: "email",
    icon: Mail,
    leads: 78,
    conversions: 15,
    conversion_rate: 19.2,
    cost_per_lead: 8,
    revenue: 127000,
    trend: "up",
    color: "bg-red-500"
  },
  { 
    source: "Facebook Ads",
    type: "facebook_campaign",
    icon: Facebook,
    leads: 156,
    conversions: 24,
    conversion_rate: 15.4,
    cost_per_lead: 32,
    revenue: 203000,
    trend: "up",
    color: "bg-blue-600"
  },
  { 
    source: "Facebook Messenger",
    type: "facebook_messenger",
    icon: MessageCircle,
    leads: 45,
    conversions: 6,
    conversion_rate: 13.3,
    cost_per_lead: 0,
    revenue: 50800,
    trend: "up",
    color: "bg-blue-700"
  },
  { 
    source: "Instagram",
    type: "instagram",
    icon: Instagram,
    leads: 67,
    conversions: 8,
    conversion_rate: 11.9,
    cost_per_lead: 28,
    revenue: 67600,
    trend: "down",
    color: "bg-pink-500"
  },
  { 
    source: "WhatsApp",
    type: "whatsapp",
    icon: MessageCircle,
    leads: 52,
    conversions: 9,
    conversion_rate: 17.3,
    cost_per_lead: 0,
    revenue: 76100,
    trend: "up",
    color: "bg-green-600"
  },
];

const chartData = sourceData.map(s => ({
  name: s.source,
  leads: s.leads,
  conversions: s.conversions
}));

const chartConfig = {
  leads: {
    label: "Leads",
    color: "hsl(var(--chart-1))",
  },
  conversions: {
    label: "Conversions",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function LeadSourcesPage() {
  const totalLeads = sourceData.reduce((sum, s) => sum + s.leads, 0);
  const totalConversions = sourceData.reduce((sum, s) => sum + s.conversions, 0);
  const totalRevenue = sourceData.reduce((sum, s) => sum + s.revenue, 0);
  const avgConversionRate = ((totalConversions / totalLeads) * 100).toFixed(1);
  
  // Calculate total cost
  const totalCost = sourceData.reduce((sum, s) => sum + (s.cost_per_lead * s.leads), 0);
  const roi = totalCost > 0 ? (((totalRevenue - totalCost) / totalCost) * 100).toFixed(0) : "∞";

  return (
    <div className="flex flex-col gap-6 layout-padding py-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lead Sources</h1>
        <p className="text-muted-foreground mt-1">
          Analyze performance across all lead generation channels
        </p>
      </div>

      {/* Summary KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">
              From {sourceData.length} sources
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Conversion</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgConversionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalConversions} conversions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground mt-1">
              From converted leads
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roi}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              ${(totalCost / 1000).toFixed(1)}k spend
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Volume by Source</CardTitle>
          <CardDescription>Compare lead generation and conversion across channels</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="leads" fill="var(--color-leads)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="conversions" fill="var(--color-conversions)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Source Performance Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {sourceData.map((source) => {
          const SourceIcon = source.icon;
          const TrendIcon = source.trend === "up" ? TrendingUp : TrendingDown;
          const avgDealValue = source.conversions > 0 ? source.revenue / source.conversions : 0;
          
          return (
            <Card key={source.type}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${source.color}/10`}>
                      <SourceIcon className={`h-5 w-5 ${source.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{source.source}</CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {source.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </CardDescription>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    source.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    <TrendIcon className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Leads</p>
                    <p className="text-2xl font-bold">{source.leads}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Conversions</p>
                    <p className="text-2xl font-bold text-green-600">{source.conversions}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Conversion Rate</span>
                    <span className="font-semibold">{source.conversion_rate}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Cost Per Lead</span>
                    <span className="font-semibold">
                      {source.cost_per_lead === 0 ? "Free" : `$${source.cost_per_lead}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Avg Deal Value</span>
                    <span className="font-semibold text-green-600">
                      ${(avgDealValue / 1000).toFixed(1)}k
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Revenue</span>
                    <span className="font-semibold text-green-600">
                      ${(source.revenue / 1000).toFixed(1)}k
                    </span>
                  </div>
                </div>

                {/* Conversion Rate Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Performance</span>
                    <span className="text-xs font-medium">{source.conversion_rate}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${source.color}`}
                      style={{ width: `${Math.min(source.conversion_rate * 3, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Source Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>Performance highlights and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 border rounded-lg bg-green-500/5">
              <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Inbound Calls Performing Best</h4>
                <p className="text-sm text-muted-foreground">
                  Highest conversion rate at 28.6%. Consider promoting phone number more prominently on websites.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-lg bg-blue-500/5">
              <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">DoorWindowPro.com Leading Organic</h4>
                <p className="text-sm text-muted-foreground">
                  20.2% conversion rate with zero cost per lead. Excellent ROI from organic traffic.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-lg bg-orange-500/5">
              <Wrench className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Trade Sites High Volume</h4>
                <p className="text-sm text-muted-foreground">
                  124 leads generated with decent conversion. Consider optimizing profile and reviews on these platforms.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-lg bg-red-500/5">
              <TrendingDown className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Instagram & Voicemail Need Attention</h4>
                <p className="text-sm text-muted-foreground">
                  Lower conversion rates. Review messaging, follow-up process, and audience targeting.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
