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
import { IFile } from "@/lib/types";
interface GalleryCarouselProps {
  images: IFile[];
}
const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperClass>();

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
        {images?.length ? (
          images.map((image) => (
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
        {images.map((image) => (
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
