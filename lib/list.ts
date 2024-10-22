import { IMenuLink } from "@/app/(protected)/Nav";
import BrandIcon from "@/components/icons/BrandIcon";
import DashboardIcon from "@/components/icons/DashobardIcon";
import FramematerialIconIcon from "@/components/icons/FramematerialIcon";
import LensDetailsIcon from "@/components/icons/LensDetailsIcon";
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
    icon: DashboardIcon,
    title: "Orders",
    variant: "ghost",
    href: "/orders",
  },
  {
    icon: DashboardIcon,
    title: "Products",
    variant: "ghost",
    href: "/products",
  },
  {
    icon: PowerType,
    title: "Power Types",
    variant: "ghost",
    href: "/power-types",
  },
  {
    icon: LensFeatureIcon,
    title: "Lens Feature",
    variant: "ghost",
    href: "/lens-features",
  },
  {
    icon: LensDetailsIcon,
    title: "Lens  Details",
    variant: "ghost",
    href: "/lens-details",
  },
  {
    icon: FramematerialIconIcon,
    title: "Frame Matarials",
    variant: "ghost",
    href: "/frame-materials",
  },
  {
    icon: BrandIcon,
    title: "Brands",
    variant: "ghost",
    href: "/brands",
  },
  {
    icon: BrandIcon,
    title: "Shapes",
    variant: "ghost",
    href: "/shapes",
  },
  {
    icon: BrandIcon,
    title: "Categories",
    variant: "ghost",
    href: "/categories",
  },
  {
    icon: BrandIcon,
    title: "Colors",
    variant: "ghost",
    href: "/colors",
  },
  {
    icon: BrandIcon,
    title: "Coupon Manager",
    variant: "ghost",
    href: "/coupon-manager",
  },
  {
    icon: BrandIcon,
    title: "Blog Posts",
    variant: "ghost",
    href: "/blog-posts",
  },
  {
    icon: BrandIcon,
    title: "Received Newsletters",
    variant: "ghost",
    href: "/received-newsletters",
  },
  {
    icon: BrandIcon,
    title: "Banner Manager",
    variant: "ghost",
    href: "/banner-manager",
  },
  {
    icon: BrandIcon,
    title: "Users",
    variant: "ghost",
    href: "/users",
  },
  {
    icon: BrandIcon,
    title: "Try At Home",
    variant: "ghost",
    href: "/try-at-home",
  },
  {
    icon: BrandIcon,
    title: "Try At Home",
    variant: "ghost",
    href: "/try-at-home",
  },
  {
    icon: BrandIcon,
    title: "Franchises",
    variant: "ghost",
    href: "/franchises",
  },
  {
    icon: BrandIcon,
    title: "Enquiries",
    variant: "ghost",
    href: "/enquiries",
  },
];
