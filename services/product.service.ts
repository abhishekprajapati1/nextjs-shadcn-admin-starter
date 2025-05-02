import { IProduct } from "@/components/products/ListItem";
import { getApiClient } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";

export const fetchShapeStarters = async () => {
  const api = getApiClient();
  const response = await api.get(ENDPOINTS.products.shape_starters);
  return response.data.data;
};

export const fetchLatestProducts = async () => {
  const api = getApiClient();
  const response = await api.get(ENDPOINTS.products.latest);
  return response.data.data;
};

export const fetchPopularProducts = async () => {
  const api = getApiClient();
  const response = await api.get(ENDPOINTS.products.popular);
  return response.data.data;
};
export const fetchFeaturedProducts = async () => {
  const api = getApiClient();
  const response = await api.get(ENDPOINTS.products.popular);
  return response.data.data;
};

export const fetchProductDetails = async (slug: string): Promise<IProduct> => {
  const api = getApiClient();
  const response = await api.get(ENDPOINTS.products.fetch_single_product(slug));
  return response.data.data;
};
