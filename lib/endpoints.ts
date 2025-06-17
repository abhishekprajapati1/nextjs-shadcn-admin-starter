const ENDPOINTS = {
  AUTH: {
    LOGIN: "auth/login",
    LOGOUT: "auth/logout",
    SIGNUP: "auth/signup",
    details: "auth/details",
    verify_email: (token: string) => `/auth/verfiy-email?token=${token}`,
    resend_verification_mail: "auth/resend-verification-link",
    forgot: "auth/forgot",
    reset_password: (token: string) => `auth/reset-password?token=${token}`,
  },
  admin: {
    products: {
      fetch_all: (queryString?: string) =>
        `products${queryString ? "?" + queryString : ""}`,
      fetch_single: (product_id: string) => `products/${product_id}`,
      create: "products",
      update: (id: string) => `products/${id}`,
      delete: (id: string) => `products/${id}`,
      color: {
        update: (product_color_id: string) =>
          `products/colors/${product_color_id}`,
        remove: (product_color_id: string) =>
          `products/colors/${product_color_id}`,
        save_images: (product_color_id: string) =>
          `products/colors/${product_color_id}/images`,
        create: (product_id: string) => `products/${product_id}/colors`,
      },
    },
    articles: {
      fetch_all: (queryString?: string) =>
        `articles${queryString ? "?" + queryString : ""}`,
      create: `articles`,
      fetch_single: (id: string) => `articles/${id}`,
      update: (id?: string) => `articles/${id}`,
      delete: (id?: string) => `articles/${id}`,
    },
    power_types: {
      fetch_all: (queryString?: string) =>
        `power-types${queryString ? "?" + queryString : ""}`,
      create: "power-types",
      update: (id: string) => `power-types/${id}`,
      delete: (id: string) => `power-types/${id}`,
    },
    shapes: {
      fetch_all: (queryString?: string) =>
        `shapes${queryString ? "?" + queryString : ""}`,
      create: "shapes",
      update: (id: string) => `shapes/${id}`,
      delete: (id: string) => `shapes/${id}`,
    },
    lens_features: {
      fetch_all: (queryString?: string) =>
        `lens-features${queryString ? "?" + queryString : ""}`,
      create: "lens-features",
      update: (id: string) => `lens-features/${id}`,
      delete: (id: string) => `lens-features/${id}`,
    },
    lens_details: {
      fetch_all: (queryString?: string) =>
        `lens-details${queryString ? "?" + queryString : ""}`,
      create: "lens-details",
      update: (id: string) => `lens-details/${id}`,
      delete: (id: string) => `lens-details/${id}`,
    },
    frame_materials: {
      fetch_all: (queryString?: string) =>
        `frame-materials${queryString ? "?" + queryString : ""}`,
      create: "frame-materials",
      update: (id: string) => `frame-materials/${id}`,
      delete: (id: string) => `frame-materials/${id}`,
    },
    brands: {
      fetch_all: (queryString?: string) =>
        `brands${queryString ? "?" + queryString : ""}`,
      create: "brands",
      update: (id: string) => `brands/${id}`,
      delete: (id: string) => `brands/${id}`,
    },
    categories: {
      fetch_all: (queryString?: string) =>
        `categories${queryString ? "?" + queryString : ""}`,
      create: "categories",
      update: (id: string) => `categories/${id}`,
      delete: (id: string) => `categories/${id}`,
    },
    banners: {
      fetch_home_page: () => `banners/home`,
      fetch_all: (queryString?: string) =>
        `banners${queryString ? "?" + queryString : ""}`,
      fetch_one: (id: string) => `banners/${id}`,
      create: "banners",
      update: (id: string) => `banners/${id}`,
      update_order: "banners/reorder",
      delete: (id: string) => `banners/${id}`,
      banner_images: {
        create: (banner_id: string) => `banners/${banner_id}/banner-image`,
        delete: (banner_image_id: string) =>
          `banners/banner-images/${banner_image_id}`,
        update: (banner_image_id: string) =>
          `banners/banner-images/${banner_image_id}`,
        update_order: "banners/banner-images/reorder",
      },
    },
    coupon_manager: {
      fetch_all: (queryString?: string) =>
        `coupons${queryString ? "?" + queryString : ""}`,
      create: "coupons",
      update: (id: string) => `coupons/${id}`,
      delete: (id: string) => `coupons/${id}`,
    },
    colors: {
      fetch_all: (queryString?: string) =>
        `colors${queryString ? "?" + queryString : ""}`,
      create: "colors",
      update: (id: string) => `colors/${id}`,
      delete: (id: string) => `colors/${id}`,
    },
  },
  upload: "files",
  remove_file: (file_id: string) => `files/${file_id}`,
  products: {
    shape_starters: "products/shape-starters",
    latest: "products/latest",
    popular: "products/popular",
    featured: "products/featured",
    fetch_single_product: (slug: string) => `products/${slug}/details`,
    category_products: (category_slug: string) =>
      `categories/${category_slug}/products`,
    shape_products: (shape_slug: string) => `shapes/${shape_slug}/products`,
  },
  account: {
    update_details: "account",
    update_password: "account/update-password",
  },
  cart: {
    add_product: `cart`,
    remove_product: (cart_item_id: string) => `cart/${cart_item_id}`,
    fetch_items: "cart",
    coupon: "cart/coupon",
  },

  offers: {
    fetch_all: (queryString?: string) =>
      `coupons/public${queryString ? "?" + queryString : ""}`,
  },
  checkout: {
    from_cart: "orders/cart-checkout",
    fetch_checkout_details: "orders/checkout",
    update_payment_mode: (order_id: string) => `orders/${order_id}/mode`,
    update_order_coupon: (order_id: string) => `orders/${order_id}/coupon`,
  },
  blog: {
    fetch_popular: "articles/popular",
    fetch_published: "articles/published",
  },
};

export default ENDPOINTS;
