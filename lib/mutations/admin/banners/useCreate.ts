import { toast } from "@/lib/hooks/use-toast";
import { RequestError, getApiClient, getErrorMessage } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { useAppDispatch } from "@/store";
import { resetStore } from "@/store/banners/form.slice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { formSchema } from "@/lib/validations/admin/banners.validation";
import useSessionStorage from "@/hooks/use-session-storage";
import { IFile } from "@/lib/types";

const useCreate = (onSuccess?: () => void) => {
  const {
    value: uploadedImage,
    setValue: setUploadedImage,
    removeValue: removeUploadedImageFromSession,
  } = useSessionStorage<IFile>("banner_image");
  const api = getApiClient();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (
      data: z.infer<typeof formSchema> & { image?: string },
    ) => {
      if (uploadedImage) {
        data.image = uploadedImage.id;
      }
      const res = await api.post(ENDPOINTS.admin.banners.create, data);
      return res.data;
    },
    onSuccess: () => {
      dispatch(resetStore());
      removeUploadedImageFromSession();
      if (onSuccess) onSuccess();
      queryClient.invalidateQueries({ queryKey: ["banners"] });
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
