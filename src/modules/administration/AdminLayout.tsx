// src/modules/administration/AdminLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { SidebarProvider, SidebarInset } from "../../components/ui/sidebar";
import AppMainCard from "../../AppMainCard";

export default function AdminLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />

      <SidebarInset className="bg-transparent">

        <AppMainCard>
          <Outlet />
        </AppMainCard>
      </SidebarInset>
    </SidebarProvider>
  );
}
