import { toast } from "@/components/ui/use-toast";
import { RequestError, getApiClient, getErrorMessage } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { lensFeatureSchema } from "@/lib/validations/admin/lens-feature.validation";
import { useAppDispatch } from "@/store";
import { showModal } from "@/store/power-types/form.slice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const useCreateLensFeature = (onSuccess?: () => void) => {
  const api = getApiClient({ multipart: true });
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof lensFeatureSchema>) => {
      const { image, ...rest } = data;
      const formdata = new FormData();
      if (image) formdata.append("image", image);
      formdata.append("json_payload", JSON.stringify(rest));
      const res = await api.post(ENDPOINTS.admin.power_types.create, formdata);
      return res.data;
    },
    onSuccess: (data) => {
      dispatch(showModal(false));
      if (onSuccess) onSuccess();
      queryClient.invalidateQueries({ queryKey: ["power-types"] });
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

export default useCreateLensFeature;
