import React from "react";
import { IBanner } from "../banners/ListItem";
import ImageCarousel from "../ui/swiper/ImageCarousel";
import CarouselBanner from "./CarouselBanner";
import GridBanner from "./GridBanner";
interface BannerRendererProps {
  banner: IBanner;
  className?: string;
}

const BannerRenderer: React.FC<BannerRendererProps> = ({
  banner,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-4 py-8 ${className}`}>
      {banner.title && (
        <h2 className="tracking-wide text-2xl text-center">
          <span className="uppercase text-primary/80 font-semibold mr-2">
            {banner.title}
          </span>
        </h2>
      )}

      {/* carousel type banners */}
      {banner.type === "carousel" && (
        <CarouselBanner banner_images={banner?.banner_images} />
      )}
      {/* end of carousel type banners */}

      {/* grid type banners */}
      {banner.type === "grid" && (
        <GridBanner banner_images={banner?.banner_images} />
      )}

      {/* masonry type banners */}
      {banner.type === "masonry" && (
        <GridBanner banner_images={banner?.banner_images} />
      )}
    </div>
  );
};
export default BannerRenderer;
