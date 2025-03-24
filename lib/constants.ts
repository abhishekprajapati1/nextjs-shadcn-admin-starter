import { IGlasses, IGlassTypeData } from "@/lib/types";

export const TOKENS = {
  AUTH_TOKEN: "_akat",
  REFRESH_TOKEN: "_akrt",
};

export const PATTERNS = {
  hex_color: /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i,
  mongo_id: /^[0-9a-fA-F]{24}$/,
};

export const PUBLIC_ROUTES = ["/admin", "/admin/login"];

export const GlassData: IGlasses[] = [
  { src: "images/1 (11).jpeg", title: "Aviator" },
  { src: "images/1 (12).jpeg", title: "Butterfly" },
  { src: "images/1 (13).jpeg", title: "Butterfly eyeglasses " },
  { src: "images/1 (14).jpeg", title: "Cat eye" },
  { src: "images/1 (15).jpeg", title: "Geometric" },
  { src: "images/1 (16).jpeg", title: "Half frame rectangle" },
  { src: "images/1 (17).jpeg", title: "Oval" },
  { src: "images/1 (18).jpeg", title: "Round" },
  { src: "images/1 (19).jpeg", title: "Square" },
  { src: "images/1 (20).jpeg", title: "Wayfarer" },
];

export const GlassTypesData: IGlassTypeData[] = [
  {
    src: "images/sunglasses.png",
    title: "Sun Glasses",
  },
  {
    src: "images/eyeglasses.png",
    title: "Eye Glasses",
  },
  {
    src: "images/ComputerGlasses.png",
    title: "Computer Glasses",
  },
  {
    src: "images/buytoguide.png",
    title: "Buy To Guide",
  },
  {
    src: "images/readingglass.png",
    title: "Reading Glasses",
  },
  {
    src: "images/prescriptionglasses.jpeg",
    title: "Prescription Glasses",
  },
  {
    src: "images/offer99.png",
    title: "Offer 99",
  },
];
