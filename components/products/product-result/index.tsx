"use client";
import { IPaginatedResponse } from "@/lib/types";
import { IProduct } from "../ListItem";
import ProductCard1 from "../cards/ProductCard1";

interface ProductResultProps {
  data: IPaginatedResponse<IProduct>;
}

const ProductResult: React.FC<ProductResultProps> = ({ data }) => {
  if (data?.data?.length === 0) {
    return (
      <div className="container grid grid-cols-12 min-h-[80vh] gap-4">
        <div className="col-span-3 bg-red-300"></div>
        <div className="col-span-9 grid place-content-center">
          <div className="text-center text-gray-500">No products found.</div>
        </div>
      </div>
    );
  }
  return (
    <div className="container grid grid-cols-12 min-h-[80vh] gap-4">
      <div className="col-span-3 bg-red-300"></div>
      <div className="col-span-9 grid grid-cols-12 grid-rows-10 gap-4 py-4">
        {data?.data?.map((product, index) => (
          <ProductCard1
            className="col-span-4 hover:shadow-lg animate-smooth"
            index={index}
            key={product.id}
            data={product}
          />
        ))}
      </div>
    </div>
  );
};
export default ProductResult;
