import ENDPOINTS from "@/lib/endpoints";
import useFetch from "@/lib/hooks/use-fetch";
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

  const { data: user } = useFetch<IUser>({
    endpoint: ENDPOINTS.AUTH.details,
  });

  console.log("user", user);

  const hydratedMenus = React.useMemo(() => {
    return sidebarData.menus.map((menu) => {
      menu.isActive =
        pathname !== "/admin"
          ? menu.url === pathname ||
            (pathname.startsWith(menu.url) && menu.url !== "/admin")
          : menu.url === pathname;
      if (Array.isArray(menu.items)) {
        menu.items = menu.items.map((item) => {
          item.isActive = item.url === pathname;
          return item;
        });
      }
      return menu;
    });
  }, [pathname]);

  React.useEffect(() => {
    setData((data) => ({
      ...data,
      menus: hydratedMenus,
    }));
  }, [hydratedMenus]);

  React.useEffect(() => {
    setData((data) => ({
      ...data,
      user: {
        name: user?.name || "Unknown",
        email: user?.email || "unknown@example.com",
        phone_number: user?.phone_number || "",
        ...(user?.avatar && { avatar: user.avatar }),
      },
    }));
  }, [user]);

  return data;
};
