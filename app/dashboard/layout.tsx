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
        <SidebarInset className="h-full flex-1 pr-px bg-sidebar">
          <div className="h-full rounded-xl border border-border bg-background overflow-y-auto">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
