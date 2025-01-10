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
import { ISidebarBrand, IUser, MenuItem } from "./types";
import {
  Box,
  Diamond,
  Eye,
  GalleryVerticalEnd,
  Glasses,
  Handshake,
  HashIcon,
  Headset,
  LayoutDashboard,
  LucideDiamond,
  MapPin,
  MapPinHouse,
  Newspaper,
  Palette,
  Rss,
  ScanText,
  Shapes,
  ShoppingCart,
  Skull,
  SquareStack,
  SunMedium,
  Tag,
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
    name: "Akku Ka Chasma",
    logo: Glasses,
    website: {
      url: "https://akkukachasma.com/",
      label: "visit website",
    },
  },
  menus: [
    {
      icon: LayoutDashboard,
      title: "Dashboard",
      url: "/admin",
    },
    {
      icon: Box,
      title: "Orders",
      url: "/admin/orders",
    },
    {
      icon: ShoppingCart,
      title: "Products",
      url: "/admin/products",
    },
    {
      icon: SunMedium,
      title: "Power Types",
      url: "/admin/power-types",
    },
    {
      icon: View,
      title: "Lense Features",
      url: "/admin/lens-features",
    },
    {
      icon: ScanText,
      title: "Lens Details",
      url: "/admin/lens-details",
    },
    {
      icon: Shapes,
      title: "Frame Matarials",
      url: "/admin/frame-materials",
    },
    {
      icon: Diamond,
      title: "Brands",
      url: "/admin/brands",
    },
    {
      icon: Skull,
      title: "Shapes",
      url: "/admin/shapes",
    },
    {
      icon: SquareStack,
      title: "Categories",
      url: "/admin/categories",
    },
    {
      icon: Palette,
      title: "Colors",
      url: "/admin/colors",
    },
    {
      icon: Tag,
      title: "Coupon Manager",
      url: "/admin/coupon-manager",
    },
    {
      icon: Rss,
      title: "Articles",
      url: "/admin/articles",
    },
    {
      icon: Newspaper,
      title: "Newsletters",
      url: "/admin/received-newsletters",
    },
    {
      icon: GalleryVerticalEnd,
      title: "Banner Manager",
      url: "/admin/banner-manager",
    },
    {
      icon: UsersRound,
      title: "Users",
      url: "/admin/users",
    },
    {
      icon: MapPinHouse,
      title: "Try At Home",
      url: "/admin/try-at-home",
    },
    {
      icon: Handshake,
      title: "Franchises",
      url: "/admin/franchises",
    },
    {
      icon: Headset,
      title: "Enquiries",
      url: "/admin/enquiries",
    },
  ],
};
