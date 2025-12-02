import { Link } from "react-router-dom";
import { House, Calendar, ChartColumn, CircleAlert, Map, ArrowLeftFromLine, BellPlus, Settings } from "lucide-react";

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
} from "../../components/ui/sidebar";

const items = [
  { title: "Inicio", url: "", icon: House },
  { title: "Gestión usuarios", url: "users", icon: Calendar },
  { title: "Estadísticas", url: "statistics", icon: ChartColumn },
  { title: "Reportes", url: "reports", icon: CircleAlert },
  { title: "Monitoreo", url: "monitor", icon: Map },
  { title: "Configuración", url: "settings", icon: Settings },
];

export default function AdminSidebar() {
  const base = "/admin"; 
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
          <SidebarGroupLabel className="text-white font-semibold">Administración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const to = item.url ? `${base}/${item.url.replace(/^\//, "")}` : base;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="text-white hover:bg-white/20 hover:text-white transition-all">
                      <Link to={to}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
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
  );
}
