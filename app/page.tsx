import BannerSlider from "@/components/home/BannerSlider";
import Glass from "@/components/home/Glass";
import { MainHeader } from "@/components/navigation/MainHeader";
import UnderConstruction from "@/components/UnderConstruction";
import { Metadata } from "next";
import { images } from "../components/home/images";

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

const HomePage = () => {
  return (
    <div>
      <MainHeader />
      <BannerSlider />
      <Glass title="EYEGLASSES" images={images} />
      <Glass title="SUNGLASSES" images={images} />
    </div>
  );
};
export default HomePage;
