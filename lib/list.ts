import { IMenuLink } from "@/app/(protected)/Nav";
import DamageIcon from "@/components/icons/DamageIcon";
import DashboardIcon from "@/components/icons/DashobardIcon";
import Productdetail from "@/components/icons/ProductDeatailIcon";
import IncidentIcon from "@/components/icons/ProductDeatailIcon";
import IncidentLevelIcon from "@/components/icons/IncidentLevelIcon";
import InjuryIcon from "@/components/icons/InjuryIcon";
import LenseFeatureIcon from "@/components/icons/LenseFeatureIcon";
import PlacedOrder from "@/components/icons/placed-orderIcon";
import TaskIcon from "@/components/icons/placed-orderIcon";
import PowerType from "@/components/icons/power-typeIcon";
import UsersIcon from "@/components/icons/power-typeIcon";
import WitnessIcon from "@/components/icons/WitnessIcon";

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
    href: "/lense-feature",
  },
  {
    icon: PowerType,
    title: "Power-types",
    variant: "ghost",
    href: "/power-types",
  },
  {
    icon: PlacedOrder,
    title: "Placed order",
    variant: "ghost",
    href: "/placed-order",
  },
  {
    icon: Productdetail,
    title: "Product Deatils",
    variant: "ghost",
    href: "/product-detail",
  },
  {
    icon: IncidentLevelIcon,
    title: "Incident Levels",
    variant: "ghost",
    href: "/whs/incident-levels",
  },
  {
    icon: InjuryIcon,
    title: "Injury Types",
    variant: "ghost",
    href: "/whs/injury-types",
  },
  {
    icon: InjuryIcon,
    title: "Injury Levels",
    variant: "ghost",
    href: "/whs/injury-levels",
  },
  {
    icon: WitnessIcon,
    title: "Witness Types",
    variant: "ghost",
    href: "/whs/witness-types",
  },
  {
    icon: DamageIcon,
    title: "Damage Types",
    variant: "ghost",
    href: "/whs/damage-types",
  },
  {
    icon: DamageIcon,
    title: "Damage Levels",
    variant: "ghost",
    href: "/whs/damage-levels",
  },
  {
    icon: DamageIcon,
    title: "Regions",
    variant: "ghost",
    href: "/regions",
  },
];
