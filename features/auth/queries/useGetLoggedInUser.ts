"use client";
import ENDPOINTS from "@/lib/endpoints";
import useFetch from "@/lib/hooks/use-fetch";
import { IUser } from "@/lib/types";

export default function useGetLoggedInUser() {
  const query = useFetch<IUser>({
    endpoint: ENDPOINTS.AUTH.details,
  });
  return query;
}
