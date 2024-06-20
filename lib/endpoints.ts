const ENDPOINTS = {
    AUTH: {
        LOGIN: "auth/login",
        LOGOUT: "auth/logout",
    },
    OWNERS: {
        GET_ALL: (filter: string) => `owners${filter !== "all" ? "?status=" + filter : ""}`,
        VERIFY_ACCOUNT: (owner_id: string) => `owners/verify-account?owner_id=${owner_id}`
    },
    FST: {
        TASK_ICONS: {
            GET_ALL: "manage/task-icons",
            CREATE: "manage/task-icons",
            UPDATE: (icon_id: string) => `manage/task-icons/${icon_id}`,
            DELETE: (icon_id: string) => `manage/task-icons/${icon_id}`,
        }
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
    }
}

export default ENDPOINTS;