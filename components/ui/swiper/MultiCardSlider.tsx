"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps } from "swiper/react";
import { Navigation } from "swiper/modules";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { cn } from "@/lib/utils";

export interface SliderTemplateProps<T = any> {
  index: number;
  data: T;
}

interface MultiCardSliderProps {
  className?: string;
  height?: number;
  template:
    | React.ForwardRefExoticComponent<
        SliderTemplateProps & React.RefAttributes<any>
      >
    | React.FC<SliderTemplateProps>;
  data?: any[];
  breakpoints?: SwiperProps["breakpoints"];
  navigation?: boolean;
  templateRef?: React.Ref<any>;
  swiperClass?: string;
  slideClass?: string;
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
  className = "",
  swiperClass = "",
  slideClass = "",
  template,
  data = [],
  breakpoints = defaultBreakPoints,
  navigation = false,
  templateRef,
}: MultiCardSliderProps) => {
  const Template = React.memo(template);
  return (
    <div className={`px-2 ${className}`}>
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
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        className={cn("mySwiper", swiperClass)}
      >
        {data.map((d, index) => (
          <SwiperSlide key={index} className={cn("", slideClass)}>
            <Template ref={templateRef} data={d} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MultiCardSlider;
