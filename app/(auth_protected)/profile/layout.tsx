"use client";
import Header from "@/components/navigation/auth-protected/header";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { IWrapper } from "@/lib/types";
import { cn } from "@/lib/utils";
import { logout } from "@/services/auth.service";
import { SwitchIcon } from "@radix-ui/react-icons";
import { PowerIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const pages = [
  { label: "Profile", path: "" },
  { label: "Security", path: "security" },
  // { label: "Settings", path: "settings" },
  // { label: "Notifications", path: "notifications" },
];

const ProfileLayout: React.FC<IWrapper> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col py-4">
      <Header
        title="My Account"
        subtitle="Manage your account"
        className="flex-shrink-0"
      >
        <div className="h-full">
          <Button
            title="Logout"
            variant="ghost"
            size="icon"
            onClick={() => logout()}
          >
            <PowerIcon />
          </Button>
        </div>
      </Header>
      <PageWrapper className="!py-0 flex-grow flex flex-col gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          {pages.map((page, index) => {
            const getFullPath = (path: string) =>
              path ? `/profile/${path}` : "/profile";
            const isActive = pathname === getFullPath(page.path);
            console.log("see this", isActive, page.path, pathname);
            return (
              <Button
                className={cn(
                  "rounded-3xl hover:bg-foreground hover:text-background animate-smooth",
                )}
                key={index}
                variant={isActive ? "default" : "secondary"}
                asChild
              >
                <Link href={`/profile/${page.path}`}>{page.label}</Link>
              </Button>
            );
          })}
        </div>
        <div className="flex-grow">{children}</div>
      </PageWrapper>
    </div>
  );
};

export default ProfileLayout;
