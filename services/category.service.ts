import { ICategory } from "@/components/categories/ListItem";
import { getApiClient } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { IPaginatedResponse } from "@/lib/types";

const api = getApiClient();
export const getCategories = async (): Promise<
  IPaginatedResponse<ICategory>
> => {
  const response = await api.get(ENDPOINTS.admin.categories.fetch_all());
  return response?.data;
};
