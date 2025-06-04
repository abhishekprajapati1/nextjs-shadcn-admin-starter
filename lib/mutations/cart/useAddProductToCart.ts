import { PurchaseStore } from "@/components/products/select-lens";
import useSessionStorage from "@/hooks/use-session-storage";
import { getApiClient, getErrorMessage, RequestError } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { toast } from "@/lib/hooks/use-toast";
import { purchaseSchema } from "@/lib/validations/admin/product.validation";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";

const useAddProductToCart = () => {
  const api = getApiClient();
  const router = useRouter();
  const { removeValue: removePurchaseStore } =
    useSessionStorage<PurchaseStore>("purchase_store");
  return useMutation({
    mutationFn: async (data: z.infer<typeof purchaseSchema>) => {
      const response = await api.post(ENDPOINTS.cart.add_product, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast({
        description: data.message || "Product added to cart",
        variant: "success",
      });
      removePurchaseStore();
      router.replace("/cart");
    },
    onError: (error: RequestError) => {
      const message = getErrorMessage(error);
      toast({
        description: message,
        variant: "destructive",
      });
    },
  });
};
export default useAddProductToCart;
