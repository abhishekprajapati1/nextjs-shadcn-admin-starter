import { getApiClient, getErrorMessage, RequestError } from "@/lib/api"
import ENDPOINTS from "@/lib/endpoints";
import { toast } from "@/lib/hooks/use-toast";


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

export const logout = async () => {
    try {
        const response = await api.delete("auth/logout");
        const msg = response.data.data?.message;
        toast({ description: msg });
        window.location.reload();
    } catch (error: unknown) {
        const message = getErrorMessage(error as RequestError);
        toast({ description: message, variant: "destructive" });
    }
};