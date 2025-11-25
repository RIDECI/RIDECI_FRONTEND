import { House, Calendar, ChartColumn, CircleAlert, Map, ArrowLeftFromLine, BellPlus, User } from "lucide-react"
import { Link } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


const items = [
  {
    title: "Home",
    url: "/home",
    icon: House,
  },
  {
    title: "Calendario",
    url: "/calendario",
    icon: Calendar,
  },
  {
    title: "Estadisticas",
    url: "/statistics",
    icon: ChartColumn,
  },
  {
    title: "Alertas",
    url: "/alertas",
    icon: CircleAlert,
  },
  {
    title: "Crear Viaje",
    url: "/crear-viaje",
    icon: Map,
  },
  {
    title: "Notificaciones",
    url: "/notificaciones",
    icon: BellPlus,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="[&>div]:bg-[#2196F3]/20 backdrop-blur-2xl border-r border-white/20 h-screen [&>div]:shadow-lg">
      <SidebarHeader className="bg-transparent h-16 flex items-center justify-center px-4">
        <div className="flex items-center justify-center group-data-[collapsible=icon]:justify-center">
          <img 
            src="/RidECISidebar.png" 
            alt="Rideci Logo" 
            className="h-10 w-auto object-contain group-data-[collapsible=icon]:h-8"
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-transparent">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white font-semibold">Menú</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="text-white hover:bg-white/20 hover:text-white transition-all">
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-transparent border-t border-white/20">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-white hover:bg-red-600/30 hover:text-white transition-all">
              <a href="#">
                <ArrowLeftFromLine />
                <span>Cerrar Sesión</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}