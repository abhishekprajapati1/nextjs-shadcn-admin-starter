import { IMenuLink } from "@/app/(protected)/Nav";
import DamageIcon from "@/components/icons/DamageIcon";
import IncidentIcon from "@/components/icons/IncidentIcon";
import IncidentLevelIcon from "@/components/icons/IncidentLevelIcon";
import InjuryIcon from "@/components/icons/InjuryIcon";
import TaskIcon from "@/components/icons/TaskIcon";
import UsersIcon from "@/components/icons/UsersIcon";

export const sidebar_menus: IMenuLink[] = [
    {
        icon: UsersIcon,
        title: "Users",
        variant: "ghost",
        href: "/users",
    },
    {
        icon: TaskIcon,
        title: "Task Icons",
        variant: "ghost",
        href: "/fst/task-icons"
    },
    {
        icon: IncidentIcon,
        title: "Incident Types",
        variant: "ghost",
        href: "/whs/incident-types"
    },
    {
        icon: IncidentLevelIcon,
        title: "Incident Levels",
        variant: "ghost",
        href: "/whs/incident-levels"
    },
    {
        icon: InjuryIcon,
        title: "Injury Types",
        variant: "ghost",
        href: "/whs/injury-types"
    },
    {
        icon: InjuryIcon,
        title: "Injury Levels",
        variant: "ghost",
        href: "/whs/injury-levels"
    },
    {
        icon: DamageIcon,
        title: "Damage Types",
        variant: "ghost",
        href: "/whs/damage-types"
    },
    {
        icon: DamageIcon,
        title: "Damage Levels",
        variant: "ghost",
        href: "/whs/damage-levels"
    },
]