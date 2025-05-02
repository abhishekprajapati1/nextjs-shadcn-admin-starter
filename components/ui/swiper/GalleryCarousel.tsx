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
interface GalleryCarouselProps {
  product_colors: IProductColor[];
}
const GalleryCarousel: React.FC<GalleryCarouselProps> = ({
  product_colors,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperClass>();
  const { value: colorName, setValue: setColorName } =
    useQueryState<string>("color_name");
  const [images, setImages] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (Array.isArray(product_colors) && product_colors.length && !colorName) {
      setColorName(
        `${product_colors[0]?.color?.name}-${product_colors[0]?.color?.color}`,
      );
    }
  }, [product_colors, setColorName, colorName]);

  React.useEffect(() => {
    if (colorName) {
      const name = colorName?.split("-")?.[0];
      const color = colorName?.split("-")?.[1];
      const product_color = product_colors?.find(
        (pc) => pc.color.color === color && pc.color.name === name,
      );
      if (product_color) {
        setImages(product_color.images?.map((image) => image.url));
      }
    }
  }, [colorName, product_colors]);

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
        {images?.length > 0 ? (
          images.map((image) => (
            <SwiperSlide key={image}>
              <Image
                src={image}
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
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={image}
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
