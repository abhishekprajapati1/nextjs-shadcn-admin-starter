import { sidebarData } from "@/lib/list";
import { ISidebarBrand, IUser, MenuItem } from "@/lib/types";
import { usePathname } from "next/navigation";
import React from "react";

interface ISidebarData {
  user: IUser | null;
  brand: ISidebarBrand;
  menus: MenuItem[];
}

export const useSidebarData = (): ISidebarData => {
  const [data, setData] = React.useState<ISidebarData>(sidebarData);
  const completePath = usePathname();
  const pathname =
    completePath?.split("?")?.length > 0
      ? completePath?.split("?")[0]
      : completePath;

  const hydratedMenus = React.useMemo(() => {
    return data.menus.map((menu) => {
      menu.isActive =
        pathname !== "/"
          ? menu.url === pathname ||
            (pathname.startsWith(menu.url) && menu.url !== "/")
          : menu.url === pathname;
      if (Array.isArray(menu.items)) {
        menu.items = menu.items.map((item) => {
          item.isActive = item.url === pathname;
          return item;
        });
      }
      return menu;
    });
  }, [pathname, data.menus]);

  React.useEffect(() => {
    setData({
      ...data,
      menus: hydratedMenus,
    });
  }, [hydratedMenus, data]);

  React.useEffect(() => {
    setData({
      ...data,
      user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: {
          url: "/avatars/shadcn.jpg",
        },
      },
    });
  }, [data]);

  return data;
};
