"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Navigation } from "swiper/modules";
import Image from "next/image";
import { GlassesType } from "@/lib/constants";

const SwiperContainer = () => {
  return (
    <section className="max-w-full min-w-[20rem] py-8">
      <div className="px-0">
        <Swiper
          loop={true}
          // slidesPerView={4}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 4 },
          }}
          navigation={true}
          modules={[FreeMode, Navigation]}
          className="h-40 w-full"
        >
          <style>
            {`
              .swiper-button-prev, .swiper-button-next {
                color: #000000 !important;
              }
            `}
          </style>
          {GlassesType?.map((slide, i) => (
            <SwiperSlide key={i} className="h-full w-full">
              <div className="h-full w-full flex flex-col justify-between">
                <div className="h-full w-full flex items-center justify-center">
                  <Image
                    src={`/${slide?.src}`}
                    alt="glass"
                    className="block max-h-[80%] h-[80%] w-full object-contain rounded-lg"
                    width={600}
                    height={400}
                  />
                </div>
                <span className="block text-sm text-center max-h-[20%] h-[20%]">
                  {slide.title}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SwiperContainer;
