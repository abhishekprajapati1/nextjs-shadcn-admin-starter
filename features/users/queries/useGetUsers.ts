import { getApiClient, getErrorMessage, RequestError } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setBlockedTotal, setTotal } from "../store/users.slice";

export interface GetUsersParams {
  sort_by?: string;
  search?: string;
  email?: string;
  phone_number?: string;
  type?: string;
  blocked?: string; // "true" or ""
  page_size?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone_number?: string;
  type: string;
  created_at: string;
  updated_at: string;
  agree_t_and_c: boolean;
  blocked?: boolean;
}

export interface GetUsersResponse {
  success: boolean;
  data: User[];
  total: number;
  page: number;
  page_size: number;
}

const useGetUsers = (params: GetUsersParams = {}) => {
  const api = getApiClient();
  const page_size = params.page_size || 12;
  const dispatch = useAppDispatch();
  const total = useAppSelector((state) => state.adminUsersStore.data.total);

  const result = useInfiniteQuery<User[]>({
    initialPageParam: 1,
    queryKey: ["admin-users", params],
    queryFn: async ({ pageParam }) => {
      const queryString = new URLSearchParams();
      Object.entries({ ...params, page: pageParam, page_size }).forEach(
        ([key, value]) => {
          if (
            value !== undefined &&
            value !== null &&
            value !== "" &&
            !(key === "type" && value === "all")
          ) {
            queryString.append(key, value.toString());
          }
        },
      );
      const response = await api.get(
        ENDPOINTS.users.fetch_all(queryString.toString()),
      );
      // Attach total to the response for onSuccess
      if (response?.data?.total !== undefined) {
        if (params.blocked === "true") {
          dispatch(setBlockedTotal(response?.data?.total));
        } else {
          dispatch(setTotal(response?.data?.total));
        }
      }
      console.log("ise dekh", response.data.data);
      return response.data.data;
    },
    getNextPageParam: (_lastPage, allPages) => {
      const totalAvailablePages = Math.ceil(total / page_size);
      return allPages?.length < totalAvailablePages
        ? allPages.length + 1
        : undefined;
    },
  });

  const users = React.useMemo(() => {
    return result.data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, [] as User[]);
  }, [result.data]);

  return {
    data: users,
    isLoading: result.isLoading,
    hasNextPage: result.hasNextPage,
    isFetchingNextPage: result.isFetchingNextPage,
    fetchNextPage: result.fetchNextPage,
    refetch: result.refetch,
    query: result,
    total,
  };
};

export default useGetUsers;
