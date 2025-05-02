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
  return (
    <div>
      <MainHeader />
      <CategorySlider />
      <EyeglassTrends data={shapeStarters || []} />
      <HomeGallery />
      <ProductSlider
        title="Featured"
        subtitle="Products"
        data={featuredProducts}
      />
      <HomeGallery />
      <ProductSlider title="New" subtitle="Arrivals" data={latestProducts} />
      <HomeGallery />
      <ProductSlider
        title="Popular"
        subtitle="Products"
        data={popularProducts}
      />
      <HomeGallery />
    </div>
  );
};
export default HomePage;
