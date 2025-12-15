// src/modules/administration/AdminLayout.tsx

import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { SidebarProvider, SidebarInset } from "../../components/ui/sidebar";
import AppMainCard from "../../AppMainCard";
import { AdminUsersProvider } from "./contexts/AdminUsersContext";

export default function AdminLayout() {
  return (
    <AdminUsersProvider>
      <SidebarProvider defaultOpen={true}>
        <AdminSidebar />

        <SidebarInset className="bg-transparent">
          <AppMainCard>
            <Outlet />
          </AppMainCard>
        </SidebarInset>
      </SidebarProvider>
    </AdminUsersProvider>
  );
}