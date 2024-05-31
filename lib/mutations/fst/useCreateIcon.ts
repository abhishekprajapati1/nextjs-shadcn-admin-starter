
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ENDPOINTS from "@/lib/endpoints";
import { RequestError, getErrorMessage, multipartApi } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

type UseCreateIconParams = {
    onSuccess?: () => void;
}
const useCreateIcon = (data?: UseCreateIconParams) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const res = await multipartApi.post(ENDPOINTS.FST.TASK_ICONS.CREATE, data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ENDPOINTS.FST.TASK_ICONS.GET_ALL] });
            if (data?.onSuccess) data.onSuccess();
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

export default useCreateIcon;
