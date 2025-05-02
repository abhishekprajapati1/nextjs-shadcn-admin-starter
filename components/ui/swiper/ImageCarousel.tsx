"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import React from "react";
import Image from "next/image";

interface ImageCarouselProps {
  className?: string;
  height?: number;
  images?: string[];
  autoplay?: boolean;
}
const ImageCarousel = ({
  className = "",
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
              width={300}
              height={height}
              className="w-auto h-full mx-auto max-w-full max-h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
