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
import { Badge } from "@/components/ui/badge";
import { 
  Building2,
  Plus,
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Users,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import Link from "next/link";

/*
 * SUPABASE SCHEMA:
 * 
 * Table: companies
 * Columns:
 * - id: uuid (PRIMARY KEY)
 * - name: text (required)
 * - industry: text
 * - website: text
 * - phone: text
 * - email: text
 * - address: text
 * - city: text
 * - state: text
 * - postal_code: text
 * - country: text
 * - employee_count: integer
 * - revenue: numeric
 * - status: text (active, inactive, prospect)
 * - notes: text
 * - created_at: timestamptz
 * - updated_at: timestamptz
 * - created_by: uuid (FOREIGN KEY to profiles)
 * 
 * Relationships:
 * - leads.company_id → companies.id
 * - contacts.company_id → companies.id
 */

interface Company {
  id: string;
  name: string;
  industry: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  employeeCount: number;
  revenue: string;
  status: "active" | "inactive" | "prospect";
  contactCount: number;
  leadCount: number;
  createdAt: string;
}

const companiesData: Company[] = [
  {
    id: "1",
    name: "Smith Property Management",
    industry: "Real Estate",
    website: "www.smithpm.com",
    phone: "+1 (555) 100-2000",
    email: "info@smithpm.com",
    address: "123 Business St",
    city: "London",
    state: "England",
    postalCode: "SW1A 1AA",
    country: "UK",
    employeeCount: 50,
    revenue: "£2.5M",
    status: "active",
    contactCount: 12,
    leadCount: 5,
    createdAt: "2025-11-15",
  },
  {
    id: "2",
    name: "Heritage Builders Ltd",
    industry: "Construction",
    website: "www.heritagebuilders.co.uk",
    phone: "+1 (555) 100-2001",
    email: "contact@heritagebuilders.co.uk",
    address: "456 Industrial Ave",
    city: "Manchester",
    state: "England",
    postalCode: "M1 1AA",
    country: "UK",
    employeeCount: 120,
    revenue: "£5.8M",
    status: "active",
    contactCount: 25,
    leadCount: 8,
    createdAt: "2025-10-20",
  },
  {
    id: "3",
    name: "Green Energy Solutions",
    industry: "Energy",
    website: "www.greenenergy.com",
    phone: "+1 (555) 100-2002",
    email: "info@greenenergy.com",
    address: "789 Eco Park",
    city: "Birmingham",
    state: "England",
    postalCode: "B1 1AA",
    country: "UK",
    employeeCount: 200,
    revenue: "£12.3M",
    status: "active",
    contactCount: 45,
    leadCount: 15,
    createdAt: "2025-09-10",
  },
  {
    id: "4",
    name: "Metro Housing Association",
    industry: "Social Housing",
    website: "www.metrohousing.org",
    phone: "+1 (555) 100-2003",
    email: "admin@metrohousing.org",
    address: "321 Council Rd",
    city: "Leeds",
    state: "England",
    postalCode: "LS1 1AA",
    country: "UK",
    employeeCount: 85,
    revenue: "£3.9M",
    status: "active",
    contactCount: 18,
    leadCount: 3,
    createdAt: "2025-12-01",
  },
  {
    id: "5",
    name: "Apex Commercial Services",
    industry: "Facilities Management",
    website: "www.apexcommercial.com",
    phone: "+1 (555) 100-2004",
    email: "hello@apexcommercial.com",
    address: "654 Service Lane",
    city: "Liverpool",
    state: "England",
    postalCode: "L1 1AA",
    country: "UK",
    employeeCount: 150,
    revenue: "£7.2M",
    status: "prospect",
    contactCount: 8,
    leadCount: 12,
    createdAt: "2026-01-10",
  },
];

export default function CompaniesPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "inactive": return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      case "prospect": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
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
            Company Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const company = row.original;
        return (
          <div>
            <div className="font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              {company.name}
            </div>
            <div className="text-sm text-muted-foreground">{company.industry}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "contact",
      header: "Contact Info",
      cell: ({ row }) => {
        const company = row.original;
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-3 w-3 text-muted-foreground" />
              <span>{company.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <span className="truncate max-w-50">{company.email}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => {
        const company = row.original;
        return (
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="text-sm">
              <div>{company.city}</div>
              <div className="text-muted-foreground">{company.country}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "stats",
      header: "Contacts & Leads",
      cell: ({ row }) => {
        const company = row.original;
        return (
          <div className="space-y-1">
            <div className="text-sm">
              <span className="font-medium">{company.contactCount}</span> contacts
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">{company.leadCount}</span> leads
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "revenue",
      header: "Revenue",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.revenue}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant="outline" className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
  ], []);

  const table = useReactTable({
    data: companiesData,
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
    active: companiesData.filter(c => c.status === "active").length,
    prospects: companiesData.filter(c => c.status === "prospect").length,
    totalContacts: companiesData.reduce((sum, c) => sum + c.contactCount, 0),
  };

  return (
    <div className="flex flex-col gap-6 layout-padding py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground mt-1">
            Manage your company accounts and relationships
          </p>
        </div>
        <Link href="/dashboard/companies/add">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Company
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">All accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Building2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground mt-1">Current clients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prospects</CardTitle>
            <Building2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.prospects}</div>
            <p className="text-xs text-muted-foreground mt-1">Potential clients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContacts}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all companies</p>
          </CardContent>
        </Card>
      </div>

      {/* Companies Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Companies</CardTitle>
              <CardDescription>
                {companiesData.length} companies in your database
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
            </div>
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
                        className="border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
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
                companiesData.length
              )}{" "}
              of {companiesData.length} results
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
