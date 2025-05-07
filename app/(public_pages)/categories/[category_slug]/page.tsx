import { MainHeader } from "@/components/navigation/MainHeader";
import ProductResult from "@/components/products/product-result";
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
      <MainHeader />
      <ProductResult data={data} />
    </React.Fragment>
  );
};
export default CategoryResultPage;
