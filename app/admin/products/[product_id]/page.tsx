import React from "react";
import PageWrapper from "@/components/wrappers/PageWrapper";
import Header from "@/components/products/details/header";
import ProductInfo from "@/components/products/details/ProductInfo";
import ProductColorImages from "@/components/products/details/product-color-images";

export type ProductDetailsParams = {
  product_id: string;
};

interface DetailsPageProps {
  params: ProductDetailsParams;
}

function DetailsPage({ params }: DetailsPageProps) {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <Header />
      <PageWrapper>
        <ProductInfo />
        <ProductColorImages product_id={params.product_id} />
      </PageWrapper>
    </div>
  );
}

export default DetailsPage;
