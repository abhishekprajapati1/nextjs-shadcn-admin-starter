import { IMenuLink } from "@/app/(protected)/Nav";
import DashboardIcon from "@/components/icons/DashobardIcon";
import LenseFeatureIcon from "@/components/icons/LenseFeatureIcon";
import PowerType from "@/components/icons/PowerTypeIcon";

export const sidebar_menus: IMenuLink[] = [
  {
    icon: DashboardIcon,
    title: "Dashboard",
    variant: "ghost",
    href: "/",
  },
  {
    icon: LenseFeatureIcon,
    title: "Lense Feature",
    variant: "ghost",
    href: "/lense-features",
  },
  {
    icon: PowerType,
    title: "Power Types",
    variant: "ghost",
    href: "/power-types",
  },
  {
    icon: PowerType,
    title: "Power Types",
    variant: "ghost",
    href: "/power-types",
  },
];
