import {
  House,
  Calendar,
  ChartColumn,
  CircleAlert,
  Map,
  ArrowLeftFromLine,
  BellPlus,
  User,
  MessageCircleMore,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const selectedProfile = localStorage.getItem("selectedProfile");
  let homeUrl = "/app";

  if (selectedProfile === "conductor") {
    homeUrl = "/app/homeDriver";
  } else if (selectedProfile === "pasajero") {
    homeUrl = "/app/homePassenger";
  } else if (selectedProfile === "acompanante") {
    homeUrl = "/app/homeCompanion";
  }

  const items = [
    {
      title: "Home",
      url: homeUrl,
      icon: House,
    },
    {
      title: "Perfil",
      url: "/app/selectProfile",
      icon: User,
    },
    {
      title: "Calendario",
      url: "/app/calendar",
      icon: Calendar,
    },
    {
      title: "Estadisticas",
      url: "/app/statistics",
      icon: ChartColumn,
    },
    {
      title: "Alertas",
      url: "/app/alerts",
      icon: CircleAlert,
    },
    {
      title: "Crear Viaje",
      url: "/app/sectionTravel",
      icon: Map,
    },
    {
      title: "Notificaciones",
      url: "/app/notifications",
      icon: BellPlus,
    },
    {
      title: "Conversaciones",
      url: "/app/conversations",
      icon: MessageCircleMore,
    },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className="[&>div]:bg-white/10 [&>div]:backdrop-blur-md border-r border-white/20 h-screen [&>div]:shadow-lg"
    >
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
