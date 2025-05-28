"use client";
import Header from "@/components/navigation/auth-protected/header";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { IWrapper } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const pages = [
  { label: "Profile", path: "" },
  { label: "Settings", path: "settings" },
  { label: "Security", path: "security" },
  { label: "Notifications", path: "notifications" },
];

const ProfileLayout: React.FC<IWrapper> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div>
      <Header title="My Account" subtitle="Manage your account">
        A
      </Header>
      <PageWrapper className="!py-0">
        <div className="flex items-center gap-2">
          {pages.map((page, index) => {
            const isActive = pathname === `/profile/${page.path}`;
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
        <div>{children}</div>
      </PageWrapper>
    </div>
  );
};

export default ProfileLayout;
