import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const kpis = [
  { title: "Total Revenue", value: "$1,250.00", delta: "+12.5%", note: "Trending up this month" },
  { title: "New Customers", value: "1,234", delta: "-20%", note: "Acquisition needs attention" },
  { title: "Active Accounts", value: "45,678", delta: "+12.5%", note: "Strong user retention" },
  { title: "Growth Rate", value: "4.5%", delta: "+4.5%", note: "Steady performance" }
];

const tableRows = [
  { section: "Cover page", type: "Cover", target: 18, limit: 5, reviewer: "Eddie Lake" },
  { section: "Overview", type: "Summary", target: 12, limit: 3, reviewer: "Avery Holt" },
  { section: "Budget", type: "Finance", target: 24, limit: 6, reviewer: "Sofia Reed" },
  { section: "Forecast", type: "Model", target: 16, limit: 4, reviewer: "Kai Morgan" }
];

export default function SalesDashboard() {
  return (
    <>
      <header className="layout-padding flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex w-full items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Sales</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="layout-padding w-full flex-1 pb-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="FileText" size={18} className="text-muted-foreground" />
            <h1 className="text-lg font-semibold">Documents</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="xs">Last 3 months</Button>
            <Button variant="outline" size="xs">Last 30 days</Button>
            <Button variant="outline" size="xs">Last 7 days</Button>
          </div>
        </div>

          <section className="grid gap-4 md:grid-cols-4">
            {kpis.map((kpi) => (
              <Card key={kpi.title} className="gap-0">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{kpi.title}</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="rounded bg-muted px-2 py-0.5 text-[10px] text-foreground">{kpi.delta}</span>
                      </TooltipTrigger>
                      <TooltipContent>Compared to previous period</TooltipContent>
                    </Tooltip>
                  </div>
                  <CardTitle className="text-2xl font-semibold">{kpi.value}</CardTitle>
                  <CardDescription className="text-xs">{kpi.note}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </section>

          <section className="mt-6">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm">Total Visitors</CardTitle>
                  <CardDescription>Total for the last 3 months</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="xs">Last 3 months</Button>
                  <Button variant="outline" size="xs">Last 30 days</Button>
                  <Button variant="outline" size="xs">Last 7 days</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-48 w-full rounded-md border border-border bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />
              </CardContent>
            </Card>
          </section>

          <section className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Button variant="secondary" size="xs">Outline</Button>
                  <span>Past Performance</span>
                  <span>Key Personnel</span>
                  <span>Focus Documents</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-md border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted text-xs text-muted-foreground">
                      <tr>
                        <th className="px-3 py-2 text-left">Header</th>
                        <th className="px-3 py-2 text-left">Section Type</th>
                        <th className="px-3 py-2 text-left">Target</th>
                        <th className="px-3 py-2 text-left">Limit</th>
                        <th className="px-3 py-2 text-left">Reviewer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map((row) => (
                        <tr key={row.section} className="border-t border-border">
                          <td className="px-3 py-2">{row.section}</td>
                          <td className="px-3 py-2 text-xs text-muted-foreground">{row.type}</td>
                          <td className="px-3 py-2">{row.target}</td>
                          <td className="px-3 py-2">{row.limit}</td>
                          <td className="px-3 py-2">{row.reviewer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>
      </main>
    </>
  );
}
