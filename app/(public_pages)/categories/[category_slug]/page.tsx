import ProductResult from "@/features/products/components/product-result";
import ENDPOINTS from "@/lib/endpoints";
import { fetchCategoryProducts } from "@/services/category.service";
import React from "react";
interface CategoryResultPageProps {
  params: {
    category_slug: string;
  };
}
const CategoryResultPage = async ({ params }: CategoryResultPageProps) => {
  const data = await fetchCategoryProducts(params.category_slug);
  return (
    <React.Fragment>
      <ProductResult
        endpoint={ENDPOINTS.products.category_products(params.category_slug)}
        initialData={data}
      />
    </React.Fragment>
  );
};
export default CategoryResultPage;
