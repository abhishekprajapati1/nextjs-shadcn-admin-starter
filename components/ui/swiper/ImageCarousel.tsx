"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  className?: string;
  imageClass?: string;
  height?: number;
  images?: string[];
  autoplay?: boolean;
}
const ImageCarousel = ({
  className = "",
  imageClass = "",
  height = 250,
  images = [],
  autoplay = false,
}: ImageCarouselProps) => {
  return (
    <div className={`${className}`} style={{ height }}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
        loop
        autoplay={autoplay}
      >
        {images.map((image, index) => (
          <SwiperSlide style={{ height }} key={index} className="w-full h-full">
            <Image
              src={image}
              alt={`Carousel image ${index}`}
              width={1000}
              height={height}
              className={cn(
                "w-auto h-full mx-auto max-w-full max-h-full",
                imageClass,
              )}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
