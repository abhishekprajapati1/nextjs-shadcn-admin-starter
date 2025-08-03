import { ISidebarBrand, IUser, MenuItem } from "./types";
import {
  Box,
  LayoutDashboard,
  MapPinHouse,
  Rss,
  ShoppingCart,
  SunMedium,
  Tag,
  Ungroup,
  Users,
  UsersRound,
  View,
} from "lucide-react";

export const sidebarData: {
  user: IUser | null;
  brand: ISidebarBrand;
  menus: MenuItem[];
} = {
  user: null,
  brand: {
    name: "Rakritech",
    logo: Ungroup,
    website: {
      url:
        process.env.ENVIRONMENT === "production"
          ? "https://rakritech.com/"
          : "http://localhost:3000/",
      label: "visit website",
    },
  },
  menus: [
    {
      icon: LayoutDashboard,
      title: "Dashboard",
      url: "/",
    },
    {
      icon: UsersRound,
      title: "Users",
      url: "/users",
    },
    {
      icon: Tag,
      title: "Marketing",
      items: [
        {
          icon: Tag,
          title: "Sub Menu 3",
          url: "/sub-menu-3",
        },
        {
          icon: Rss,
          title: "Sub Menu 4",
          url: "/sub-menu-4",
        },
      ],
    },
    {
      icon: UsersRound,
      title: "Users & Services",
      items: [
        {
          icon: UsersRound,
          title: "Users",
          url: "/users",
        },
        {
          icon: MapPinHouse,
          title: "Services",
          url: "/services",
        },
      ],
    },
  ],
};
