import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="layout-container mx-auto w-full">
      <AppSidebar />
      <SidebarInset>
        <div className="dashboard-shell w-full border-l border-r border-border">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
