import { MainHeader } from "@/components/navigation/MainHeader";
import { notFound } from "next/navigation";
import React from "react";

const page = ({ params }: { params: { product_slug: string } }) => {
  const product_slug = params.product_slug;

  if (!product_slug) {
    notFound();
  }
  return (
    <div>
      <MainHeader />
      products_category_slug is {product_slug}
    </div>
  );
};

export default page;
