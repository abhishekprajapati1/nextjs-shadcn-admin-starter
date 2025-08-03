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

  const hydratedMenus = React.useMemo(() => {
    return sidebarData.menus.map((menu) => {
      // Handle regular menu items
      if (!menu.items) {
        menu.isActive = !!(pathname !== "/"
          ? menu.url === pathname ||
            (menu.url && pathname.startsWith(menu.url) && menu.url !== "/")
          : menu.url === pathname);
        return menu;
      }

      // Handle grouped menu items
      const updatedItems = menu.items.map((item) => {
        item.isActive = !!(pathname !== "/"
          ? item.url === pathname ||
            (item.url && pathname.startsWith(item.url) && item.url !== "/")
          : item.url === pathname);
        return item;
      });

      menu.isActive = updatedItems.some((item) => item.isActive);

      return {
        ...menu,
        items: updatedItems,
      };
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
