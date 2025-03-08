import { useMutation } from "@tanstack/react-query";
import { getApiClient, getErrorMessage, RequestError } from "../api";
import ENDPOINTS from "../endpoints";
import { toast } from "../hooks/use-toast";

const useUpload = () => {
  const api = getApiClient({ multipart: true });
  return useMutation({
    mutationFn: async ({
      file,
      name = "file",
    }: {
      file: File;
      name?: string;
    }) => {
      const formData = new FormData();
      formData.append(name, file);
      const response = await api.post(ENDPOINTS.upload, formData);
      return response.data.data;
    },
    onError: (error: RequestError) => {
      const message = getErrorMessage(error);
      toast({
        title: "Upload failed",
        description: message,
        variant: "destructive",
      });
    },
  });
};
export default useUpload;
