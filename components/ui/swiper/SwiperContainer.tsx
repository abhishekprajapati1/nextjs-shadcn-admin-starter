"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import type { SwiperOptions } from "swiper/types"; // ✅ Correct import
import { IGlasses } from "@/lib/types";
import SwiperCard from "./SwiperCard";

// Correctly define breakpoints to match SwiperOptions
interface IBreakpoints {
  [width: number]: SwiperOptions; // ✅ Numeric breakpoints
  [ratio: string]: SwiperOptions; // ✅ String-based breakpoints (e.g., "@0.75")
}

interface ISwiperContainerProps {
  autoplay?: boolean;
  breakpoints?: IBreakpoints;
  data: IGlasses[];
}

const SwiperContainer: React.FC<ISwiperContainerProps> = ({
  autoplay = false,
  breakpoints = {
    320: { slidesPerView: 1, spaceBetween: 20 },
    480: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 3, spaceBetween: 20 },
    1024: { slidesPerView: 4, spaceBetween: 20 },
    1280: { slidesPerView: 4, spaceBetween: 20 },
  },
  data,
}) => {
  return (
    <section className="max-w-full min-w-[20rem] py-8">
      <div className="px-0">
        <Swiper
          loop={true}
          autoplay={
            autoplay ? { delay: 1000, disableOnInteraction: false } : false
          }
          spaceBetween={20}
          breakpoints={breakpoints} // ✅ Now correctly typed
          navigation={true}
          modules={[FreeMode, Navigation, Autoplay]}
          className="h-40 w-full"
        >
          <style>
            {`
              .swiper-button-prev, .swiper-button-next {
                color: #000000 !important;
              }
            `}
          </style>
          {data?.map((slide, i) => (
            <SwiperSlide key={i} className="h-full w-full">
              <SwiperCard slide={slide} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SwiperContainer;
