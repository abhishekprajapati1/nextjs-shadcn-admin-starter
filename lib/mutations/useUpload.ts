import { useMutation } from "@tanstack/react-query";
import { getApiClient, getErrorMessage, RequestError } from "../api";
import ENDPOINTS from "../endpoints";
import { toast } from "../hooks/use-toast";
const api = getApiClient({ multipart: true });
const upload = async ({ file, name }: { file: File; name: string }) => {
  const formData = new FormData();
  formData.append(name, file);
  const response = await api.post(ENDPOINTS.upload, formData);
  return response.data.data;
};

const useUpload = () => {
  return useMutation({
    mutationFn: async ({
      files,
      name = "file",
    }: {
      files: File[];
      name?: string;
    }) => {
      const uploadPromises = files.map((file) => upload({ file, name }));
      const responses = await Promise.all(uploadPromises);
      return responses;
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
