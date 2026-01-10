import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

import { DashboardBreadcrumbs } from './dashboardBreadcrumbs'

export function DashboardHeader() {
  return (
    <header className="flex h-14 items-center gap-3  px-4 md:px-6">
      <SidebarTrigger />

      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />

      <DashboardBreadcrumbs />

      <div className="ml-auto flex items-center gap-2">
        <Button size="sm" variant="outline">
          Export
        </Button>
        <Button size="sm">New</Button>
      </div>
    </header>
  )
}
