import { toast } from "@/components/ui/use-toast";
import { RequestError, getApiClient, getErrorMessage } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { powerTypeSchema } from "@/lib/validations/admin/power-type.validation";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetStore } from "@/store/power-types/form.slice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const useUpdatePowerType = (onSuccess?: () => void) => {
  const dispatch = useAppDispatch();

  const power_type_id = useAppSelector(
    (store) => store.powerTypeStore.formStore.power_type_id,
  );

  const api = getApiClient({ multipart: true });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof powerTypeSchema>) => {
      const { image, ...rest } = data;
      const formdata = new FormData();
      if (image) formdata.append("image", image);
      formdata.append("json_payload", JSON.stringify(rest));
      const res = await api.put(
        ENDPOINTS.admin.power_types.update(power_type_id),
        formdata,
      );
      return res.data;
    },
    onSuccess: (_data) => {
      dispatch(resetStore());
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

export default useUpdatePowerType;
