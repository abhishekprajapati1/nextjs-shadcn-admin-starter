import { getApiClient, getErrorMessage, RequestError } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { toast } from "@/lib/hooks/use-toast";
import { useAppSelector } from "@/store";
import { useMutation } from "@tanstack/react-query";

const useRemoveProductFromCart = () => {
  const api = getApiClient();
  const cart_item_id = useAppSelector(
    (store) => store.cartStore.itemToDelete?.id,
  );
  return useMutation({
    mutationFn: async () => {
      const response = await api.delete(
        ENDPOINTS.cart.remove_product(cart_item_id || ""),
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast({
        description: data.message || "Product added to cart",
        variant: "success",
      });
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
export default useRemoveProductFromCart;
