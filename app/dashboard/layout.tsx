import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="layout-container mx-auto w-full h-svh bg-sidebar">
      <SidebarProvider className="w-full h-full bg-sidebar p-3">
        <AppSidebar />
        <SidebarInset className="h-full flex-1 flex flex-col pr-px bg-sidebar overflow-hidden relative">
          <DashboardNavbar />
          <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6 mb-16 rounded-xl border border-border pb-20">
            {children}
          </main>
          <DashboardFooter />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
