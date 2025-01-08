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
  const pathname =
    completePath?.split("?")?.length > 0
      ? completePath?.split("?")?.[0]
      : completePath;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 px-6 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex flex-grow items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/support">
              <HelpCircle />
            </Link>
          </Button>
        </header>
        <div className="min-h-[100vh] flex-1 bg-muted/50 md:min-h-min p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default RootLayout;
