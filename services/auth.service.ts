import { getApiClient } from "@/lib/api"
import ENDPOINTS from "@/lib/endpoints";


const api = getApiClient();

export const getDetails = async (token?: string) => {
    try {
        const response = await api.get(ENDPOINTS.AUTH.details, {
            ...(token && {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }),
        });
        return response.data;
    } catch (error) {
        return null;
    }
}