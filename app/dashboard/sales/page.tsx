import { Icon } from "@/components/ui/icon";

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
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 border-r border-border bg-card p-4 md:block">
          <div className="mb-6 flex items-center gap-2">
            <Icon name="Sparkles" size={18} className="text-foreground" />
            <span className="text-sm font-semibold">Acme Inc.</span>
          </div>
          <button className="mb-4 w-full rounded bg-primary px-3 py-2 text-sm text-primary-foreground">
            Quick Create
          </button>
          <nav className="space-y-1 text-sm">
            <a className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted" href="#">
              <Icon name="LayoutDashboard" size={16} /> Dashboard
            </a>
            <a className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted" href="#">
              <Icon name="Layers" size={16} /> Lifecycle
            </a>
            <a className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted" href="#">
              <Icon name="PieChart" size={16} /> Analytics
            </a>
            <a className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted" href="#">
              <Icon name="Folder" size={16} /> Projects
            </a>
            <a className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted" href="#">
              <Icon name="Users" size={16} /> Team
            </a>
          </nav>
          <div className="mt-6 text-xs text-muted-foreground">Documents</div>
          <nav className="mt-2 space-y-1 text-sm">
            <a className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted" href="#">
              <Icon name="Database" size={16} /> Data Library
            </a>
            <a className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted" href="#">
              <Icon name="FileText" size={16} /> Reports
            </a>
            <a className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted" href="#">
              <Icon name="PenSquare" size={16} /> Word Assistant
            </a>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="FileText" size={18} className="text-muted-foreground" />
              <h1 className="text-lg font-semibold">Documents</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded border border-border bg-background px-3 py-1 text-xs">Last 3 months</button>
              <button className="rounded border border-border bg-background px-3 py-1 text-xs">Last 30 days</button>
              <button className="rounded border border-border bg-background px-3 py-1 text-xs">Last 7 days</button>
            </div>
          </div>

          <section className="grid gap-4 md:grid-cols-4">
            {kpis.map((kpi) => (
              <div key={kpi.title} className="rounded-lg border border-border bg-card p-4">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{kpi.title}</span>
                  <span className="rounded bg-muted px-2 py-0.5 text-[10px] text-foreground">{kpi.delta}</span>
                </div>
                <div className="text-2xl font-semibold">{kpi.value}</div>
                <div className="mt-2 text-xs text-muted-foreground">{kpi.note}</div>
              </div>
            ))}
          </section>

          <section className="mt-6 rounded-lg border border-border bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">Total Visitors</h2>
                <p className="text-xs text-muted-foreground">Total for the last 3 months</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded border border-border bg-background px-3 py-1 text-xs">Last 3 months</button>
                <button className="rounded border border-border bg-background px-3 py-1 text-xs">Last 30 days</button>
                <button className="rounded border border-border bg-background px-3 py-1 text-xs">Last 7 days</button>
              </div>
            </div>
            <div className="h-48 w-full rounded-md border border-border bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />
          </section>

          <section className="mt-6 rounded-lg border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded bg-muted px-2 py-0.5 text-foreground">Outline</span>
              <span>Past Performance</span>
              <span>Key Personnel</span>
              <span>Focus Documents</span>
            </div>
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
          </section>
        </main>
      </div>
    </div>
  );
}
