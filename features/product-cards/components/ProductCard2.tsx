import { SliderTemplateProps } from "@/components/ui/swiper/MultiCardSlider";
import React from "react";
import ImageCarousel from "@/components/ui/swiper/ImageCarousel";
import { IProductColor, ISeparatedProduct } from "@/lib/types";
import Link from "next/link";
import useProductColor from "@/lib/hooks/useProductColor";
import { Separator } from "@/components/ui/separator";
export interface ProductCardProps
  extends SliderTemplateProps<ISeparatedProduct> {
  className?: string;
}
const ProductCard2 = React.forwardRef<HTMLAnchorElement, ProductCardProps>(
  ({ data, className = "" }, ref) => {
    return (
      <Link
        ref={ref}
        href={`/${data?.product?.slug}/${data?.model_number}`}
        className={`block h-full w-full max-w-[400px] animate-smooth hover:shadow-lg rounded-xl overflow-hidden cursor-pointer ${className}`}
      >
        <div className="h-40">
          <ImageCarousel
            images={data?.images?.map((image) => image.url)}
            height={160}
            autoplay
          />
        </div>
        <div className="px-4 pt-2 pb-4 space-y-3">
          <div className="flex items-center gap-2 justify-between">
            <div className="grid place-content-center text-center text-xs">
              <strong>{data?.product?.frame_width} mm</strong>
              <span>Frame Width</span>
            </div>
            <div className="grid place-content-center text-center text-xs">
              <strong>{data?.product?.lens_width} mm</strong>
              <span>Lens Width</span>
            </div>

            <div className="grid place-content-center text-center text-xs">
              <strong>{data?.product?.frame_size}</strong>
              <span>Frame Size</span>
            </div>
          </div>
          <Separator className="my-1" />
          <div className="flex items-center gap-2 text-xs">
            <span className="text-success text-sm">
              ₹{data?.product?.price}
            </span>
            <span className="line-through text-destructive">
              ₹{data?.product?.listing_price}
            </span>
            <span className="text-gray-400">
              {data?.product?.discount_percent?.toFixed(2)}% off
            </span>
          </div>
        </div>
      </Link>
    );
  },
);
ProductCard2.displayName = "ProductCard2";
export default ProductCard2;
