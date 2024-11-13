import { IMenuLink } from "@/app/(protected)/Nav";
import BannerManagerIcon from "@/components/icons/BannerManagerIcon";
import BlogIcon from "@/components/icons/BlogIcon";
import BrandIcon from "@/components/icons/BrandIcon";
import CategoriesIcon from "@/components/icons/CategoriesIcon";
import ColorsIcon from "@/components/icons/ColorsIcon";
import CouponManagIcon from "@/components/icons/CouponManagerIcon";
import DashboardIcon from "@/components/icons/DashobardIcon";
import EnquiriesIcon from "@/components/icons/EnquiriesIcon";
import FramematerialIconIcon from "@/components/icons/FramematerialIcon";
import FranchisesIcon from "@/components/icons/FranchisesIcon";
import LensDetailsIcon from "@/components/icons/LensDetailsIcon";
import LensFeatureIcon from "@/components/icons/LensFeatureIcon";
import NewslettersIcon from "@/components/icons/NewslettersIcon";
import OrderIcon from "@/components/icons/OrderIcon";
import PowerType from "@/components/icons/PowerTypeIcon";
import ProductIcon from "@/components/icons/ProductIcon";
import ShapeIcon from "@/components/icons/ShapeIcon";
import TryIcon from "@/components/icons/TryIcon";
import UsersIcon from "@/components/icons/UsersIcon";

export const sidebar_menus: IMenuLink[] = [
  {
    icon: DashboardIcon,
    title: "Dashboard",
    variant: "ghost",
    href: "/",
  },
  {
    icon: OrderIcon,
    title: "Orders",
    variant: "ghost",
    href: "/orders",
  },
  {
    icon: ProductIcon,
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
    icon: ShapeIcon,
    title: "Shapes",
    variant: "ghost",
    href: "/shapes",
  },
  {
    icon: CategoriesIcon,
    title: "Categories",
    variant: "ghost",
    href: "/categories",
  },
  {
    icon: ColorsIcon,
    title: "Colors",
    variant: "ghost",
    href: "/colors",
  },
  {
    icon: CouponManagIcon,
    title: "Coupon Manager",
    variant: "ghost",
    href: "/coupon-manager",
  },
  {
    icon: BlogIcon,
    title: "Articles",
    variant: "ghost",
    href: "/articles",
  },
  {
    icon: NewslettersIcon,
    title: "Received Newsletters",
    variant: "ghost",
    href: "/received-newsletters",
  },
  {
    icon: BannerManagerIcon,
    title: "Banner Manager",
    variant: "ghost",
    href: "/banner-manager",
  },
  {
    icon: UsersIcon,
    title: "Users",
    variant: "ghost",
    href: "/users",
  },
  {
    icon: TryIcon,
    title: "Try At Home",
    variant: "ghost",
    href: "/try-at-home",
  },
  {
    icon: FranchisesIcon,
    title: "Franchises",
    variant: "ghost",
    href: "/franchises",
  },
  {
    icon: EnquiriesIcon,
    title: "Enquiries",
    variant: "ghost",
    href: "/enquiries",
  },
];
