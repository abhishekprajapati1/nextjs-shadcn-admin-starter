import { useMutation, useQueryClient } from "@tanstack/react-query";
import ENDPOINTS from "@/lib/endpoints";
import api, { RequestError, getErrorMessage } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import { IFormOption } from "@/lib/types";

type UseUpdateDamageType = {
    id: string;
    onSuccess?: () => void;
}

const useUpdateDamageType = ({ id, onSuccess }: UseUpdateDamageType) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: IFormOption) => {
            const res = await api.patch(ENDPOINTS.WHS.MUTATE_DAMAGE_TYPES(id), data);
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

export default useUpdateDamageType;
