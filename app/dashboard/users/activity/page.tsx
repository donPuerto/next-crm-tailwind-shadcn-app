"use client";

import { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Activity,
  User,
  FileEdit,
  Trash2,
  Plus,
  Eye,
  LogIn,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar
} from "lucide-react";

/*
 * SUPABASE SCHEMA:
 * 
 * Table: activity_logs
 * Columns:
 * - id: uuid (PRIMARY KEY)
 * - user_id: uuid (FOREIGN KEY references profiles.id)
 * - action: text (login, logout, create, update, delete, view)
 * - entity_type: text (user, job, quote, product, inventory)
 * - entity_id: uuid
 * - description: text
 * - ip_address: text
 * - user_agent: text
 * - created_at: timestamptz (DEFAULT now())
 * - metadata: jsonb
 */

type ActivityAction = "login" | "logout" | "create" | "update" | "delete" | "view" | "export";
type EntityType = "user" | "job" | "quote" | "product" | "inventory" | "customer" | "settings";

export interface ActivityLog {
  id: string;
  user_name: string;
  user_role: string;
  action: ActivityAction;
  entity_type: EntityType;
  description: string;
  ip_address: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// Mock data - will be replaced with Supabase query
const activityData: ActivityLog[] = [
  {
    id: "1",
    user_name: "Sarah Johnson",
    user_role: "Admin",
    action: "create",
    entity_type: "user",
    description: "Created new user account for Carlos Martinez",
    ip_address: "192.168.1.100",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    user_name: "Rachel Kim",
    user_role: "Dispatcher",
    action: "update",
    entity_type: "job",
    description: "Updated job #J-2045 - Assigned to Carlos Martinez",
    ip_address: "192.168.1.105",
    timestamp: "15 minutes ago",
  },
  {
    id: "3",
    user_name: "Michael Chen",
    user_role: "Manager",
    action: "create",
    entity_type: "quote",
    description: "Created quote #Q-3421 for Summit Real Estate Group",
    ip_address: "192.168.1.102",
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    user_name: "Emily Rodriguez",
    user_role: "Sales",
    action: "update",
    entity_type: "customer",
    description: "Updated customer information for Wellness Pro Gym",
    ip_address: "192.168.1.103",
    timestamp: "2 hours ago",
  },
  {
    id: "5",
    user_name: "David Park",
    user_role: "Support",
    action: "delete",
    entity_type: "product",
    description: "Deleted discontinued product SKU-4892",
    ip_address: "192.168.1.104",
    timestamp: "3 hours ago",
  },
  {
    id: "6",
    user_name: "Lisa Thompson",
    user_role: "Marketing",
    action: "export",
    entity_type: "customer",
    description: "Exported customer list for Q1 2026 campaign",
    ip_address: "192.168.1.106",
    timestamp: "4 hours ago",
  },
  {
    id: "7",
    user_name: "Carlos Martinez",
    user_role: "Technician",
    action: "login",
    entity_type: "settings",
    description: "Logged in from mobile device",
    ip_address: "10.0.2.45",
    timestamp: "5 hours ago",
  },
  {
    id: "8",
    user_name: "James Wilson",
    user_role: "Project Manager",
    action: "update",
    entity_type: "job",
    description: "Updated job #J-2038 status to Completed",
    ip_address: "192.168.1.107",
    timestamp: "6 hours ago",
  },
  {
    id: "9",
    user_name: "Marcus Johnson",
    user_role: "Technician",
    action: "view",
    entity_type: "inventory",
    description: "Viewed inventory for warehouse #WH-01",
    ip_address: "10.0.2.46",
    timestamp: "8 hours ago",
  },
  {
    id: "10",
    user_name: "Sarah Johnson",
    user_role: "Admin",
    action: "update",
    entity_type: "settings",
    description: "Updated system notification settings",
    ip_address: "192.168.1.100",
    timestamp: "1 day ago",
  },
];

export default function ActivityPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterAction, setFilterAction] = useState<ActivityAction | "all">("all");

  const getActionIcon = (action: ActivityAction) => {
    switch (action) {
      case "login": return <LogIn className="h-4 w-4 text-green-500" />;
      case "logout": return <LogOut className="h-4 w-4 text-gray-500" />;
      case "create": return <Plus className="h-4 w-4 text-blue-500" />;
      case "update": return <FileEdit className="h-4 w-4 text-orange-500" />;
      case "delete": return <Trash2 className="h-4 w-4 text-red-500" />;
      case "view": return <Eye className="h-4 w-4 text-purple-500" />;
      case "export": return <Download className="h-4 w-4 text-cyan-500" />;
    }
  };

  const getActionBadgeColor = (action: ActivityAction) => {
    switch (action) {
      case "login": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "logout": return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      case "create": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "update": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "delete": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "view": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "export": return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20";
    }
  };

  const columns: ColumnDef<ActivityLog>[] = useMemo(() => [
    {
      accessorKey: "user_name",
      header: "User",
      cell: ({ row }) => {
        const log = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">{log.user_name}</div>
              <div className="text-sm text-muted-foreground">{log.user_role}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const action = row.original.action;
        return (
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${getActionBadgeColor(action)}`}>
            {getActionIcon(action)}
            <span className="capitalize">{action}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "entity_type",
      header: "Entity",
      cell: ({ row }) => (
        <div className="capitalize text-sm">{row.original.entity_type}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-sm max-w-md">{row.original.description}</div>
      ),
    },
    {
      accessorKey: "ip_address",
      header: "IP Address",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground font-mono">{row.original.ip_address}</div>
      ),
    },
    {
      accessorKey: "timestamp",
      header: "Time",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">{row.original.timestamp}</div>
      ),
    },
  ], []);

  const filteredData = useMemo(() =>
    filterAction === "all"
      ? activityData
      : activityData.filter(log => log.action === filterAction),
    [filterAction]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  const actionStats = {
    total: activityData.length,
    create: activityData.filter(l => l.action === "create").length,
    update: activityData.filter(l => l.action === "update").length,
    delete: activityData.filter(l => l.action === "delete").length,
    login: activityData.filter(l => l.action === "login").length,
  };

  return (
    <div className="flex flex-col gap-6 layout-padding py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Activity</h1>
          <p className="text-muted-foreground mt-1">
            Monitor all user actions and system events
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Activity Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card
          className="cursor-pointer transition-colors hover:border-primary/50"
          onClick={() => setFilterAction("all")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{actionStats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">All activities</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-colors hover:border-blue-500/50"
          onClick={() => setFilterAction("create")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Created</CardTitle>
            <Plus className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{actionStats.create}</div>
            <p className="text-xs text-muted-foreground mt-1">New records</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-colors hover:border-orange-500/50"
          onClick={() => setFilterAction("update")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Updated</CardTitle>
            <FileEdit className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{actionStats.update}</div>
            <p className="text-xs text-muted-foreground mt-1">Modified</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-colors hover:border-red-500/50"
          onClick={() => setFilterAction("delete")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deleted</CardTitle>
            <Trash2 className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{actionStats.delete}</div>
            <p className="text-xs text-muted-foreground mt-1">Removed</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-colors hover:border-green-500/50"
          onClick={() => setFilterAction("login")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Logins</CardTitle>
            <LogIn className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{actionStats.login}</div>
            <p className="text-xs text-muted-foreground mt-1">Sessions</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Log Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {filterAction === "all" ? "All Activity" : `${filterAction.charAt(0).toUpperCase() + filterAction.slice(1)} Events`}
              </CardTitle>
              <CardDescription>
                Showing {filteredData.length} activity logs
              </CardDescription>
            </div>
            <Input
              placeholder="Search activities..."
              value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("description")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="px-4 py-3 text-left text-sm font-medium">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-4 py-3">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="h-24 text-center text-muted-foreground"
                      >
                        No activity found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                filteredData.length
              )}{" "}
              of {filteredData.length} results
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
