import { toast } from "@/components/ui/use-toast";
import { RequestError, getApiClient, getErrorMessage } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { lensFeatureSchema } from "@/lib/validations/admin/lens-feature.validation";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetStore } from "@/store/lens-features/form.slice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const useUpdateLensFeature = (onSuccess?: () => void) => {
  const dispatch = useAppDispatch();

  const lens_feature_id = useAppSelector(
    (store) => store.lensFeatureStore.formStore.lens_feature_id,
  );

  const api = getApiClient({ multipart: true });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof lensFeatureSchema>) => {
      const { image, ...rest } = data;
      const formdata = new FormData();
      if (image) formdata.append("image", image);
      formdata.append("json_payload", JSON.stringify(rest));
      const res = await api.put(
        ENDPOINTS.admin.lens_features.update(lens_feature_id),
        formdata,
      );
      return res.data;
    },
    onSuccess: (_data) => {
      dispatch(resetStore());
      if (onSuccess) onSuccess();
      queryClient.invalidateQueries({ queryKey: ["lens-features"] });
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

export default useUpdateLensFeature;
