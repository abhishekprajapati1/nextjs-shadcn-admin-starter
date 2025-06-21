"use client";
import React from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperClass } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { IProductColor } from "@/lib/types";
import useQueryState from "@/hooks/use-query-state";
import { getColorName } from "@/lib/hooks/useColorName";
import useProductColor from "@/lib/hooks/useProductColor";
interface GalleryCarouselProps {
  product_colors: IProductColor[];
}
const GalleryCarousel: React.FC<GalleryCarouselProps> = ({
  product_colors,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperClass>();
  const { value: colorName, setValue: setColorName } = useQueryState<
    string | undefined
  >(
    "color_name",
    Array.isArray(product_colors) && product_colors.length
      ? getColorName(product_colors[0]?.colors)
      : undefined,
  );
  const product_color = useProductColor({
    product_colors,
    colorName: colorName || "",
  });

  // React.useEffect(() => {
  //   if (Array.isArray(product_colors) && product_colors.length) {
  //     if (colorName) {
  //       setColorName(colorName);
  //     }
  //   }
  // }, [product_colors, setColorName, colorName]);

  return (
    <div className="flex flex-col gap-4">
      <Swiper
        modules={[FreeMode, Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        loop
        className="w-full h-[500px]"
      >
        {product_color?.images?.length ? (
          product_color?.images.map((image) => (
            <SwiperSlide key={image.id}>
              <Image
                src={image.url}
                alt="product image"
                width={900}
                height={500}
                className="h-full w-auto max-h-full max-w-auto mx-auto"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className="w-full min-h-[400px] h-full bg-primary/10 grid place-content-center">
            <p className="text-center">No images available</p>
          </SwiperSlide>
        )}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-[80%] h-20"
      >
        {product_color?.images.map((image) => (
          <SwiperSlide key={image.id}>
            <Image
              src={image.url}
              alt="product image"
              width={200}
              height={200}
              className="h-full w-auto max-w-full max-h-full mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default GalleryCarousel;
