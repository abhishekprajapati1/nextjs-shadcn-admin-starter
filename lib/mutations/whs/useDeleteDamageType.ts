import { useMutation, useQueryClient } from "@tanstack/react-query";
import ENDPOINTS from "@/lib/endpoints";
import api, { RequestError, getErrorMessage } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

type UseDeleteDamageType = {
    onSuccess?: () => void;
}

const useDeleteDamageType = (data?: UseDeleteDamageType) => {
    const { onSuccess } = data || {};
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete(ENDPOINTS.WHS.MUTATE_DAMAGE_TYPES(id));
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ENDPOINTS.WHS.DAMAGE_TYPES] });
            if (onSuccess) onSuccess();
        },
        onError: (err: RequestError) => {
            const message = getErrorMessage(err);
            toast({
                description: message,
                variant: "destructive"
            })
        }
    });
    return mutation;
};

export default useDeleteDamageType;
