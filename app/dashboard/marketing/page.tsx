"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  MousePointerClick,
  Mail,
  Facebook,
  Instagram,
  MessageCircle,
  Globe,
  Eye,
  Target,
  DollarSign,
  BarChart3,
  Plus
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const campaignData = [
  { month: "Jan", leads: 45, conversions: 12 },
  { month: "Feb", leads: 52, conversions: 15 },
  { month: "Mar", leads: 48, conversions: 14 },
  { month: "Apr", leads: 61, conversions: 18 },
  { month: "May", leads: 58, conversions: 16 },
  { month: "Jun", leads: 67, conversions: 22 },
];

const channelPerformance = [
  { channel: "Facebook", roi: 245, spend: 2500, leads: 89 },
  { channel: "Instagram", roi: 189, spend: 1800, leads: 56 },
  { channel: "Google Ads", roi: 312, spend: 3200, leads: 124 },
  { channel: "Email", roi: 425, spend: 800, leads: 67 },
  { channel: "Website", roi: 890, spend: 500, leads: 145 },
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
} satisfies ChartConfig;

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Target className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Marketing Dashboard</h1>
          </div>
          <p className="text-sm font-normal text-muted-foreground mt-1">
            Track campaigns, channels, and marketing ROI
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">331</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+18.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Marketing Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,800</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">412%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+45%</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Per Lead</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$26.59</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">-12.4%</span> reduction
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
          <CardDescription>Currently running marketing campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Facebook className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">Summer Sale 2026</h4>
                <p className="text-xs text-muted-foreground mt-1">Facebook Ads</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">89 leads</span>
                  <span className="text-xs font-medium text-green-600">245% ROI</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Instagram className="h-5 w-5 text-purple-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">Door Installation Promo</h4>
                <p className="text-xs text-muted-foreground mt-1">Instagram Ads</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">56 leads</span>
                  <span className="text-xs font-medium text-green-600">189% ROI</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <div className="p-2 rounded-lg bg-red-500/10">
                <Mail className="h-5 w-5 text-red-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">Newsletter Q2</h4>
                <p className="text-xs text-muted-foreground mt-1">Email Campaign</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">67 leads</span>
                  <span className="text-xs font-medium text-green-600">425% ROI</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Monthly leads and conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={campaignData}>
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
            <CardTitle>Channel Performance</CardTitle>
            <CardDescription>Marketing channels by ROI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {channelPerformance.map((channel) => {
                const channelIcons = {
                  Facebook: Facebook,
                  Instagram: Instagram,
                  "Google Ads": Globe,
                  Email: Mail,
                  Website: Eye,
                };
                const ChannelIcon = channelIcons[channel.channel as keyof typeof channelIcons];

                return (
                  <div key={channel.channel} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="p-2 rounded-lg bg-muted">
                      <ChannelIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">{channel.channel}</p>
                        <p className="text-sm font-bold text-green-600">{channel.roi}% ROI</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Spend: ${channel.spend.toLocaleString()}</span>
                        <span>•</span>
                        <span>{channel.leads} leads</span>
                        <span>•</span>
                        <span>${(channel.spend / channel.leads).toFixed(2)} CPL</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Marketing Insights */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Website Traffic</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,567</div>
            <p className="text-xs text-muted-foreground mt-1">
              Unique visitors this month
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Bounce rate:</span>
              <span className="font-medium">42.3%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click-Through Rate</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Average across all campaigns
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-green-600">+0.6%</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Social Engagement</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,432</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total interactions
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-green-600">+24.5%</span>
              <span className="text-muted-foreground">growth</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
