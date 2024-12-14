import axios, { AxiosError } from "axios";
import { getCookie } from "cookies-next";
import { TOKENS } from "./constants";
import { toast } from "@/lib/hooks/use-toast";

export const getBaseUrl = () => {
  if (process.env.NODE_ENV !== "development") {
    return "https://akkukachasma.com";
  }
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  }

  return "http://localhost:8000";
};

export const baseURL = getBaseUrl() + "/api";
const BearerToken = `Bearer ${getCookie(TOKENS.AUTH_TOKEN)}`;

type ApiClientProps = {
  multipart?: boolean;
  token?: string;
};

export const getApiClient = (params?: ApiClientProps) => {
  const { multipart, token } = params || {};

  const finalToken = token || getCookie(TOKENS.AUTH_TOKEN); // Use the token passed in or the stored cookie

  return axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      Authorization: finalToken ? `Bearer ${finalToken}` : undefined, // Set Bearer token
      "Content-Type": multipart ? "multipart/form-data" : "application/json",
    },
  });
};

export type RequestError = AxiosError & {
  response: {
    data: {
      success: boolean;
      message?: string;
      error?: any;
    };
  };
};

export const getErrorMessage = (error: RequestError) => {
  let message;
  if (
    Array.isArray(error?.response?.data?.message) &&
    error?.response?.data?.message.length > 0
  ) {
    message = error?.response?.data?.message[0];
  } else {
    message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
  }
  return message;
};

export const logout = async () => {
  const api = getApiClient();
  try {
    const response = await api.delete("auth/logout");
    const msg = response.data.data?.message;
    toast({ description: msg });
    window.location.href = "/login";
  } catch (error: unknown) {
    const message = getErrorMessage(error as RequestError);
    toast({ description: message, variant: "destructive" });
  }
};
