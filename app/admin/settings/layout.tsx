"use client";
import HeaderWrapper from "@/components/navigation/admin/HeaderWrapper";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { IWrapper } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { label: "Tax Settings", path: "tax" },
  { label: "Invoice Settings", path: "invoice" },
  { label: "Notification Settings", path: "notification" },
];

const SettingsLayout: React.FC<IWrapper> = ({ children }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col h-full overflow-auto">
      <HeaderWrapper title="Settings" />
      <div className="flex items-center gap-2"></div>
      <PageWrapper>
        <div className="flex items-center gap-2 flex-shrink-0">
          {pages.map((page, index) => {
            const getFullPath = (path: string) =>
              path ? `/admin/settings/${path}` : "/admin/settings";
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
                <Link href={`/admin/settings/${page.path}`}>{page.label}</Link>
              </Button>
            );
          })}
        </div>
        {children}
      </PageWrapper>
    </div>
  );
};

export default SettingsLayout;
