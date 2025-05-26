"use client";
import { IPaginatedResponse } from "@/lib/types";
import { IProduct } from "../ListItem";
import ProductCard1 from "../cards/ProductCard1";
import useProducts from "@/lib/queries/products/useProducts";
import ENDPOINTS from "@/lib/endpoints";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";

interface ProductResultProps {
  initialData: IPaginatedResponse<IProduct>;
  endpoint: string;
}

const ProductResult: React.FC<ProductResultProps> = ({
  initialData,
  endpoint,
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useProducts(endpoint, initialData);
  const elementRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  });

  if (data?.length === 0) {
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
      {/* <div className="col-span-3 bg-red-300"></div> */}
      <div className="col-span-12 grid grid-cols-12 grid-rows-10 gap-4 py-4">
        {data?.map((product, index) => (
          <ProductCard1
            className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 hover:shadow-lg animate-smooth"
            index={index}
            key={product.id}
            data={product}
            ref={elementRef}
          />
        ))}
      </div>
    </div>
  );
};
export default ProductResult;
