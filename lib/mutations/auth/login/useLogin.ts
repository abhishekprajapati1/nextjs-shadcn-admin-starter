import { useMutation } from "@tanstack/react-query";
import ENDPOINTS from "@/lib/endpoints";
import { RequestError, getApiClient, getErrorMessage } from "@/lib/api";
import { z } from "zod";
import { loginSchema } from "@/lib/validations/auth.validation";
import { toast } from "@/lib/hooks/use-toast";

const useLogin = (ret?: string) => {
  const api = getApiClient();
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const res = await api.post(ENDPOINTS.AUTH.LOGIN, data);
      return res.data;
    },
    onSuccess: (data) => {
      toast({
        description: data.message,
        variant: "default",
      });

      let token: any = data?.data?.auth_token;
      if (token) {
        window?.localStorage?.setItem(
          token.type,
          JSON.stringify({ refresh_type: token.type, life: token.life }),
        );
        window.location.href = ret ? ret : "/";
      }
    },
    onError: (err: RequestError) => {
      const message = getErrorMessage(err);
      toast({
        description: message,
        variant: "destructive",
      });
    },
  });
  return mutation;
};

export default useLogin;
