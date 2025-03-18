import React from "react";
import GlassesType from "../Swiper/GlassesTypes";
import Slider from "../Swiper/Slider";
import SwiperContainer from "../Swiper/SwiperContainer";
import HomeGallery from "./HomeGallery";
import WomenFashionBanner from "./WomenFashionBanner";
import GalleryGrid from "./GalleryGrid";
import Footer from "./../footer";
import Navbar from "../header/Navbar";

const Home = () => {
  return (
    <>
      <nav className="w-[97%] mx-auto">
        <Navbar />
      </nav>
      <main className="w-[97%] mx-auto">
        <section className="flex flex-col h-auto gap-5">
          <GlassesType />

          <div className="w-full flex flex-row items-center justify-between gap-2 h-[200px] py-2">
            <p className="flex flex-col font-bold text-5xl text-center">
              <span>EYEGLASSES</span>
              <span className="font-semibold">TREND</span>
            </p>
            <Slider />
          </div>

          <div className="w-full">
            <HomeGallery />
            <div className="mt-7">
              <div className="p-2 rounded-md">
                <h1 className="tracking-wide text-xl text-center">
                  <span className="uppercase text-gray-600 mr-2">
                    Best Seller
                  </span>{" "}
                  <span className="border-b-2 border-gray-700">
                    Round Glasses
                  </span>
                </h1>
              </div>
              <SwiperContainer />
            </div>

            <div className="mt-7">
              <div className="p-2 rounded-md">
                <h1 className="tracking-wide text-xl text-center">
                  <span className="uppercase text-gray-600 mr-2">
                    Best Seller
                  </span>{" "}
                  <span className="border-b-2 border-gray-700">
                    Computer Glasses
                  </span>
                </h1>
              </div>
              <SwiperContainer />
            </div>

            <div className="mt-7">
              <div className="p-2 rounded-md">
                <h1 className="tracking-wide text-xl text-center">
                  <span className="uppercase text-gray-600 mr-2">
                    Best Seller
                  </span>{" "}
                  <span className="border-b-2 border-gray-700">
                    Rounded Glasses
                  </span>
                </h1>
              </div>
              <SwiperContainer />
            </div>
            <WomenFashionBanner />
            <div className="mt-7">
              <div className="p-2 rounded-md">
                <h1 className="tracking-wide text-xl text-center">
                  <span className="uppercase text-gray-600 mr-2">
                    Best Seller
                  </span>{" "}
                  <span className="border-b-2 border-gray-700">
                    Rounded Glasses
                  </span>
                </h1>
              </div>
              <SwiperContainer />
            </div>
            <div className="mt-7">
              <div className="p-2 rounded-md">
                <h1 className="tracking-wide text-xl text-center">
                  <span className="uppercase text-gray-600 mr-2">
                    Best Seller
                  </span>{" "}
                  <span className="border-b-2 border-gray-700">
                    Rounded Glasses
                  </span>
                </h1>
              </div>
              <SwiperContainer />
            </div>
            <div className="flex flex-col gap-6 py-6">
              <GalleryGrid />
            </div>
            <div className="mt-7">
              <div className="p-2 rounded-md">
                <h1 className="tracking-wide text-xl text-center">
                  <span className="uppercase text-gray-600 mr-2">
                    Best Seller
                  </span>{" "}
                  <span className="border-b-2 border-gray-700">
                    Rounded Glasses
                  </span>
                </h1>
              </div>
              <SwiperContainer />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
