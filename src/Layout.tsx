import { Outlet } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppMainCard from './AppMainCard'

export function Layout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="bg-transparent">
        <header className="flex h-16 shrink-0 items-center justify-end gap-2 px-4 bg-[#2196F3]/20 backdrop-blur-2xl shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-white text-sm">Bienvenido Usuario</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white text-sm">
              U
            </div>
          </div>
        </header>
        <AppMainCard>
          <Outlet />
        </AppMainCard>
      </SidebarInset>
    </SidebarProvider>
  )
}
