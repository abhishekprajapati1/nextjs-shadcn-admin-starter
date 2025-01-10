"use client";
import React from "react";
import { HelpCircle } from "lucide-react";
import { IWrapper } from "@/lib/types";
import { usePathname } from "next/navigation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/admin/Sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const RootLayout: React.FC<IWrapper> = ({ children }) => {
  const completePath = usePathname();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};
export default RootLayout;
