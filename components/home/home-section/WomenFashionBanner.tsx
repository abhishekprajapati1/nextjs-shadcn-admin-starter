import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const WomenFashionBanner = () => {
  return (
    <Card className="w-full bg-white border-none shadow-none">
      <div className="bg-gray-200 py-6">
        <div className=" text-xl text-black font-normal tracking-wider pt-2 text-center">
          Save Up | What a great Deal | Don't think Do It!
        </div>
        <div className=" text-center py-2">
          <h1 className="text-3xl font-bold text-black tracking-wider py-2">
            OMG! JUST LOOK AT THE GREAT DEALS!
          </h1>
        </div>
      </div>
      <CardContent>
        <div className="relative">
          <Image
            src="/banner5.png"
            alt="GalleryImages"
            width={200}
            height={100}
            className="w-full object-cover max-h-96"
          />
          <div className="py-6 flex justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative text-center">
              <p className="px-2 py-2 text-gray-600 uppercase text-lg tracking-widest">
                save up to 30% off
              </p>
              <h2 className="text-7xl font-bold tracking-widest">
                <span className="text-sky-400">women</span>
                <span className="text-blue-900">fashion</span>
              </h2>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WomenFashionBanner;
