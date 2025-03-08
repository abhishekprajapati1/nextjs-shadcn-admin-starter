"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { ImageProps } from "./images";

export interface MultiImageSliderProps {
  images: ImageProps[];
}

export const MultiImageSlider: React.FC<MultiImageSliderProps> = ({
  images,
}) => {
  return (
    <section className="max-w-full min-w-[20rem] bg-white py-8">
      <div className="container px-0">
        <Swiper
          loop={true}
          slidesPerView={3}
          spaceBetween={20}
          navigation={true}
          modules={[FreeMode, Navigation]}
          className="h-56 w-full rounded-lg"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="flex h-full w-full items-center justify-center">
                <Image
                  src={image.src}
                  alt={image.alt}
                  className="block h-full w-full object-contain border rounded-lg"
                  width={600}
                  height={400}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
