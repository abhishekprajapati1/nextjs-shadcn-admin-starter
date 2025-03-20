"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FreeMode, Navigation } from "swiper/modules";
import { GlassesType } from "./Data";
import Image from "next/image";

export default function Slider() {
  return (
    <section className="max-w-full min-w-[20rem] py-8">
      <div className="container px-0">
        <Swiper
          loop={true}
          // slidesPerView={4}
          spaceBetween={20}
          navigation={true}
          modules={[FreeMode, Navigation]}
          className="h-40 w-full"
          style={{
            padding: "0px 60px",
            // border: "2px solid red",
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280:{ slidesPerView: 4 }
          }}
        >
          <style>
            {`
              .swiper-button-prev, .swiper-button-next {
                color: #000000 !important;
              }
            `}
          </style>
          {GlassesType?.map((slide, index) => (
            <SwiperSlide key={index} className="h-full w-full">
              <div className="h-full w-full flex flex-col justify-between">
                <div className="h-full w-full flex items-center justify-center">
                  <Image
                    src={`/${slide.src}`}
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
}
