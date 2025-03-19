import { toast } from "@/lib/hooks/use-toast";
import { RequestError, getApiClient, getErrorMessage } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetStore } from "@/store/shapes/form.slice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { formSchema } from "@/lib/validations/admin/shapes.validation";

const useUpdate = (onSuccess?: () => void) => {
  const dispatch = useAppDispatch();

  const item_id = useAppSelector((store) => store.shapeStore.formStore.item_id);

  const api = getApiClient();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const { image, ...rest } = data;
      const formdata = new FormData();
      if (image) formdata.append("image", image);
      formdata.append("json_payload", JSON.stringify(rest));
      const res = await api.put(ENDPOINTS.admin.shapes.update(item_id), data);
      return res.data;
    },
    onSuccess: (_data) => {
      dispatch(resetStore());
      if (onSuccess) onSuccess();
      queryClient.invalidateQueries({ queryKey: ["shapes"] });
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
