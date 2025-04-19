import React from "react";
import HomeGallery from "./HomeGallery";
import WomenFashionBanner from "./WomenFashionBanner";
import GalleryGrid from "./GalleryGrid";
import Footer from "./../footer";
import { GlassData } from "@/lib/constants";
import SwiperContainer from "@/components/ui/swiper/SwiperContainer";

const Home = () => {
  return (
    <>
      <main className="w-full mx-auto container">
        <section className="flex flex-col h-auto gap-5">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 md:h-[200px] py-2">
            <p className="flex flex-col font-bold text-5xl text-center">
              <span>EYEGLASSES</span>
              <span className="font-semibold">TREND</span>
            </p>
            <SwiperContainer
              autoplay={true}
              breakpoints={{
                320: { slidesPerView: 1 },
                480: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              data={GlassData}
            />
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
              <SwiperContainer autoplay={true} data={GlassData} />
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
              <SwiperContainer autoplay={true} data={GlassData} />
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
              <SwiperContainer autoplay={true} data={GlassData} />
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
              <SwiperContainer autoplay={true} data={GlassData} />
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
              <SwiperContainer autoplay={true} data={GlassData} />
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
              <SwiperContainer autoplay={true} data={GlassData} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
