import { House, Calendar, ChartColumn, CircleAlert, Map, ArrowLeftFromLine, BellPlus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
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
    url: "#",
    icon: House,
  },
  {
    title: "Calendario",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Estadisticas",
    url: "#",
    icon: ChartColumn,
  },
  {
    title: "Alertas",
    url: "#",
    icon: CircleAlert,
  },
  {
    title: "Crear Viaje",
    url: "#",
    icon: Map,
  },
  {
    title: "Notificaciones",
    url: "#",
    icon: BellPlus,
  },
  {
    title: "Cerrar Sesión",
    url: "#",
    icon: ArrowLeftFromLine,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}