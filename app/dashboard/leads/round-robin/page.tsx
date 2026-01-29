"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Users,
  UserPlus,
  Settings,
  RotateCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Activity,
  Edit,
  Play,
  Pause
} from "lucide-react";

/*
 * SUPABASE SCHEMA:
 * 
 * Table: round_robin_rules
 * Columns:
 * - id: uuid (PRIMARY KEY)
 * - name: text
 * - is_active: boolean
 * - distribution_type: text (equal, weighted, availability_based)
 * - priority: integer
 * - created_at: timestamptz
 * 
 * Table: round_robin_members
 * Columns:
 * - id: uuid (PRIMARY KEY)
 * - rule_id: uuid (FOREIGN KEY)
 * - user_id: uuid (FOREIGN KEY to profiles)
 * - weight: integer (for weighted distribution)
 * - max_leads_per_day: integer
 * - is_active: boolean
 * - availability_status: text (available, busy, offline)
 * 
 * Table: lead_assignments
 * Columns:
 * - id: uuid (PRIMARY KEY)
 * - lead_id: uuid (FOREIGN KEY to leads)
 * - assigned_to: uuid (FOREIGN KEY to profiles)
 * - assigned_at: timestamptz
 * - assignment_method: text (round_robin, manual, automatic)
 * - rule_id: uuid (FOREIGN KEY)
 */

interface TeamMember {
  id: string;
  name: string;
  email: string;
  status: "available" | "busy" | "offline";
  leads_assigned_today: number;
  leads_assigned_total: number;
  max_leads_per_day: number;
  weight: number;
  conversion_rate: number;
  avg_response_time: string;
  is_active: boolean;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Emily Rodriguez",
    email: "emily.r@company.com",
    status: "available",
    leads_assigned_today: 12,
    leads_assigned_total: 142,
    max_leads_per_day: 20,
    weight: 3,
    conversion_rate: 19.7,
    avg_response_time: "8 min",
    is_active: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@company.com",
    status: "available",
    leads_assigned_today: 10,
    leads_assigned_total: 128,
    max_leads_per_day: 20,
    weight: 2,
    conversion_rate: 14.1,
    avg_response_time: "12 min",
    is_active: true,
  },
  {
    id: "3",
    name: "James Wilson",
    email: "james.w@company.com",
    status: "busy",
    leads_assigned_today: 18,
    leads_assigned_total: 105,
    max_leads_per_day: 20,
    weight: 2,
    conversion_rate: 14.3,
    avg_response_time: "15 min",
    is_active: true,
  },
  {
    id: "4",
    name: "Sarah Martinez",
    email: "sarah.m@company.com",
    status: "available",
    leads_assigned_today: 8,
    leads_assigned_total: 75,
    max_leads_per_day: 15,
    weight: 1,
    conversion_rate: 12.0,
    avg_response_time: "22 min",
    is_active: true,
  },
  {
    id: "5",
    name: "David Thompson",
    email: "david.t@company.com",
    status: "offline",
    leads_assigned_today: 0,
    leads_assigned_total: 45,
    max_leads_per_day: 15,
    weight: 1,
    conversion_rate: 10.2,
    avg_response_time: "28 min",
    is_active: false,
  },
];

export default function RoundRobinPage() {
  const [distributionType, setDistributionType] = useState<"equal" | "weighted" | "availability">("weighted");
  const [isRoundRobinActive, setIsRoundRobinActive] = useState(true);

  const activeMembers = teamMembers.filter(m => m.is_active && m.status !== "offline");
  const totalLeadsToday = teamMembers.reduce((sum, m) => sum + m.leads_assigned_today, 0);
  const avgConversionRate = (teamMembers.reduce((sum, m) => sum + m.conversion_rate, 0) / teamMembers.length).toFixed(1);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "busy": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "offline": return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <div className="flex flex-col gap-6 layout-padding py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Round Robin Distribution</h1>
          <p className="text-muted-foreground mt-1">
            Automatically distribute leads to your sales team
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="round-robin-toggle">Round Robin</Label>
            <Switch
              id="round-robin-toggle"
              checked={isRoundRobinActive}
              onCheckedChange={setIsRoundRobinActive}
            />
          </div>
          <Button className="gap-2">
            <Settings className="h-4 w-4" />
            Configure Rules
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMembers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Out of {teamMembers.length} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Distributed Today</CardTitle>
            <RotateCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeadsToday}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all team members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgConversionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Team average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distribution Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {isRoundRobinActive ? (
                <>
                  <Play className="h-5 w-5 text-green-500" />
                  Active
                </>
              ) : (
                <>
                  <Pause className="h-5 w-5 text-orange-500" />
                  Paused
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {distributionType === "equal" ? "Equal" : distributionType === "weighted" ? "Weighted" : "Availability-based"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Distribution Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Distribution Method</CardTitle>
          <CardDescription>Choose how leads are distributed to team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            <div
              onClick={() => setDistributionType("equal")}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${distributionType === "equal"
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
                }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4" />
                <h4 className="font-semibold">Equal Distribution</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Each team member receives an equal number of leads in rotation
              </p>
            </div>

            <div
              onClick={() => setDistributionType("weighted")}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${distributionType === "weighted"
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
                }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4" />
                <h4 className="font-semibold">Weighted Distribution</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Distribute based on performance, seniority, or custom weights
              </p>
            </div>

            <div
              onClick={() => setDistributionType("availability")}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${distributionType === "availability"
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
                }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4" />
                <h4 className="font-semibold">Availability-Based</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Only distribute to available members, skip busy or offline
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage team member settings and view assignment stats</CardDescription>
            </div>
            <Button variant="outline" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs ${getStatusBadge(member.status)}`}>
                      <span className="capitalize">{member.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-4 mt-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Today</p>
                      <p className="font-semibold">{member.leads_assigned_today}/{member.max_leads_per_day}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Total Leads</p>
                      <p className="font-semibold">{member.leads_assigned_total}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Weight</p>
                      <p className="font-semibold">×{member.weight}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Conv. Rate</p>
                      <p className="font-semibold text-green-600">{member.conversion_rate}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Response</p>
                      <p className="font-semibold">{member.avg_response_time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={member.is_active}
                        disabled
                      />
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${member.leads_assigned_today >= member.max_leads_per_day
                            ? 'bg-orange-500'
                            : 'bg-primary'
                          }`}
                        style={{ width: `${(member.leads_assigned_today / member.max_leads_per_day) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assignment Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Assignment Rules</CardTitle>
          <CardDescription>Configure when and how leads are automatically assigned</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Business Hours Only</h4>
                <p className="text-sm text-muted-foreground">
                  Leads received outside business hours (9 AM - 6 PM) are queued and distributed the next business day
                </p>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Skip Full Capacity</h4>
                <p className="text-sm text-muted-foreground">
                  Skip team members who have reached their daily lead limit and move to next available member
                </p>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold mb-1">High-Value Lead Priority</h4>
                <p className="text-sm text-muted-foreground">
                  Leads with estimated value over $10,000 are assigned to top performers (highest conversion rate)
                </p>
              </div>
              <Switch checked={false} />
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Geographic Routing</h4>
                <p className="text-sm text-muted-foreground">
                  Assign leads to team members based on their territory or location preferences
                </p>
              </div>
              <Switch checked={true} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
