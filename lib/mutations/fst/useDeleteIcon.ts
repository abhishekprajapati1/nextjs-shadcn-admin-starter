import { useMutation, useQueryClient } from "@tanstack/react-query";
import ENDPOINTS from "@/lib/endpoints";
import api, { RequestError, getErrorMessage } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

const useDeleteIcon = (icon_id: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async () => {
            const res = await api.delete(ENDPOINTS.FST.TASK_ICONS.DELETE(icon_id));
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ENDPOINTS.FST.TASK_ICONS.GET_ALL] });
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

export default useDeleteIcon;
