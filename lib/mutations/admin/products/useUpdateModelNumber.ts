import { toast } from "@/lib/hooks/use-toast";
import { RequestError, getApiClient, getErrorMessage } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const useUpdateModelNumber = (
  product_color_id: string,
  onSuccess?: () => void,
) => {
  const api = getApiClient();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: Partial<{ model_number: number }>) => {
      const res = await api.post(
        ENDPOINTS.admin.products.color.update_model_number(product_color_id),
        data,
      );
      return res.data;
    },
    onSuccess: (_data) => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ["products"] });
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

export default useUpdateModelNumber;
