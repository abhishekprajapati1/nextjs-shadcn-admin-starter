import { useMutation, useQueryClient } from "@tanstack/react-query";
import ENDPOINTS from "@/lib/endpoints";
import api, { RequestError, getErrorMessage } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

type UseDeleteInjuryLevel = {
    onSuccess?: () => void;
}

const useDeleteInjuryLevel = (data?: UseDeleteInjuryLevel) => {
    const { onSuccess } = data || {};
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete(ENDPOINTS.WHS.MUTATE_INJURY_LEVELS(id));
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ENDPOINTS.WHS.INJURY_LEVELS] });
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

export default useDeleteInjuryLevel;
