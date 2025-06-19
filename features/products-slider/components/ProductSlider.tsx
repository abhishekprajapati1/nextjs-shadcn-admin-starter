"use client";
import { ProductCard2 } from "@/features/product-cards";
import MultiCardSlider from "@/components/ui/swiper/MultiCardSlider";
import { ISeparatedProduct } from "@/lib/types";
import { SwiperProps } from "swiper/react";

interface ProductsSliderProps {
  data?: ISeparatedProduct[];
  breakpoints?: SwiperProps["breakpoints"];
}
const ProductsSlider: React.FC<ProductsSliderProps> = ({
  data = [],
  breakpoints,
}) => {
  return (
    <MultiCardSlider
      template={ProductCard2}
      data={data}
      slideClass="py-8 px-4"
      className="px-4"
      breakpoints={breakpoints}
      navigation
    />
  );
};
export default ProductsSlider;
