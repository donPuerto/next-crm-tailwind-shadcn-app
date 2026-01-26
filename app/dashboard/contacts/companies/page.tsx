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
  Building2,
  Plus,
  Mail,
  Phone,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  Download,
  MoreVertical,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Briefcase
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/*
 * SUPABASE SCHEMA:
 * 
 * Table: companies
 * Columns:
 * - id: uuid (PRIMARY KEY)
 * - name: text
 * - industry: text
 * - website: text
 * - email: text
 * - phone: text
 * - address: text
 * - city: text
 * - state: text
 * - zip: text
 * - employee_count: integer
 * - annual_revenue: numeric
 * - status: text (prospect, customer, partner, inactive)
 * - primary_contact_id: uuid (FOREIGN KEY to contacts)
 * - assigned_to: uuid (FOREIGN KEY to profiles)
 * - contacts_count: integer
 * - deals_count: integer
 * - total_value: numeric
 * - created_at: timestamptz
 * - metadata: jsonb
 */

type CompanyStatus = "prospect" | "customer" | "partner" | "inactive";

interface Company {
  id: string;
  name: string;
  industry: string;
  website: string;
  email: string;
  phone: string;
  location: string;
  status: CompanyStatus;
  employee_count: string;
  annual_revenue: number;
  contacts_count: number;
  deals_count: number;
  total_value: number;
  assigned_to: string;
}

const companiesData: Company[] = [
  {
    id: "1",
    name: "Summit Real Estate Group",
    industry: "Real Estate",
    website: "summitrealestate.com",
    email: "info@summitrealestate.com",
    phone: "+1 (555) 100-1000",
    location: "Austin, TX",
    status: "customer",
    employee_count: "50-100",
    annual_revenue: 15000000,
    contacts_count: 8,
    deals_count: 5,
    total_value: 425000,
    assigned_to: "Emily Rodriguez",
  },
  {
    id: "2",
    name: "TechStart Innovations Inc",
    industry: "Technology",
    website: "techstart.io",
    email: "hello@techstart.io",
    phone: "+1 (555) 100-2000",
    location: "Austin, TX",
    status: "prospect",
    employee_count: "10-50",
    annual_revenue: 5000000,
    contacts_count: 3,
    deals_count: 1,
    total_value: 0,
    assigned_to: "Michael Chen",
  },
  {
    id: "3",
    name: "Wellness Pro Gym Network",
    industry: "Health & Fitness",
    website: "wellnesspro.com",
    email: "corporate@wellnesspro.com",
    phone: "+1 (555) 100-3000",
    location: "Dallas, TX",
    status: "customer",
    employee_count: "100-500",
    annual_revenue: 12000000,
    contacts_count: 12,
    deals_count: 8,
    total_value: 680000,
    assigned_to: "Michael Chen",
  },
  {
    id: "4",
    name: "AutoMax Dealership Group",
    industry: "Automotive",
    website: "automaxdealers.com",
    email: "info@automaxdealers.com",
    phone: "+1 (555) 100-4000",
    location: "San Antonio, TX",
    status: "customer",
    employee_count: "500+",
    annual_revenue: 45000000,
    contacts_count: 15,
    deals_count: 12,
    total_value: 1250000,
    assigned_to: "James Wilson",
  },
  {
    id: "5",
    name: "Food Distributors LLC",
    industry: "Food & Beverage",
    website: "fooddist.com",
    email: "sales@fooddist.com",
    phone: "+1 (555) 100-5000",
    location: "Dallas, TX",
    status: "customer",
    employee_count: "100-500",
    annual_revenue: 28000000,
    contacts_count: 10,
    deals_count: 7,
    total_value: 890000,
    assigned_to: "Emily Rodriguez",
  },
  {
    id: "6",
    name: "Rodriguez Law Firm",
    industry: "Legal Services",
    website: "rodriguezlaw.com",
    email: "contact@rodriguezlaw.com",
    phone: "+1 (555) 100-6000",
    location: "Houston, TX",
    status: "prospect",
    employee_count: "10-50",
    annual_revenue: 3000000,
    contacts_count: 2,
    deals_count: 0,
    total_value: 0,
    assigned_to: "Michael Chen",
  },
  {
    id: "7",
    name: "Home Services Plus",
    industry: "Home Services",
    website: "homeservicesplus.com",
    email: "info@homeservicesplus.com",
    phone: "+1 (555) 100-7000",
    location: "Austin, TX",
    status: "partner",
    employee_count: "50-100",
    annual_revenue: 8000000,
    contacts_count: 6,
    deals_count: 15,
    total_value: 1560000,
    assigned_to: "James Wilson",
  },
];

export default function CompaniesPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterStatus, setFilterStatus] = useState<CompanyStatus | "all">("all");

  const getStatusBadgeColor = (status: CompanyStatus) => {
    switch (status) {
      case "customer": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "prospect": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "partner": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "inactive": return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const columns: ColumnDef<Company>[] = useMemo(() => [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0"
          >
            Company
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const company = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">{company.name}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                {company.industry}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "contact_info",
      header: "Contact Info",
      cell: ({ row }) => {
        const company = row.original;
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">{company.website}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">{company.email}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span>{row.original.location}</span>
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
            <span className="capitalize">{status}</span>
          </div>
        );
      },
    },
    {
      id: "size",
      header: "Company Size",
      cell: ({ row }) => {
        const company = row.original;
        return (
          <div className="flex flex-col gap-1">
            <div className="text-sm">
              <span className="text-muted-foreground">Employees:</span> <span className="font-medium">{company.employee_count}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Revenue:</span> <span className="font-medium">${(company.annual_revenue / 1000000).toFixed(1)}M</span>
            </div>
          </div>
        );
      },
    },
    {
      id: "metrics",
      header: "Metrics",
      cell: ({ row }) => {
        const company = row.original;
        return (
          <div className="flex flex-col gap-1">
            <div className="text-sm">
              <span className="text-muted-foreground">Contacts:</span> <span className="font-medium">{company.contacts_count}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Deals:</span> <span className="font-medium">{company.deals_count}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Value:</span> <span className="font-medium text-green-600">${(company.total_value / 1000).toFixed(0)}k</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "assigned_to",
      header: "Assigned To",
      cell: ({ row }) => (
        <div className="text-sm">{row.original.assigned_to}</div>
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
              <p>Company actions</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
  ], []);

  const filteredData = useMemo(() => 
    filterStatus === "all" 
      ? companiesData 
      : companiesData.filter(c => c.status === filterStatus),
    [filterStatus]
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

  const stats = {
    total: companiesData.length,
    customers: companiesData.filter(c => c.status === "customer").length,
    prospects: companiesData.filter(c => c.status === "prospect").length,
    partners: companiesData.filter(c => c.status === "partner").length,
    totalValue: companiesData.reduce((sum, c) => sum + c.total_value, 0),
  };

  return (
    <div className="flex flex-col gap-6 layout-padding py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground mt-1">
            Manage your business relationships and accounts
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Company
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="cursor-pointer transition-colors hover:border-primary/50"
          onClick={() => setFilterStatus("all")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">All accounts</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer transition-colors hover:border-green-500/50"
          onClick={() => setFilterStatus("customer")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.customers}</div>
            <p className="text-xs text-muted-foreground mt-1">Active customers</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer transition-colors hover:border-purple-500/50"
          onClick={() => setFilterStatus("prospect")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prospects</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.prospects}</div>
            <p className="text-xs text-muted-foreground mt-1">Potential customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(stats.totalValue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground mt-1">Deal value</p>
          </CardContent>
        </Card>
      </div>

      {/* Companies Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {filterStatus === "all" ? "All Companies" : `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}s`}
              </CardTitle>
              <CardDescription>
                Showing {filteredData.length} compan{filteredData.length !== 1 ? 'ies' : 'y'}
              </CardDescription>
            </div>
            <Input
              placeholder="Search companies..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
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
                        No companies found.
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
