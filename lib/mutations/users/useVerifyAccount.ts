import { toast } from "@/components/ui/use-toast";
import api, { RequestError, getErrorMessage } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseVerifyAccount = {
    owner_id: string;
    onSuccess?: () => void;
}

const useVerifyAccount = ({ owner_id, onSuccess }: UseVerifyAccount) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async () => {
            const res = await api.post(ENDPOINTS.OWNERS.VERIFY_ACCOUNT(owner_id));
            return res.data;
        },
        onSuccess: (data) => {
            toast({
                description: data.message
            });
            if (onSuccess) onSuccess();
            queryClient.invalidateQueries({ queryKey: [ENDPOINTS.OWNERS.GET_ALL("")] })
        },
        onError: (error: RequestError) => {
            const message = getErrorMessage(error);
            toast({
                description: message,
                variant: "destructive"
            })
        },
    });
    return mutation;
}

export default useVerifyAccount;