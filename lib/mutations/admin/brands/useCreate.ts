import { toast } from "@/lib/hooks/use-toast";
import { RequestError, getApiClient, getErrorMessage } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { useAppDispatch } from "@/store";
import { resetStore } from "@/store/brands/form.slice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { brandSchema } from "@/lib/validations/admin/brands.validation";

const useCreate = (onSuccess?: () => void) => {
  const api = getApiClient();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof brandSchema>) => {
      const res = await api.post(ENDPOINTS.admin.brands.create, data);
      return res.data;
    },
    onSuccess: () => {
      dispatch(resetStore());
      if (onSuccess) onSuccess();
      queryClient.invalidateQueries({ queryKey: ["brands"] });
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

export default useCreate;
