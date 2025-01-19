export const TOKENS = {
  AUTH_TOKEN: "_akat",
  REFRESH_TOKEN: "_akrt",
};

export const PATTERNS = {
  hex_color: /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i,
  mongo_id: /^[0-9a-fA-F]{24}$/,
};

export const PUBLIC_ROUTES = [
  "/admin",
  "/admin/login"
]