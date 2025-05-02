import { ICategory } from "@/components/categories/ListItem";
import { getApiClient } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { IPaginatedResponse } from "@/lib/types";

const api = getApiClient();

export const fetchShapeProducts = async (shape_slug: string) => {
  const response = await api.get(ENDPOINTS.products.shape_products(shape_slug));
  return response?.data;
};
