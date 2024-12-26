import { toast } from "@/lib/hooks/use-toast";
import { RequestError, getApiClient, getErrorMessage } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetStore } from "@/store/articles/form.slice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { formSchema } from "@/lib/validations/admin/articles.validation";

const useUpdate = (onSuccess?: () => void) => {
  const dispatch = useAppDispatch();

  const item_id = useAppSelector(
    (store) => store.articleStore.formStore.item_id,
  );

  const api = getApiClient();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const res = await api.put(ENDPOINTS.admin.articles.update(item_id), data);
      return res.data;
    },
    onSuccess: (_data) => {
      dispatch(resetStore());
      if (onSuccess) onSuccess();
      queryClient.invalidateQueries({ queryKey: ["articles"] });
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
