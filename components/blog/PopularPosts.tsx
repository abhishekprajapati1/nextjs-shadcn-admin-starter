"use client";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useFetch from "@/lib/hooks/use-fetch";
import ENDPOINTS from "@/lib/endpoints";
import "swiper/css";
import HeroSliderTemplate from "./HeroSliderTemplate";
interface PopularPostsProps {
  height?: number;
}
const PopularPosts: React.FC<PopularPostsProps> = ({ height }) => {
  let { data, isLoading } = useFetch({
    endpoint: ENDPOINTS.blog.fetch_popular,
  });

  data = data || Array(4).fill("");

  return (
    <div className="" style={{ height }}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
        loop
        autoplay
      >
        {(data as any).map((d: any, index: number) => (
          <SwiperSlide style={{ height }} key={index} className="w-full h-full">
            <HeroSliderTemplate data={d} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default PopularPosts;
