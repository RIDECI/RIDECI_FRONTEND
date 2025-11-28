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
  SidebarTrigger,
} from "@/components/ui/sidebar"


const items = [
  {
    title: "Home",
    url: "/home",
    icon: House,
  },
  {
    title: "Calendario",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Estadisticas",
    url: "/statistics",
    icon: ChartColumn,
  },
  {
    title: "Alertas",
    url: "/alerts",
    icon: CircleAlert,
  },
  {
    title: "Crear Viaje",
    url: "/sectionTravel",
    icon: Map,
  },
  {
    title: "Notificaciones",
    url: "/notifications",
    icon: BellPlus,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="[&>div]:bg-[#2196F3]/20 backdrop-blur-2xl border-r border-white/20 h-screen [&>div]:shadow-lg">
      <SidebarHeader className="bg-transparent h-16 flex items-center px-4">
        <div className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
          <SidebarTrigger className="text-white hover:bg-white/20" />
          <img 
            src="/RidECISidebar.png" 
            alt="Rideci Logo" 
            className="h-10 w-auto object-contain group-data-[collapsible=icon]:hidden"
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