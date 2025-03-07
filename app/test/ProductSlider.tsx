"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, FreeMode } from "swiper/modules";
import { images } from "./images";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useEffect, useRef } from "react";

export interface Icolor {
  color?: string;
}

export const ProductSlider: React.FC<Icolor> = ({ color }) => {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  }, []);

  return (
    <section
      style={color ? { backgroundColor: color } : undefined}
      className="w-[20rm] py-8"
    >
      <div className="container px-0">
        <Swiper
          loop={true}
          spaceBetween={10}
          pagination={{
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 250,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Autoplay, Pagination]}
          className="h-44 w-full rounded-lg"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            swiper.autoplay.stop();
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="flex h-full w-full items-center justify-center"
                onMouseEnter={() => swiperRef.current?.autoplay.start()}
                onMouseLeave={() => swiperRef.current?.autoplay.stop()}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  className="block h-full w-full object-contain"
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
