import { toast } from "@/lib/hooks/use-toast";
import { RequestError, getApiClient, getErrorMessage } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { powerTypeSchema } from "@/lib/validations/admin/power-type.validation";
import { useAppDispatch } from "@/store";
import { showModal } from "@/store/power-types/form.slice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const useCreatePowerType = (onSuccess?: () => void) => {
  const api = getApiClient();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof powerTypeSchema>) => {
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

export default useCreatePowerType;
