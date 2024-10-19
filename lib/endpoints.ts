const ENDPOINTS = {
  AUTH: {
    LOGIN: "auth/login",
    LOGOUT: "auth/logout",
  },
  admin: {
    power_types: {
      fetch_all: (queryString?: string) =>
        `power-types${queryString ? "?" + queryString : ""}`,
      create: "power-types",
      update: (id: string) => `power-types/${id}`,
      delete: (id: string) => `power-types/${id}`,
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
  },
  OWNERS: {
    GET_ALL: (filter: string) =>
      `owners${filter !== "all" ? "?status=" + filter : ""}`,
    VERIFY_ACCOUNT: (owner_id: string) =>
      `owners/verify-account?owner_id=${owner_id}`,
  },
  FST: {
    TASK_ICONS: {
      GET_ALL: "manage/task-icons",
      CREATE: "manage/task-icons",
      UPDATE: (icon_id: string) => `manage/task-icons/${icon_id}`,
      DELETE: (icon_id: string) => `manage/task-icons/${icon_id}`,
    },
  },
  WHS: {
    INJURY_TYPES: "manage/injury-types",
    MUTATE_INJURY_TYPES: (id: string) => `manage/injury-types/${id}`,
    INJURY_LEVELS: "manage/injury-levels",
    MUTATE_INJURY_LEVELS: (id: string) => `manage/injury-levels/${id}`,
    INCIDENT_TYPES: "manage/incident-types",
    MUTATE_INCIDENT_TYPES: (id: string) => `manage/incident-types/${id}`,
    INCIDENT_LEVELS: "manage/incident-levels",
    MUTATE_INCIDENT_LEVELS: (id: string) => `manage/incident-levels/${id}`,
    DAMAGE_TYPES: "manage/damage-types",
    MUTATE_DAMAGE_TYPES: (id: string) => `manage/damage-types/${id}`,
    DAMAGE_LEVELS: "manage/damage-levels",
    MUTATE_DAMAGE_LEVELS: (id: string) => `manage/damage-levels/${id}`,
    WITNESS_TYPES: "manage/witness-types",
    MUTATE_WITNESS_TYPES: (id: string) => `manage/witness-types/${id}`,
    REGIONS: "manage/regions",
    MUTATE_REGIONS: (id: string) => `manage/regions/${id}`,
  },
};

export default ENDPOINTS;
