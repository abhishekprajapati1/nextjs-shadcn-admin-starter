import { MainHeader } from "@/components/navigation/MainHeader";
import UnderConstruction from "@/components/UnderConstruction";
import { Metadata } from "next";
<<<<<<< Updated upstream
=======
import { images } from "../components/home/images";
import Home from "@/components/home/home-section/Home";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
      {/* <UnderConstruction /> */}
=======
      {/* dont delete the commented codes start */}

      {/* <BannerSlider />
      <Glass title="EYEGLASSES" images={images} />
      <Glass title="SUNGLASSES" images={images} /> */}

      {/* dont delete the commented codes start */}
      <Home />
>>>>>>> Stashed changes
    </div>
  );
};
export default HomePage;
