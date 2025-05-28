"use client";
import React from "react";
import Image from "next/image";
import { IBannerImage } from "../banners/ListItem";
import { IMAGE_RATIO } from "@/lib/constants";
import Link from "next/link";

interface GridBannerProps {
  banner_images: IBannerImage[];
}

const GridBanner: React.FC<GridBannerProps> = ({ banner_images }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {banner_images.map((img, index) => {
        const ratioClass =
          IMAGE_RATIO[img.aspect_ratio]?.class || "aspect-[4/3]";
        const imageUrl = img.image?.url;

        if (!imageUrl) return null;

        const width = img.width ? `${img.width}px` : "300px";

        return (
          <div
            key={index}
            className={`relative overflow-hidden ${ratioClass}`}
            style={{
              width,
            }}
          >
            <Link
              href={img?.url || "#"}
              target="_blank"
              className="relative block w-full h-full cursor-pointer"
            >
              <Image
                src={imageUrl}
                alt={`Banner Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default GridBanner;
