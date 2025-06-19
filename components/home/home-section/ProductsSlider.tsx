"use client";
import ProductCard1 from "@/components/products/cards/ProductCard1";
import MultiCardSlider from "@/components/ui/swiper/MultiCardSlider";
import { ISeparatedProduct } from "@/lib/types";
import { cn } from "@/lib/utils";
interface ProductsSliderProps {
  data?: ISeparatedProduct[];
  title: string;
  subtitle: string;
  className?: string;
}
const ProductsSlider: React.FC<ProductsSliderProps> = ({
  data = [],
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div className={cn("mt-7 container flex flex-col gap-6", className)}>
      <h2 className="tracking-wide text-xl text-center">
        <span className="uppercase text-gray-600 mr-2">{title}</span>
        <span className="border-b-2 border-gray-700">{subtitle}</span>
      </h2>
      <MultiCardSlider
        className=""
        swiperClass="h-[250px]"
        template={ProductCard1}
        data={data}
        navigation
      />
    </div>
  );
};
export default ProductsSlider;
