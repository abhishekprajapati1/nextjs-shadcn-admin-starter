import { MainHeader } from "@/components/navigation/MainHeader";
import { Metadata } from "next";
import CategorySlider from "@/components/home/CategorySlider";
import EyeglassTrends from "@/components/home/home-section/EyeglassTrends";
import {
  fetchFeaturedProducts,
  fetchLatestProducts,
  fetchPopularProducts,
  fetchShapeStarters,
} from "@/services/product.service";
import ProductSlider from "@/components/home/home-section/ProductsSlider";
import HomeGallery from "@/components/home/home-section/HomeGallery";
import { fetchHomePageBanners } from "@/services/banner.service";
import BannerRenderer from "@/components/banner-renderer";

export const metadata: Metadata = {
  title: "Akku Ka Chasma",
  description: `Akku ka Chasma gives you Eyeglasses | Contact lenses | Sunglasses service Since 2013 India
  Click or call we fix all online/offline in India`,
  keywords: [
    "eyewear",
    "eyeglasses",
    "akku",
    "akkukachasma",
    "trending eyewear",
  ],
  openGraph: {
    title: "Akku Ka Chasma",
    description: `Akku ka Chasma gives you Eyeglasses | Contact lenses | Sunglasses service Since 2013 India
    Click or call we fix all online/offline in India`,
    url: "https://akkukachasma.com",
    siteName: "Home | Akku Ka Chasma",
    type: "website",
  },
};

const HomePage = async () => {
  const shapeStarters = await fetchShapeStarters();
  const featuredProducts = await fetchFeaturedProducts();
  const popularProducts = await fetchPopularProducts();
  const latestProducts = await fetchLatestProducts();
  const banners = await fetchHomePageBanners();
  return (
    <div>
      <MainHeader />

      {Array.isArray(banners?.data) && banners?.data?.length > 0 && (
        <BannerRenderer
          banner={banners?.data[0]}
          className="bg-red-200 !py-0"
        />
      )}

      <CategorySlider />
      <EyeglassTrends data={shapeStarters || []} />
      {featuredProducts.length > 0 && (
        <ProductSlider
          title="Featured"
          subtitle="Products"
          data={featuredProducts}
        />
      )}

      {Array.isArray(banners?.data) && banners?.data?.length > 1 && (
        <BannerRenderer banner={banners?.data[1]} className="container" />
      )}

      {latestProducts.length > 0 && (
        <ProductSlider title="New" subtitle="Arrivals" data={latestProducts} />
      )}

      {Array.isArray(banners?.data) && banners.length > 2 && (
        <BannerRenderer banner={banners?.data[2]} />
      )}

      {popularProducts.length > 0 && (
        <ProductSlider
          title="Popular"
          subtitle="Products"
          data={popularProducts}
        />
      )}
      <HomeGallery />
    </div>
  );
};
export default HomePage;
