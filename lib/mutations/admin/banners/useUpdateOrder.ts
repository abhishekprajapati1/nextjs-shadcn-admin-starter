import { toast } from "@/lib/hooks/use-toast";
import { RequestError, getApiClient, getErrorMessage } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { useAppDispatch } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type UpdateOrderPayload = {
  new_orders: {
    id: string;
    order: number;
  }[];
};
const useUpdateOrder = (forBannerImage = false, onSuccess?: () => void) => {
  const api = getApiClient();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: UpdateOrderPayload) => {
      const res = await api.patch(
        forBannerImage
          ? ENDPOINTS.admin.banners.banner_images.update_order
          : ENDPOINTS.admin.banners.update_order,
        data,
      );
      return res.data;
    },
    onSuccess: (_data) => {
      if (onSuccess) onSuccess();
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
    onError: (error: RequestError) => {
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        description: message,
      });
    },
  });
  return mutation;
};

export default useUpdateOrder;
