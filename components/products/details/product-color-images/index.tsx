"use client";
import ColorTabs from "./ColorTabs";
import ColorImages from "./ColorImages";

interface ProductColorImagesProps {
  product_id: string;
}

const ProductColorImages = ({ product_id }: ProductColorImagesProps) => {
  return (
    <div className="flex flex-col py-4 gap-4">
      <ColorTabs product_id={product_id} />
      <ColorImages product_id={product_id} />
    </div>
  );
};

export default ProductColorImages;
