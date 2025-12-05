import { Outlet } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppMainCard from './AppMainCard'

export function Layout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="bg-transparent">
        <AppMainCard>
          <Outlet />
        </AppMainCard>
      </SidebarInset>
    </SidebarProvider>
  )
}
