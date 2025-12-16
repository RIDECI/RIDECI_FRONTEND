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
import { Link, useNavigate, useLocation } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation(); // Hook for active state
  let homeUrl = "/app";

  if (selectedProfile === "conductor") {
    homeUrl = "/app/homeDriver";
  } else if (selectedProfile === "pasajero") {
    homeUrl = "/app/homePassenger";
  } else if (selectedProfile === "acompanante") {
    homeUrl = "/app/homeCompanion";
  }

  // Refactored into Groups
  const menuGroups = [
    {
      label: "Navegación",
      items: [
        {
          title: "Home",
          url: homeUrl,
          icon: House,
        },
        {
          title: "Crear Viaje",
          url: "/app/sectionTravel",
          icon: Map,
        },
      ],
    },
    {
      label: "Gestión",
      items: [
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
          url: "/app/security/reports",
          icon: CircleAlert,
        },
      ],
    },
    {
      label: "Social",
      items: [
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
      ],
    },
    {
      label: "Cuenta",
      items: [
        {
          title: "Perfil",
          url: "/app/profile",
          icon: User,
        },
      ],
    },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className="[&>div]:bg-white/10 [&>div]:backdrop-blur-md border-r border-white/20 h-screen [&>div]:shadow-lg"
    >
      <SidebarHeader className="bg-transparent flex flex-col gap-2 px-4 pt-4 pb-6 border-b border-white/20">
        <div className="flex items-center justify-center w-full group-data-[collapsible=icon]:justify-center">
          <img
            src="/RiiDECI.png"
            alt="Rideci Logo"
            className="h-32 w-auto object-contain drop-shadow-md group-data-[collapsible=icon]:hidden transition-all duration-300"
          />
        </div>
        <div className="flex items-center gap-3 px-3 py-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 shadow-sm hover:bg-white/15 transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-inner">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-white text-sm font-bold tracking-wide">Bienvenido</span>
            <span className="text-white/70 text-xs font-medium capitalize">{selectedProfile || "Usuario"}</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-transparent py-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {menuGroups.map((group) => (
          <SidebarGroup key={group.label} className="pb-2">
            <SidebarGroupLabel className="text-white font-bold text-xs uppercase tracking-widest px-4 mb-2 group-data-[collapsible=icon]:hidden shadow-sm">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2 px-2">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        className={`transition-all duration-200 rounded-xl px-3 py-3 ${isActive
                          ? "bg-white text-[#0B8EF5] shadow-lg scale-[1.02] font-bold"
                          : "text-white hover:bg-white/20 hover:text-white hover:translate-x-1"
                          }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3">
                          <item.icon strokeWidth={2.5} className={`w-5 h-5 ${isActive ? "text-[#0B8EF5]" : "text-white drop-shadow-sm"}`} />
                          <span className={`${isActive ? "font-extrabold" : "font-semibold"}`}>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="bg-transparent border-t border-white/20 py-4 px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-red-100 hover:bg-red-500/20 hover:text-white transition-all rounded-xl px-3 py-3 group"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <ArrowLeftFromLine className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Cerrar Sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
