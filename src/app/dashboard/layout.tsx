
import { AppSidebar } from "@/components/layout/appSidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

import { DashboardHeader } from "./_widgets/dashboardHeader"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
