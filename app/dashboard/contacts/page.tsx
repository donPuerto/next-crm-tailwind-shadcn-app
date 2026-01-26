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
  Mail,
  Phone,
  MapPin,
  Building2,
  Star,
  Tag,
  Filter,
  Download,
  MoreVertical,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Users,
  TrendingUp,
  DollarSign,
  Calendar
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/*
 * SUPABASE SCHEMA:
 * 
 * Table: contacts
 * Columns:
 * - id: uuid (PRIMARY KEY)
 * - first_name: text
 * - last_name: text
 * - email: text (UNIQUE)
 * - phone: text
 * - company_id: uuid (FOREIGN KEY)
 * - address: text
 * - city: text
 * - state: text
 * - zip: text
 * - type: text (lead, customer, partner)
 * - status: text (active, inactive, cold, hot, warm)
 * - tags: text[] (array of tag names)
 * - assigned_to: uuid (FOREIGN KEY to profiles)
 * - last_contact: timestamptz
 * - lifetime_value: numeric
 * - created_at: timestamptz
 * - metadata: jsonb
 */

type ContactType = "lead" | "customer" | "partner";
type ContactStatus = "active" | "inactive" | "cold" | "hot" | "warm";

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  state: string;
  type: ContactType;
  status: ContactStatus;
  tags: string[];
  assigned_to: string;
  last_contact: string;
  lifetime_value: number;
  deals_count: number;
}

// Mock data
const contactsData: Contact[] = [
  {
    id: "1",
    first_name: "Robert",
    last_name: "Anderson",
    email: "robert.a@summitrealestate.com",
    phone: "+1 (555) 101-2001",
    company: "Summit Real Estate Group",
    address: "1500 Summit Ave",
    city: "Austin",
    state: "TX",
    type: "customer",
    status: "active",
    tags: ["VIP", "Real Estate"],
    assigned_to: "Emily Rodriguez",
    last_contact: "2 days ago",
    lifetime_value: 125000,
    deals_count: 3,
  },
  {
    id: "2",
    first_name: "Jennifer",
    last_name: "Martinez",
    email: "j.martinez@wellnesspro.com",
    phone: "+1 (555) 102-2002",
    company: "Wellness Pro Gym",
    address: "890 Fitness Blvd",
    city: "Dallas",
    state: "TX",
    type: "customer",
    status: "hot",
    tags: ["Fitness", "Priority"],
    assigned_to: "Michael Chen",
    last_contact: "1 week ago",
    lifetime_value: 45000,
    deals_count: 2,
  },
  {
    id: "3",
    first_name: "David",
    last_name: "Thompson",
    email: "d.thompson@localdentalcare.com",
    phone: "+1 (555) 103-2003",
    company: "Local Dental Care",
    address: "456 Health St",
    city: "Houston",
    state: "TX",
    type: "lead",
    status: "warm",
    tags: ["Healthcare", "New Lead"],
    assigned_to: "Emily Rodriguez",
    last_contact: "3 days ago",
    lifetime_value: 0,
    deals_count: 0,
  },
  {
    id: "4",
    first_name: "Sarah",
    last_name: "Williams",
    email: "s.williams@automaxdealership.com",
    phone: "+1 (555) 104-2004",
    company: "AutoMax Dealership",
    address: "2100 Auto Plaza",
    city: "San Antonio",
    state: "TX",
    type: "customer",
    status: "active",
    tags: ["Automotive", "High Value"],
    assigned_to: "Michael Chen",
    last_contact: "5 days ago",
    lifetime_value: 89000,
    deals_count: 4,
  },
  {
    id: "5",
    first_name: "Michael",
    last_name: "Brown",
    email: "m.brown@homeservicesplus.com",
    phone: "+1 (555) 105-2005",
    company: "Home Services Plus",
    address: "750 Service Dr",
    city: "Austin",
    state: "TX",
    type: "partner",
    status: "active",
    tags: ["Partner", "Home Services"],
    assigned_to: "James Wilson",
    last_contact: "1 day ago",
    lifetime_value: 156000,
    deals_count: 8,
  },
  {
    id: "6",
    first_name: "Emily",
    last_name: "Davis",
    email: "e.davis@techstartup.com",
    phone: "+1 (555) 106-2006",
    company: "Tech Startup Inc",
    address: "300 Innovation Way",
    city: "Austin",
    state: "TX",
    type: "lead",
    status: "hot",
    tags: ["Technology", "Startup"],
    assigned_to: "Emily Rodriguez",
    last_contact: "Today",
    lifetime_value: 0,
    deals_count: 0,
  },
  {
    id: "7",
    first_name: "Christopher",
    last_name: "Garcia",
    email: "c.garcia@fooddistributors.com",
    phone: "+1 (555) 107-2007",
    company: "Food Distributors LLC",
    address: "1800 Commerce Pkwy",
    city: "Dallas",
    state: "TX",
    type: "customer",
    status: "active",
    tags: ["Food & Beverage", "Wholesale"],
    assigned_to: "Michael Chen",
    last_contact: "4 days ago",
    lifetime_value: 67000,
    deals_count: 5,
  },
  {
    id: "8",
    first_name: "Amanda",
    last_name: "Rodriguez",
    email: "a.rodriguez@lawfirm.com",
    phone: "+1 (555) 108-2008",
    company: "Rodriguez Law Firm",
    address: "500 Legal Center",
    city: "Houston",
    state: "TX",
    type: "lead",
    status: "cold",
    tags: ["Legal", "Professional Services"],
    assigned_to: "Emily Rodriguez",
    last_contact: "2 weeks ago",
    lifetime_value: 0,
    deals_count: 0,
  },
];

export default function ContactsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterType, setFilterType] = useState<ContactType | "all">("all");

  const getStatusBadgeColor = (status: ContactStatus) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "inactive": return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      case "hot": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "warm": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "cold": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  const getTypeBadgeColor = (type: ContactType) => {
    switch (type) {
      case "lead": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "customer": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "partner": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  const columns: ColumnDef<Contact>[] = useMemo(() => [
    {
      accessorKey: "first_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0"
          >
            Contact
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const contact = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {contact.first_name[0]}{contact.last_name[0]}
              </span>
            </div>
            <div>
              <div className="font-medium">{contact.first_name} {contact.last_name}</div>
              <div className="text-sm text-muted-foreground">{contact.company}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Contact Info",
      cell: ({ row }) => {
        const contact = row.original;
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">{contact.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">{contact.phone}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.original.type;
        return (
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${getTypeBadgeColor(type)}`}>
            <span className="capitalize">{type}</span>
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
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => {
        const tags = row.original.tags;
        return (
          <div className="flex gap-1 flex-wrap">
            {tags.slice(0, 2).map((tag, i) => (
              <div key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted text-xs">
                <Tag className="h-3 w-3" />
                {tag}
              </div>
            ))}
            {tags.length > 2 && (
              <span className="text-xs text-muted-foreground">+{tags.length - 2}</span>
            )}
          </div>
        );
      },
    },
    {
      id: "performance",
      header: "Performance",
      cell: ({ row }) => {
        const contact = row.original;
        return (
          <div className="flex flex-col gap-1">
            <div className="text-sm">
              <span className="text-muted-foreground">Deals:</span> <span className="font-medium">{contact.deals_count}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">LTV:</span> <span className="font-medium text-green-600">${(contact.lifetime_value / 1000).toFixed(0)}k</span>
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
              <p>Contact actions</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
  ], []);

  const filteredData = useMemo(() => 
    filterType === "all" 
      ? contactsData 
      : contactsData.filter(c => c.type === filterType),
    [filterType]
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
    total: contactsData.length,
    leads: contactsData.filter(c => c.type === "lead").length,
    customers: contactsData.filter(c => c.type === "customer").length,
    partners: contactsData.filter(c => c.type === "partner").length,
    totalValue: contactsData.reduce((sum, c) => sum + c.lifetime_value, 0),
  };

  return (
    <div className="flex flex-col gap-6 layout-padding py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Contacts</h1>
          <p className="text-muted-foreground mt-1">
            Manage your contacts, leads, and customers
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="cursor-pointer transition-colors hover:border-primary/50"
          onClick={() => setFilterType("all")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">All types</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer transition-colors hover:border-purple-500/50"
          onClick={() => setFilterType("lead")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.leads}</div>
            <p className="text-xs text-muted-foreground mt-1">Potential customers</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer transition-colors hover:border-green-500/50"
          onClick={() => setFilterType("customer")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Star className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.customers}</div>
            <p className="text-xs text-muted-foreground mt-1">Active customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total LTV</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(stats.totalValue / 1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground mt-1">Lifetime value</p>
          </CardContent>
        </Card>
      </div>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {filterType === "all" ? "All Contacts" : `${filterType.charAt(0).toUpperCase() + filterType.slice(1)}s`}
              </CardTitle>
              <CardDescription>
                Showing {filteredData.length} contact{filteredData.length !== 1 ? 's' : ''}
              </CardDescription>
            </div>
            <Input
              placeholder="Search contacts..."
              value={(table.getColumn("first_name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("first_name")?.setFilterValue(event.target.value)
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
                        No contacts found.
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
