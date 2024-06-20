import { useMutation, useQueryClient } from "@tanstack/react-query";
import ENDPOINTS from "@/lib/endpoints";
import api, { RequestError, getErrorMessage } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import { IFormOption } from "@/lib/types";

type UseCreateInjuryLevel = {
    onSuccess?: () => void;
}

const useCreateInjuryLevel = ({ onSuccess }: UseCreateInjuryLevel) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: IFormOption) => {
            const res = await api.post(ENDPOINTS.WHS.INJURY_LEVELS, data);
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

export default useCreateInjuryLevel;
