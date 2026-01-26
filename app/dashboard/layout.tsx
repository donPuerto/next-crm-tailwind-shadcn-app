import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="layout-container mx-auto w-full h-svh bg-sidebar">
      <SidebarProvider className="w-full h-full bg-sidebar p-3">
        <AppSidebar />
        <SidebarInset className="h-full flex-1 flex flex-col pr-[1px] bg-sidebar">
          <div className="flex-1 rounded-xl border border-border bg-sidebar overflow-hidden shadow-sm group-data-[state=expanded]/sidebar:border-l-0">
            <div className="h-full overflow-auto">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
