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
  Star,
  Tag,
  Download,
  MoreVertical,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Users,
  TrendingUp,
  DollarSign,
  Search
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DUMMY_CONTACTS, DUMMY_OPPORTUNITIES, type Contact, type ContactType, type ContactStatus } from "@/lib/constants/dummy-data";

// Data is now imported from @/lib/constants/dummy-data
const contactsData = DUMMY_CONTACTS;

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
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getTypeBadgeColor = (type: ContactType) => {
    switch (type) {
      case "lead": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "customer": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "partner": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const columns: ColumnDef<Contact>[] = useMemo(() => [
    {
      accessorKey: "firstName",
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
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium text-primary">
                {contact.firstName?.[0]}{contact.lastName?.[0]}
              </span>
            </div>
            <div className="min-w-0">
              <div className="font-medium truncate">{contact.firstName} {contact.lastName}</div>
              <div className="text-sm text-muted-foreground truncate">{contact.company}</div>
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
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-3 w-3 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground truncate">{contact.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-3 w-3 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground truncate">{contact.mobile}</span>
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
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${getTypeBadgeColor(type || "lead")}`}>
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
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${getStatusBadgeColor(status || "active")}`}>
            <span className="capitalize">{status}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => {
        const tags = row.original.tags || [];
        return (
          <div className="flex gap-1 flex-wrap">
            {tags.slice(0, 2).map((tag, i) => (
              <div key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted text-xs whitespace-nowrap">
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
        const contactOpportunities = DUMMY_OPPORTUNITIES.filter(o => o.contactId === contact.id);
        const totalValue = contactOpportunities.reduce((sum, o) => sum + o.value, 0);

        return (
          <div className="flex flex-col gap-1">
            <div className="text-sm">
              <span className="text-muted-foreground">Opportunities:</span> <span className="font-medium">{contactOpportunities.length}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Value:</span> <span className="font-medium text-green-600">${(totalValue / 1000).toFixed(1)}k</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "assigned_to",
      header: "Assigned To",
      cell: ({ row }) => (
        <div className="text-sm truncate">{row.original.assigned_to}</div>
      ),
    },
    {
      id: "actions",
      cell: () => (
        <TooltipProvider h-box-not-needed>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
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
    totalValue: DUMMY_OPPORTUNITIES.reduce((sum, o) => sum + o.value, 0),
  };

  return (
    <div className="flex flex-col gap-6 layout-padding py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight">All Contacts</h1>
          <p className="text-muted-foreground mt-1 truncate">
            Manage your contacts, leads, and customers
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" className="gap-2 hidden sm:flex border-input">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 shadow-sm">
            <UserPlus className="h-4 w-4" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          className="cursor-pointer transition-all hover:border-primary/50 shadow-sm hover:shadow-md"
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
          className="cursor-pointer transition-all hover:border-purple-500/50 shadow-sm hover:shadow-md"
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
          className="cursor-pointer transition-all hover:border-green-500/50 shadow-sm hover:shadow-md"
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

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total LTV</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(stats.totalValue / 1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground mt-1 text-green-600 font-medium">Revenue generated</p>
          </CardContent>
        </Card>
      </div>

      {/* Contacts Table */}
      <Card className="shadow-sm border-none bg-muted/20 sm:bg-background sm:border">
        <CardHeader className="px-4 py-6 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl">
                {filterType === "all" ? "All Contacts" : `${filterType.charAt(0).toUpperCase() + filterType.slice(1)}s`}
              </CardTitle>
              <CardDescription>
                Showing {filteredData.length} contact{filteredData.length !== 1 ? 's' : ''}
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("firstName")?.setFilterValue(event.target.value)
                }
                className="pl-9 bg-background border-input"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <div className="bg-background sm:rounded-md border-y sm:border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/30">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="px-4 py-4 text-left font-semibold text-muted-foreground whitespace-nowrap">
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
                <tbody className="divide-y">
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-muted/30 transition-colors group cursor-pointer"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-4 py-4 align-middle">
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
                        className="h-32 text-center text-muted-foreground italic"
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-6 sm:px-0 sm:pt-6">
            <div className="text-sm text-muted-foreground font-medium order-2 sm:order-1">
              Showing <span className="text-foreground">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{" "}
              <span className="text-foreground">{Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                filteredData.length
              )}</span>{" "}
              of <span className="text-foreground font-bold">{filteredData.length}</span> results
            </div>
            <div className="flex items-center gap-2 order-1 sm:order-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="flex-1 sm:flex-none border-input h-9 px-4"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="flex-1 sm:flex-none border-input h-9 px-4"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
