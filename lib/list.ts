import { IMenuLink } from "@/app/(protected)/Nav";
import DamageIcon from "@/components/icons/DamageIcon";
import DashboardIcon from "@/components/icons/DashobardIcon";
import IncidentIcon from "@/components/icons/IncidentIcon";
import IncidentLevelIcon from "@/components/icons/IncidentLevelIcon";
import InjuryIcon from "@/components/icons/InjuryIcon";
import LenseFeatureIcon from "@/components/icons/LenseFeatureIcon";
import TaskIcon from "@/components/icons/TaskIcon";
import PowerType from "@/components/icons/UsersIcon";
import UsersIcon from "@/components/icons/UsersIcon";
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
    href: "/lense-features",
  },
  {
    icon: PowerType,
    title: "Power Types",
    variant: "ghost",
    href: "/power-types",
  },
  {
    icon: TaskIcon,
    title: "Task Icons",
    variant: "ghost",
    href: "/fst/task-icons",
  },
  {
    icon: IncidentIcon,
    title: "Incident Types",
    variant: "ghost",
    href: "/whs/incident-types",
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
