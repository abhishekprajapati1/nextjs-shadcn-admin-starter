"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps, SwiperRef } from "swiper/react";
import { Navigation } from "swiper/modules";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";

export interface SliderTemplateProps<T = any> {
  index: number;
  data: T;
}

interface MultiCardSliderProps {
  className?: string;
  height?: number;
  template: React.FC<SliderTemplateProps>;
  data?: any[];
  breakpoints?: SwiperProps["breakpoints"];
  navigation?: boolean;
}
const defaultBreakPoints: SwiperProps["breakpoints"] = {
  "@0.00": {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  "@0.75": {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  "@1.00": {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  "@1.50": {
    slidesPerView: 4,
    spaceBetween: 30,
  },
};
const MultiCardSlider = ({
  className,
  height = 250,
  template,
  data = [],
  breakpoints = defaultBreakPoints,
  navigation = false,
}: MultiCardSliderProps) => {
  const Template = template;
  return (
    <div className={`px-2 ${className}`} style={{ height }}>
      <Swiper
        modules={[Navigation]}
        style={
          {
            "--swiper-navigation-color": "hsl(var(--primary))",
            "--swiper-pagination-color": "hsl(var(--primary))",
          } as React.CSSProperties
        }
        navigation={navigation}
        loop
        breakpoints={breakpoints}
        slidesPerView={5}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {data.map((d, index) => (
          <SwiperSlide style={{ height }} key={index}>
            <Template data={d} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MultiCardSlider;
