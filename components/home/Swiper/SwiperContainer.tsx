"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { GlassesType } from "./Data";
import { FreeMode, Navigation } from "swiper/modules";
import Image from "next/image";

const SwiperContainer = () => {
  return (
    <section className="max-w-full min-w-[20rem] py-8">
      <div className="px-0">
        <Swiper
          loop={true}
          slidesPerView={4}
          spaceBetween={20}
          navigation={true}
          modules={[FreeMode, Navigation]}
          className="h-40 w-full"
        >
          {GlassesType?.map((slide, i) => (
            <SwiperSlide key={i} className="h-full w-full">
              <div className="h-full w-full flex flex-col justify-between">
                <div className="h-full w-full flex items-center justify-center">
                  <Image
                    src={`/${slide?.src}`}
                    alt="glass"
                    className="block h-[80%] w-full object-contain rounded-lg"
                    width={600}
                    height={400}
                  />
                </div>
                <span className="text-sm text-center">{slide.title}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SwiperContainer;
