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
  UserPlus, 
  Shield, 
  User as UserIcon, 
  Crown, 
  Mail, 
  Phone,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  Headphones,
  TrendingUp,
  Users,
  Heart,
  Wrench,
  Radio,
  ClipboardList,
  HardHat,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Rocket
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/*
 * EXPANDED CRM MODULES:
 * 
 * 1. JOBS - Field service management
 *    - Job scheduling & dispatch
 *    - Technician assignment
 *    - Time tracking & completion
 *    
 * 2. QUOTES - Estimate & proposal management
 *    - Quote creation & templates
 *    - Approval workflows
 *    - Quote to job conversion
 *    
 * 3. PRODUCTS - Product catalog
 *    - Product library
 *    - Pricing tiers
 *    - Product categories
 *    
 * 4. INVENTORY - Stock management
 *    - Warehouse tracking
 *    - Stock levels & alerts
 *    - Inventory assignments to jobs
 *    
 * 5. SCHEDULING - Calendar & dispatch
 *    - Drag-drop scheduling
 *    - Route optimization
 *    - Availability management
 *    
 * 6. INVOICING - Billing management
 *    - Invoice generation
 *    - Payment tracking
 *    - Integration with accounting
 */

/*
 * SUPABASE SCHEMA:
 * 
 * Table: profiles (extends auth.users)
 * Columns:
 * - id: uuid (PRIMARY KEY, references auth.users.id)
 * - email: text (UNIQUE, NOT NULL)
 * - full_name: text
 * - phone: text
 * - avatar_url: text
 * - role: text (CHECK role IN ('admin', 'manager', 'sales', 'support', 'marketing', 'customer_success', 
 *                             'technician', 'dispatcher', 'project_manager', 'installer'))
 * - status: text (CHECK status IN ('active', 'inactive', 'pending', 'on_field'))
 * - department: text
 * - territory: text (for sales reps)
 * - certification: text (for technicians)
 * - created_at: timestamptz (DEFAULT now())
 * - updated_at: timestamptz (DEFAULT now())
 * - last_active_at: timestamptz
 * - deals_managed: integer (DEFAULT 0)
 * - revenue_generated: numeric (DEFAULT 0)
 * - tickets_resolved: integer (DEFAULT 0) // for support
 * - leads_converted: integer (DEFAULT 0) // for sales
 * - campaigns_managed: integer (DEFAULT 0) // for marketing
 * - jobs_completed: integer (DEFAULT 0) // for technicians
 * - current_location: text // for field workers
 * - metadata: jsonb (for additional custom fields)
 * 
 * Row Level Security (RLS) Policies:
 * - Admins: Full access to all profiles
 * - Managers: Can view/edit their team members
 * - Dispatcher: Can view all field workers and update assignments
 * - Field Workers: Can view all, edit only their own profile and job status
 */

type UserRole = 
  | "admin" 
  | "manager" 
  | "sales" 
  | "support" 
  | "marketing" 
  | "customer_success"
  | "technician"
  | "dispatcher"
  | "project_manager"
  | "installer";

type UserStatus = "active" | "inactive" | "pending" | "on_field";

interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  avatar_url?: string;
  role: UserRole;
  status: UserStatus;
  department: string;
  territory?: string;
  certification?: string;
  last_active_at: string;
  created_at: string;
  
  // Performance metrics
  deals_managed: number;
  revenue_generated: number;
  tickets_resolved: number;
  leads_converted: number;
  campaigns_managed: number;
  jobs_completed: number;
  current_location?: string;
}

// Mock data - will be replaced with: const { data: users } = await supabase.from('profiles').select('*')
const usersData: User[] = [
    {
      id: "1",
      full_name: "Sarah Johnson",
      email: "sarah.j@company.com",
      phone: "+1 (555) 123-4567",
      role: "admin",
      status: "active",
      department: "Executive",
      last_active_at: "2 minutes ago",
      created_at: "2024-01-15",
      deals_managed: 45,
      revenue_generated: 285000,
      tickets_resolved: 0,
      leads_converted: 0,
      campaigns_managed: 0,
      jobs_completed: 0,
    },
    {
      id: "2",
      full_name: "Michael Chen",
      email: "m.chen@company.com",
      phone: "+1 (555) 234-5678",
      role: "manager",
      status: "active",
      department: "Sales",
      territory: "West Coast",
      last_active_at: "15 minutes ago",
      created_at: "2024-02-10",
      deals_managed: 32,
      revenue_generated: 198000,
      tickets_resolved: 0,
      leads_converted: 0,
      campaigns_managed: 0,
      jobs_completed: 0,
    },
    {
      id: "3",
      full_name: "Emily Rodriguez",
      email: "emily.r@company.com",
      phone: "+1 (555) 345-6789",
      role: "sales",
      status: "active",
      department: "Sales",
      territory: "East Coast",
      last_active_at: "1 hour ago",
      created_at: "2024-03-05",
      deals_managed: 28,
      revenue_generated: 167000,
      tickets_resolved: 0,
      leads_converted: 42,
      campaigns_managed: 0,
      jobs_completed: 0,
    },
    {
      id: "4",
      full_name: "David Park",
      email: "d.park@company.com",
      phone: "+1 (555) 456-7890",
      role: "support",
      status: "active",
      department: "Customer Support",
      last_active_at: "30 minutes ago",
      created_at: "2024-03-20",
      deals_managed: 0,
      revenue_generated: 0,
      tickets_resolved: 234,
      leads_converted: 0,
      campaigns_managed: 0,
      jobs_completed: 0,
    },
    {
      id: "5",
      full_name: "Lisa Thompson",
      email: "l.thompson@company.com",
      phone: "+1 (555) 567-8901",
      role: "marketing",
      status: "active",
      department: "Marketing",
      last_active_at: "2 hours ago",
      created_at: "2024-04-01",
      deals_managed: 0,
      revenue_generated: 0,
      tickets_resolved: 0,
      leads_converted: 0,
      campaigns_managed: 18,
      jobs_completed: 0,
    },
    {
      id: "6",
      full_name: "Carlos Martinez",
      email: "c.martinez@company.com",
      phone: "+1 (555) 678-9012",
      role: "technician",
      status: "on_field",
      department: "Field Service",
      certification: "HVAC Master, EPA Certified",
      current_location: "3847 Maple Ave, Austin, TX",
      last_active_at: "10 minutes ago",
      created_at: "2024-04-15",
      deals_managed: 0,
      revenue_generated: 0,
      tickets_resolved: 0,
      leads_converted: 0,
      campaigns_managed: 0,
      jobs_completed: 156,
    },
    {
      id: "7",
      full_name: "Rachel Kim",
      email: "r.kim@company.com",
      phone: "+1 (555) 789-0123",
      role: "dispatcher",
      status: "active",
      department: "Operations",
      last_active_at: "5 minutes ago",
      created_at: "2024-05-01",
      deals_managed: 0,
      revenue_generated: 0,
      tickets_resolved: 0,
      leads_converted: 0,
      campaigns_managed: 0,
      jobs_completed: 0,
    },
    {
      id: "8",
      full_name: "James Wilson",
      email: "j.wilson@company.com",
      phone: "+1 (555) 890-1234",
      role: "project_manager",
      status: "active",
      department: "Operations",
      last_active_at: "1 hour ago",
      created_at: "2024-05-10",
      deals_managed: 24,
      revenue_generated: 425000,
      tickets_resolved: 0,
      leads_converted: 0,
      campaigns_managed: 0,
      jobs_completed: 18,
    },
    {
      id: "9",
      full_name: "Marcus Johnson",
      email: "m.johnson@company.com",
      phone: "+1 (555) 901-2345",
      role: "technician",
      status: "active",
      department: "Field Service",
      certification: "Electrical License, Low Voltage",
      last_active_at: "3 hours ago",
      created_at: "2024-05-20",
      deals_managed: 0,
      revenue_generated: 0,
      tickets_resolved: 0,
      leads_converted: 0,
      campaigns_managed: 0,
      jobs_completed: 89,
    },
    {
      id: "10",
      full_name: "Amanda Foster",
      email: "a.foster@company.com",
      phone: "+1 (555) 012-3456",
      role: "installer",
      status: "on_field",
      department: "Field Service",
      certification: "Solar Installation Certified",
      current_location: "1205 Oak St, Dallas, TX",
      last_active_at: "20 minutes ago",
      created_at: "2024-06-01",
      deals_managed: 0,
      revenue_generated: 0,
      tickets_resolved: 0,
      leads_converted: 0,
      campaigns_managed: 0,
      jobs_completed: 67,
    },
  ];

export default function UsersPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRole, setSelectedRole] = useState<UserRole | "all">("all");

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "admin": return <Crown className="h-4 w-4 text-yellow-500" />;
      case "manager": return <Shield className="h-4 w-4 text-blue-500" />;
      case "sales": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "support": return <Headphones className="h-4 w-4 text-purple-500" />;
      case "marketing": return <Users className="h-4 w-4 text-pink-500" />;
      case "customer_success": return <Heart className="h-4 w-4 text-red-500" />;
      case "technician": return <Wrench className="h-4 w-4 text-orange-500" />;
      case "dispatcher": return <Radio className="h-4 w-4 text-cyan-500" />;
      case "project_manager": return <ClipboardList className="h-4 w-4 text-indigo-500" />;
      case "installer": return <HardHat className="h-4 w-4 text-amber-500" />;
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "admin": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "manager": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "sales": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "support": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "marketing": return "bg-pink-500/10 text-pink-500 border-pink-500/20";
      case "customer_success": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "technician": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "dispatcher": return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20";
      case "project_manager": return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20";
      case "installer": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    }
  };

  const getStatusIcon = (status: UserStatus) => {
    switch (status) {
      case "active": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "inactive": return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending": return <Clock className="h-4 w-4 text-orange-500" />;
      case "on_field": return <MapPin className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusBadgeColor = (status: UserStatus) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "inactive": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "pending": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "on_field": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  // TanStack Table Columns - memoized to prevent recreation
  const columns: ColumnDef<User>[] = useMemo(() => [
    {
      accessorKey: "full_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0"
          >
            User
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {user.full_name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <div className="font-medium">{user.full_name}</div>
              <div className="text-sm text-muted-foreground">{user.department}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Contact",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">{user.phone}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.original.role;
        return (
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${getRoleBadgeColor(role)}`}>
            {getRoleIcon(role)}
            <span className="capitalize">{role.replace('_', ' ')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${getStatusBadgeColor(status)}`}>
            {getStatusIcon(status)}
            <span className="capitalize">{status.replace('_', ' ')}</span>
          </div>
        );
      },
    },
    {
      id: "performance",
      header: "Performance",
      cell: ({ row }) => {
        const user = row.original;
        const isFieldWorker = ["technician", "installer"].includes(user.role);
        const isSales = ["sales", "manager", "customer_success", "project_manager"].includes(user.role);
        const isSupport = user.role === "support";
        const isMarketing = user.role === "marketing";
        const isDispatcher = user.role === "dispatcher";

        return (
          <div className="flex flex-col gap-1">
            {isFieldWorker && (
              <>
                <div className="text-sm">
                  <span className="text-muted-foreground">Jobs:</span> <span className="font-medium">{user.jobs_completed}</span>
                </div>
                {user.current_location && (
                  <div className="text-sm flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-blue-500" />
                    <span className="text-muted-foreground text-xs">{user.current_location}</span>
                  </div>
                )}
              </>
            )}
            {isSales && (
              <>
                <div className="text-sm">
                  <span className="text-muted-foreground">Deals:</span> <span className="font-medium">{user.deals_managed}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Revenue:</span> <span className="font-medium text-green-600">${(user.revenue_generated / 1000).toFixed(0)}k</span>
                </div>
              </>
            )}
            {isSupport && (
              <>
                <div className="text-sm">
                  <span className="text-muted-foreground">Tickets:</span> <span className="font-medium">{user.tickets_resolved}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Avg. Time:</span> <span className="font-medium">2.5h</span>
                </div>
              </>
            )}
            {isMarketing && (
              <>
                <div className="text-sm">
                  <span className="text-muted-foreground">Campaigns:</span> <span className="font-medium">{user.campaigns_managed}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Leads:</span> <span className="font-medium">1,250</span>
                </div>
              </>
            )}
            {isDispatcher && (
              <>
                <div className="text-sm">
                  <span className="text-muted-foreground">Dispatched:</span> <span className="font-medium">156</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">On Field:</span> <span className="font-medium">3</span>
                </div>
              </>
            )}
            {user.role === "admin" && (
              <>
                <div className="text-sm">
                  <span className="text-muted-foreground">Access:</span> <span className="font-medium">Full</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Teams:</span> <span className="font-medium">All</span>
                </div>
              </>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "last_active_at",
      header: "Last Active",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.original.last_active_at}
        </div>
      ),
    },
    {
      id: "actions",
      cell: () => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>User actions</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
  ], []);

  const filteredData = useMemo(() => 
    selectedRole === "all" 
      ? usersData 
      : usersData.filter(u => u.role === selectedRole),
    [selectedRole]
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

  const roleStats = {
    admin: usersData.filter(u => u.role === "admin").length,
    sales: usersData.filter(u => u.role === "sales").length,
    support: usersData.filter(u => u.role === "support").length,
    technician: usersData.filter(u => u.role === "technician").length,
    dispatcher: usersData.filter(u => u.role === "dispatcher").length,
    total: usersData.length,
    field: usersData.filter(u => u.status === "on_field").length,
  };

  return (
    <div className="flex flex-col gap-6 layout-padding py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage team members, roles, and field operations
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Invite User
        </Button>
      </div>

      {/* Role Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="cursor-pointer transition-colors hover:border-primary/50"
          onClick={() => setSelectedRole("all")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleStats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All departments
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer transition-colors hover:border-orange-500/50"
          onClick={() => setSelectedRole("technician")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Technicians</CardTitle>
            <Wrench className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleStats.technician}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Field service
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer transition-colors hover:border-green-500/50"
          onClick={() => setSelectedRole("sales")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Team</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleStats.sales}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Revenue generation
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Field</CardTitle>
            <MapPin className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{roleStats.field}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active jobs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table with TanStack */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {selectedRole === "all" ? "All Users" : `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1).replace('_', ' ')}s`}
              </CardTitle>
              <CardDescription>
                {selectedRole === "all" 
                  ? `Showing all ${filteredData.length} team members`
                  : `${filteredData.length} ${selectedRole.replace('_', ' ')}${filteredData.length !== 1 ? 's' : ''} in your organization`
                }
              </CardDescription>
            </div>
            <Input
              placeholder="Search users..."
              value={(table.getColumn("full_name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("full_name")?.setFilterValue(event.target.value)
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
                        No results.
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

      {/* Module Integration Note */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            Expanded CRM Modules Ready
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-3">
          <div>
            <p className="font-medium text-foreground mb-2">Field Service & Operations:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Jobs:</strong> Field service scheduling, dispatch, and time tracking</li>
              <li><strong>Quotes:</strong> Estimate creation, approval workflows, quote-to-job conversion</li>
              <li><strong>Scheduling:</strong> Drag-drop calendar, route optimization, tech availability</li>
              <li><strong>Invoicing:</strong> Automated billing from completed jobs</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-foreground mb-2">Inventory & Products:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Products:</strong> Service catalog, pricing tiers, product categories</li>
              <li><strong>Inventory:</strong> Stock management, warehouse tracking, job assignments</li>
              <li><strong>Purchase Orders:</strong> Vendor management and procurement</li>
            </ul>
          </div>
          <div className="pt-2 border-t">
            <p className="text-xs">
              <strong>Supabase Integration:</strong> All user data is structured for immediate database integration with RLS policies for role-based access control.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
