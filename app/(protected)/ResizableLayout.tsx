"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IWrapper } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";
import { setCookie } from "cookies-next";
import { Nav } from "./Nav";
import { sidebar_menus } from "@/lib/list";
import HospoTribeIcon from "@/components/icons/HospoTribeIcon";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import LogoutIcon from "@/components/icons/LogoutIcon";
import { logout } from "@/lib/api";

interface ResizableLayoutProps extends IWrapper {
  defaultCollapsed?: boolean;
  sidebarDefaultSize: number;
}

const ResizableLayout: React.FC<ResizableLayoutProps> = ({
  children,
  defaultCollapsed,
  sidebarDefaultSize,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full items-stretch overflow-auto"
      >
        <ResizablePanel
          defaultSize={sidebarDefaultSize}
          collapsedSize={4}
          collapsible
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            setCookie("react-resizable-panels:collapsed", JSON.stringify(true));
          }}
          onExpand={() => {
            setIsCollapsed(false);
            setCookie(
              "react-resizable-panels:collapsed",
              JSON.stringify(false)
            );
          }}
          className={cn(
            "flex flex-col",
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex flex-shrink-0 h-16 items-center",
              isCollapsed ? "justify-center" : "px-5"
            )}
          >
            <strong>
              {isCollapsed ? (
                <HospoTribeIcon className="size-6" />
              ) : (
                "HospoTribe"
              )}
            </strong>
          </div>
          <div className="flex-grow">
            <Separator />
            <Nav isCollapsed={Boolean(isCollapsed)} links={sidebar_menus} />
          </div>

          <div className="flex-shrink-0">
            <Separator />
            <div className={cn("py-2", Boolean(isCollapsed) ? "grid place-content-center" : "px-5")}>
              {Boolean(isCollapsed) && (
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button onClick={() => logout()} size="icon" className="">
                      <LogoutIcon />
                      <span className="sr-only">Logout</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                  >
                    Logout
                  </TooltipContent>
                </Tooltip>
              )}
              {!Boolean(isCollapsed) && (
                <Button className="gap-2 w-full" onClick={() => logout()}>
                  <LogoutIcon />
                  <span>Logout</span>
                </Button>
              )}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          className="overflow-auto h-full w-full"
          style={{ overflow: "auto" }}
        >
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default ResizableLayout;
