"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  FileDown,
  Plus
} from "lucide-react";
import { format } from "date-fns";
import { leadsData, sourceIcons, sourceLabels, type Lead, type LeadSource, type LeadStatus } from "../data";

export default function AllLeadsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterSource, setFilterSource] = useState<LeadSource | "all">("all");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>(() => {
    const today = new Date();
    const sixMonthsAgo = new Date(today);
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return { from: sixMonthsAgo, to: today };
  });

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Source', 'Source Detail', 'Status', 'Priority', 'Assigned To', 'Created Date', 'Last Contacted'];
    
    const rows = filteredData.map(lead => [
      lead.name,
      lead.email,
      lead.phone,
      sourceLabels[lead.source],
      lead.source_detail,
      lead.status,
      lead.priority,
      lead.assigned_to,
      format(new Date(lead.created_at), 'MMM dd, yyyy HH:mm'),
      lead.last_contacted
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const dateStr = format(new Date(), 'yyyy-MM-dd');
    link.setAttribute('href', url);
    link.setAttribute('download', `all_leads_export_${dateStr}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadgeColor = (status: LeadStatus) => {
    switch (status) {
      case "new": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "contacted": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "qualified": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "converted": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "lost": return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "hot": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "warm": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "cold": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const columns: ColumnDef<Lead>[] = useMemo(() => [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0"
          >
            Lead Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const lead = row.original;
        return (
          <div>
            <div className="font-medium">{lead.name}</div>
            <div className="text-sm text-muted-foreground">{lead.email}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "source",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0"
          >
            Source
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const source = row.original.source;
        const SourceIcon = sourceIcons[source];
        return (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <SourceIcon className="h-4 w-4 text-muted-foreground" />
              {sourceLabels[source]}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">{row.original.source_detail}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: "Contact",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-3 w-3 text-muted-foreground" />
          <span>{row.original.phone}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0"
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
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
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const priority = row.original.priority;
        return (
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${getPriorityBadgeColor(priority)}`}>
            <span className="capitalize">{priority}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "assigned_to",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0"
          >
            Assigned To
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-sm">{row.original.assigned_to}</div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        let timeAgo;
        if (diffMins < 60) {
          timeAgo = `${diffMins} min ago`;
        } else if (diffHours < 24) {
          timeAgo = `${diffHours}h ago`;
        } else {
          timeAgo = `${diffDays}d ago`;
        }
        
        return (
          <div className="text-sm text-muted-foreground">
            {timeAgo}
            <div className="text-xs opacity-60">{format(date, "MMM dd, yyyy")}</div>
          </div>
        );
      },
    },
  ], []);

  const filteredData = useMemo(() => {
    let data = filterSource === "all" 
      ? leadsData 
      : leadsData.filter(l => l.source === filterSource);
    
    data = data.filter(lead => {
      const leadDate = new Date(lead.created_at);
      leadDate.setHours(0, 0, 0, 0);
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);
      const toDate = new Date(dateRange.to);
      toDate.setHours(23, 59, 59, 999);
      return leadDate >= fromDate && leadDate <= toDate;
    });
    
    return data;
  }, [filterSource, dateRange]);

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
    total: filteredData.length,
    new: filteredData.filter(l => l.status === "new").length,
    contacted: filteredData.filter(l => l.status === "contacted").length,
    qualified: filteredData.filter(l => l.status === "qualified").length,
    converted: filteredData.filter(l => l.status === "converted").length,
    conversionRate: filteredData.length > 0 
      ? ((filteredData.filter(l => l.status === "converted").length / filteredData.length) * 100).toFixed(1) 
      : "0.0",
  };

  const sourceStats = [
    { source: "website1", count: filteredData.filter(l => l.source === "website1").length },
    { source: "website2", count: filteredData.filter(l => l.source === "website2").length },
    { source: "trade_site", count: filteredData.filter(l => l.source === "trade_site").length },
    { source: "inbound_call", count: filteredData.filter(l => l.source === "inbound_call").length },
    { source: "voicemail", count: filteredData.filter(l => l.source === "voicemail").length },
    { source: "email", count: filteredData.filter(l => l.source === "email").length },
    { source: "facebook_campaign", count: filteredData.filter(l => l.source === "facebook_campaign").length },
    { source: "facebook_messenger", count: filteredData.filter(l => l.source === "facebook_messenger").length },
    { source: "instagram", count: filteredData.filter(l => l.source === "instagram").length },
    { source: "whatsapp", count: filteredData.filter(l => l.source === "whatsapp").length },
  ].sort((a, b) => b.count - a.count);

  return (
    <>
      <header className="flex shrink-0 items-center gap-2 border-b bg-background px-6 py-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/leads">Leads</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>All Leads</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="p-6">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">All Leads</h1>
              <p className="text-muted-foreground mt-1">
                View and manage all leads from all sources
              </p>
            </div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2 min-w-60 justify-start">
                    <CalendarIcon className="h-4 w-4" />
                    {dateRange.from && dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM dd, yyyy")} - {format(dateRange.to, "MMM dd, yyyy")}
                      </>
                    ) : (
                      "Pick a date range"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <div className="flex gap-2 p-3 border-b">
                    <Button variant="outline" size="sm" onClick={() => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      setDateRange({ from: today, to: today });
                    }}>Today</Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      const today = new Date();
                      const weekAgo = new Date(today);
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      setDateRange({ from: weekAgo, to: today });
                    }}>Last 7 Days</Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      const today = new Date();
                      const monthAgo = new Date(today);
                      monthAgo.setDate(monthAgo.getDate() - 30);
                      setDateRange({ from: monthAgo, to: today });
                    }}>Last 30 Days</Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      const today = new Date();
                      const sixMonthsAgo = new Date(today);
                      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                      setDateRange({ from: sixMonthsAgo, to: today });
                    }}>Last 6 Months</Button>
                  </div>
                  <div className="flex">
                    <div className="p-3 border-r">
                      <p className="text-sm font-medium mb-2">From</p>
                      <Calendar mode="single" selected={dateRange.from} onSelect={(date) => date && setDateRange(prev => ({ ...prev, from: date }))} initialFocus />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium mb-2">To</p>
                      <Calendar mode="single" selected={dateRange.to} onSelect={(date) => date && setDateRange(prev => ({ ...prev, to: date }))} initialFocus />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button variant="outline" className="gap-2" onClick={exportToCSV} disabled={filteredData.length === 0}>
                <FileDown className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground mt-1">In date range</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer transition-colors hover:border-blue-500/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Leads</CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.new}</div>
                <p className="text-xs text-muted-foreground mt-1">Awaiting contact</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer transition-colors hover:border-purple-500/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contacted</CardTitle>
                <Phone className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.contacted}</div>
                <p className="text-xs text-muted-foreground mt-1">In progress</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer transition-colors hover:border-orange-500/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Qualified</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.qualified}</div>
                <p className="text-xs text-muted-foreground mt-1">Ready to convert</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.conversionRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">{stats.converted} converted</p>
              </CardContent>
            </Card>
          </div>

          {/* Lead Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Sources</CardTitle>
              <CardDescription>Filter by source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {sourceStats.map(({ source, count }) => {
                  const SourceIcon = sourceIcons[source as LeadSource];
                  const isActive = filterSource === source;
                  return (
                    <div
                      key={source}
                      onClick={() => setFilterSource(isActive ? "all" : source as LeadSource)}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        isActive ? "border-primary bg-primary/5" : "hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-muted">
                        <SourceIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground truncate">{sourceLabels[source as LeadSource]}</p>
                        <p className="text-lg font-bold">{count}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Leads Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {filterSource === "all" ? "All Leads" : `${sourceLabels[filterSource]} Leads`}
                  </CardTitle>
                  <CardDescription>
                    Showing {filteredData.length} lead{filteredData.length !== 1 ? 's' : ''}
                  </CardDescription>
                </div>
                <Input
                  placeholder="Search leads..."
                  value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                  onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
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
                              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <tr key={row.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                            {row.getVisibleCells().map((cell) => (
                              <td key={cell.id} className="px-4 py-3">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                            ))}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                            No leads found.
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
                  {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, filteredData.length)}{" "}
                  of {filteredData.length} results
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
