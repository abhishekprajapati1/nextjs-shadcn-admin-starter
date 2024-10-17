import React from "react";
import { getApiClient } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/store";
import { setTotal } from "@/store/power-types/data.slice";
import { generateQueryString } from "@/lib/utils";
import ENDPOINTS from "@/lib/endpoints";
import { ILensFeature } from "@/components/lens-features/LenseFeature";

const useLensFeature = () => {
  const dispatch = useAppDispatch();
  const api = getApiClient();
  // Get sort_by selection
  const { sort_by, total, search_term } = useAppSelector(
    (store) => store.lensFeatureStore.dataStore,
  );

  const page_size = 10; // Number of records per page.

  const result = useInfiniteQuery<ILensFeature[]>({
    initialPageParam: 1,
    queryKey: ["lens-feature", search_term, sort_by],
    queryFn: async ({ pageParam }) => {
      const filterObj = {
        page: pageParam?.toString(),
        sort_by,
        page_size: page_size?.toString(),
        search_term,
      };

      const queryString = generateQueryString(filterObj);

      const response = await api.get(
        ENDPOINTS.admin.power_types.fetch_all(queryString),
      );

      dispatch(setTotal(response?.data?.total));
      return response.data?.data;
    },
    getNextPageParam: (_lastPage, allPages) => {
      const totalAvailablePages = Math.ceil(total / page_size);
      return allPages?.length < totalAvailablePages
        ? allPages.length + 1
        : undefined;
    },
  });

  const customers = React.useMemo(() => {
    return result.data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, [] as ILensFeature[]);
  }, [result?.data]);

  return {
    data: customers,
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    hasNextPage: result.hasNextPage,
    isFetchingNextPage: result.isFetchingNextPage,
    fetchNextPage: result.fetchNextPage,
  };
};

export default useLensFeature;
