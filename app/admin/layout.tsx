import React from "react";
import { IWrapper } from "@/lib/types";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/admin/Sidebar";
import { protect } from "@/lib/server";

const RootLayout: React.FC<IWrapper> = async ({ children }) => {
  await protect("/admin/login");
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};
export default RootLayout;
