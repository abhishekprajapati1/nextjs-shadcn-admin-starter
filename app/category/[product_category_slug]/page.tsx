import { MainHeader } from "@/components/navigation/MainHeader";
import { notFound } from "next/navigation";
import React from "react";

const page = ({ params }: { params: { product_category_slug: string } }) => {
  const category_slug = params.product_category_slug;

  if (!category_slug) {
    notFound();
  }
  return (
    <div>
      <MainHeader />
      products_category_slug is {category_slug}
    </div>
  );
};

export default page;
