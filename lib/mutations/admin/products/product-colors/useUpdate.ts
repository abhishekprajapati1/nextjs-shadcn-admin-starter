import { toast } from "@/lib/hooks/use-toast";
import { RequestError, getApiClient, getErrorMessage } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { productColorSchema } from "@/lib/validations/admin/product.validation";
import { useAppSelector } from "@/store";

const useUpdate = (onSuccess?: () => void) => {
  const api = getApiClient();
  const queryClient = useQueryClient();
  const storedData = useAppSelector(
    (store) => store.productStore.productColorStore.data,
  );
  const mutation = useMutation({
    mutationFn: async (data: Partial<z.infer<typeof productColorSchema>>) => {
      const res = await api.post(
        ENDPOINTS.admin.products.color.update(storedData?.id || ""),
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

export default useUpdate;
