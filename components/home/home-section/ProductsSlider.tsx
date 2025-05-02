"use client";
import ProductCard1 from "@/components/products/cards/ProductCard1";
import { IProduct } from "@/components/products/ListItem";
import MultiCardSlider from "@/components/ui/swiper/MultiCardSlider";
interface ProductsSliderProps {
  data?: IProduct[];
  title: string;
  subtitle: string;
}
const ProductsSlider: React.FC<ProductsSliderProps> = ({
  data = [],
  title,
  subtitle,
}) => {
  return (
    <div className="mt-7 container flex flex-col gap-6">
      <h2 className="tracking-wide text-xl text-center">
        <span className="uppercase text-gray-600 mr-2">{title}</span>
        <span className="border-b-2 border-gray-700">{subtitle}</span>
      </h2>
      <MultiCardSlider
        className=""
        height={250}
        template={ProductCard1}
        data={data}
        navigation
      />
    </div>
  );
};
export default ProductsSlider;
