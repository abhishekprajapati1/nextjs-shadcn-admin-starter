import { SliderTemplateProps } from "@/components/ui/swiper/MultiCardSlider";
import React from "react";
import { IProduct } from "../ListItem";
import ImageCarousel from "@/components/ui/swiper/ImageCarousel";
import { IProductColor } from "@/lib/types";
import Link from "next/link";
import useProductColor from "@/lib/hooks/useProductColor";
export interface ProductCardProps extends SliderTemplateProps<IProduct> {
  className?: string;
}
const ProductCard1 = React.forwardRef<HTMLAnchorElement, ProductCardProps>(
  ({ data, className = "" }, ref) => {
    const [activeColor, setActiveColor] = React.useState<IProductColor | null>(
      null,
    );

    const productColor = useProductColor({
      product_colors: data?.product_colors || [],
    });

    React.useEffect(() => {
      if (Array.isArray(data.product_colors) && data.product_colors.length) {
        setActiveColor(data.product_colors[0]);
      }
    }, [data]);

    return (
      <Link
        ref={ref}
        href={`/${data?.slug}/${productColor?.model_number}`}
        className={`h-full w-full border border-primary/10 rounded-xl overflow-hidden cursor-pointer ${className}`}
      >
        <div className="h-40">
          <ImageCarousel
            images={activeColor?.images?.map((image) => image.url)}
            height={160}
            autoplay
          />
        </div>
        <div className="px-4 pt-2 pb-4">
          <h3 className="font-medium">{data?.model_name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-success text-2xl">₹{data?.price}</span>
            <span className="line-through text-destructive">
              ₹{data?.listing_price}
            </span>
            <span className="text-gray-400 text-xs">
              {data?.discount_percent?.toFixed(2)}% off
            </span>
          </div>
        </div>
      </Link>
    );
  },
);
ProductCard1.displayName = "ProductCard1";
export default ProductCard1;
