const ENDPOINTS = {
    AUTH: {
        LOGIN: "auth/login"
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
        INJURY_TYPES: "manage/injury-types"
    }
}

export default ENDPOINTS;