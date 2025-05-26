import { MainHeader } from "@/components/navigation/MainHeader";
import ProductResult from "@/components/products/product-result";
import ENDPOINTS from "@/lib/endpoints";
import { fetchShapeProducts } from "@/services/shape.service";
import React from "react";
interface ShapeResultPageProps {
  params: {
    shape_slug: string;
  };
}
const ShapeResultPage = async ({ params }: ShapeResultPageProps) => {
  const data = await fetchShapeProducts(params.shape_slug);

  return (
    <React.Fragment>
      <MainHeader />
      <ProductResult
        endpoint={ENDPOINTS.products.shape_products(params.shape_slug)}
        initialData={data}
      />
    </React.Fragment>
  );
};
export default ShapeResultPage;
