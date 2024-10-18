import { IMenuLink } from "@/app/(protected)/Nav";
import DashboardIcon from "@/components/icons/DashobardIcon";
import LensDetails from "@/components/icons/Lens-details";
import LensFeatureIcon from "@/components/icons/LensFeatureIcon";
import PowerType from "@/components/icons/PowerTypeIcon";

export const sidebar_menus: IMenuLink[] = [
  {
    icon: DashboardIcon,
    title: "Dashboard",
    variant: "ghost",
    href: "/",
  },
  {
    icon: LensFeatureIcon,
    title: "Lens Feature",
    variant: "ghost",
    href: "/lens-features",
  },
  {
    icon: PowerType,
    title: "Power Types",
    variant: "ghost",
    href: "/power-types",
  },
  {
    icon: LensDetails,
    title: "Lens  Details",
    variant: "ghost",
    href: "/lens-detail",
  },
];
