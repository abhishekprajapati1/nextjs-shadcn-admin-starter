"use client";
import React from "react";
import { IBannerImage } from "../banners/ListItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IMAGE_RATIO } from "@/lib/constants";
import ImageCarousel from "../ui/swiper/ImageCarousel";

interface CarouselBannerProps {
  banner_images: IBannerImage[];
}

const CarouselBanner: React.FC<CarouselBannerProps> = ({
  banner_images,
}: CarouselBannerProps) => {
  return (
    <ImageCarousel
      autoplay
      images={banner_images.map((bi) => bi?.image?.url || "")}
      height={650}
      imageClass="w-full"
      className="py-0"
    />
  );
};
export default CarouselBanner;
