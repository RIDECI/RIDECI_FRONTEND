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
    <Sidebar collapsible="icon" className="[&>div]:bg-white/10 [&>div]:backdrop-blur-md border-r border-white/20 h-screen [&>div]:shadow-lg">
      <SidebarHeader className="bg-transparent flex flex-col gap-4 px-4 py-6 border-b border-white/20">
        <div className="flex items-center justify-center w-full group-data-[collapsible=icon]:justify-center">
          <img 
            src="/RiiDECI.png" 
            alt="Rideci Logo" 
            className="h-12 w-auto object-contain drop-shadow-md group-data-[collapsible=icon]:hidden"
          />
        </div>
        <div className="flex items-center gap-2 px-2 py-2 bg-white/5 rounded-lg backdrop-blur-sm group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:bg-transparent">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-white text-sm font-medium group-data-[collapsible=icon]:hidden">
            Bienvenido Usuario
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-transparent py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/80 font-semibold text-xs uppercase tracking-wider px-2 mb-5">
            Menú
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="text-white hover:bg-white/20 hover:text-white transition-all hover:scale-[1.02] rounded-lg backdrop-blur-sm hover:shadow-md px-3 py-2"
                  >
                    <Link to={item.url}>
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-transparent border-t border-white/20 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className="text-white hover:bg-red-500/20 hover:text-white transition-all hover:scale-[1.02] rounded-lg backdrop-blur-sm hover:shadow-md border border-transparent hover:border-red-500/30 px-3 py-2"
            >
              <a href="#">
                <ArrowLeftFromLine className="w-5 h-5 mr-3" />
                <span className="font-medium">Cerrar Sesión</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}