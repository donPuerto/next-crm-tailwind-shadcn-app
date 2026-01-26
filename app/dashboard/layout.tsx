import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="dashboard-shell layout-container mx-auto w-full border-l border-r border-border">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
