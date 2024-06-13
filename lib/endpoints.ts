const ENDPOINTS = {
    AUTH: {
        LOGIN: "auth/login"
    },
    OWNERS: {
        GET_ALL: "owners"
    },
    FST: {
        TASK_ICONS: {
            GET_ALL: "manage/task-icons",
            CREATE: "manage/task-icons",
            UPDATE: (icon_id: string) => `manage/task-icons/${icon_id}`,
            DELETE: (icon_id: string) => `manage/task-icons/${icon_id}`,
        }
    }
}

export default ENDPOINTS;