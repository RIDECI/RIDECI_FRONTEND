// src/modules/administration/AdminSidebar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { House, Calendar, ChartColumn, CircleAlert, Map, ArrowLeftFromLine, Settings } from "lucide-react";
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

// IMPORTA el logo aquí si lo tienes en src/assets
// import logo from "../../assets/RiiDECI.png";

const base = "/app/admin";
const items = [
  { title: "Inicio", url: "", icon: House },
  { title: "Gestión usuarios", url: "users", icon: Calendar },
  { title: "Estadísticas", url: "statistics", icon: ChartColumn },
  { title: "Reportes", url: "reports", icon: CircleAlert },
  { title: "Monitoreo", url: "monitor", icon: Map },
  { title: "Configuración", url: "settings", icon: Settings },
];

export default function AdminSidebar() {
  return (
    <Sidebar collapsible="icon" className="[&>div]:bg-white/10 [&>div]:backdrop-blur-md border-r border-white/20 h-screen [&>div]:shadow-lg">
      <SidebarHeader className="bg-transparent flex flex-col gap-4 px-4 py-6 border-b border-white/20">
        <div className="flex items-center justify-center w-full group-data-[collapsible=icon]:justify-center">
          {/* Si importaste logo usar src={logo}, si no usar la ruta pública */}
          <img
            src="/RiiDECI.png"
            alt="Rideci Logo"
            className="h-12 w-auto object-contain drop-shadow-md group-data-[collapsible=icon]:hidden"
          />
        </div>

        <div className="flex items-center gap-2 px-2 py-2 bg-white/5 rounded-lg backdrop-blur-sm group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:bg-transparent">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="3"/><path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg>
          </div>
          <span className="text-white text-sm font-medium group-data-[collapsible=icon]:hidden">
            Panel administrador
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-transparent py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/80 font-semibold text-xs uppercase tracking-wider px-2 mb-5">
            Administración
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-5">
              {items.map((item) => {
                const to = item.url ? `${base}/${item.url.replace(/^\//, "")}` : base;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="text-white hover:bg-white/20 hover:text-white transition-all hover:scale-[1.02] rounded-lg backdrop-blur-sm hover:shadow-md px-3 py-2"
                    >
                      <Link to={to}>
                        <item.icon className="w-5 h-5 mr-3" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-transparent border-t border-white/20 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-white hover:bg-red-500/20 hover:text-white transition-all hover:scale-[1.02] rounded-lg backdrop-blur-sm hover:shadow-md border border-transparent hover:border-red-500/30 px-3 py-2"
              onClick={() => {
                localStorage.clear();
                globalThis.location.href = "/login";
              }}
            >
              <ArrowLeftFromLine className="w-5 h-5 mr-3" />
              <span className="font-medium">Cerrar Sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
