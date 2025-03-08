import React from "react";
import { IWrapper } from "@/lib/types";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/admin/Sidebar";
import { protect } from "@/lib/server";
import GlobalModals from "@/components/GlobalModals";

const RootLayout: React.FC<IWrapper> = async ({ children }) => {
  await protect("/admin/login");
  return (
    <SidebarProvider>
      <GlobalModals />
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};
export default RootLayout;
