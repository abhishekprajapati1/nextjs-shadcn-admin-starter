import { toast } from "@/lib/hooks/use-toast";
import { RequestError, getApiClient, getErrorMessage } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { lensDetailSchema } from "@/lib/validations/admin/lens-details.validation";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetStore } from "@/store/lens-details/form.slice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const useUpdateLensDetail = (onSuccess?: () => void) => {
  const dispatch = useAppDispatch();

  const lens_detail_id = useAppSelector(
    (store) => store.lensDetailStore.formStore.lens_detail_id,
  );

  const api = getApiClient({ multipart: true });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof lensDetailSchema>) => {
      const { image, ...rest } = data;
      const formdata = new FormData();
      if (image) formdata.append("image", image);
      formdata.append("json_payload", JSON.stringify(rest));
      const res = await api.put(
        ENDPOINTS.admin.lens_details.update(lens_detail_id),
        formdata,
      );
      return res.data;
    },
    onSuccess: (_data) => {
      dispatch(resetStore());
      if (onSuccess) onSuccess();
      queryClient.invalidateQueries({ queryKey: ["lens-details"] });
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

export default useUpdateLensDetail;
