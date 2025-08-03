import { IGlasses, IGlassTypeData } from "@/lib/types";

export const TOKENS = {
  AUTH_TOKEN: "_rktat",
  REFRESH_TOKEN: "_rktrt",
};

export const PATTERNS = {
  hex_color: /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i,
  mongo_id: /^[0-9a-fA-F]{24}$/,
};

export const PUBLIC_ROUTES = ["/admin", "/admin/login"];

export const NO_FOOTER = ["/admin"];
