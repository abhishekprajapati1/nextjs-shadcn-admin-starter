"use client";
import Image from "next/image";
import React from "react";
const data = [
  {
    src: "images/sunglasses.png",
    title: "Sun Glasses",
  },
  {
    src: "images/eyeglasses.png",
    title: "Eye Glasses",
  },
  {
    src: "images/ComputerGlasses.png",
    title: "Computer Glasses",
  },
  {
    src: "images/buytoguide.png",
    title: "Buy To Guide",
  },
  {
    src: "images/readingglass.png",
    title: "Reading Glasses",
  },
  {
    src: "images/prescriptionglasses.jpeg",
    title: "Prescription Glasses",
  },
  {
    src: "images/offer99.png",
    title: "Offer 99",
  },
];
const GlassesType = () => {
  return (
    <div className="w-full flex flex-wrap md:flex-nowrap items-center gap-5 mt-6 justify-evenly md:justify-between">
      {data &&
        data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-normal items-center"
          >
            <div className="rounded-full shadow-md hover:shadow-2xl hover:scale-75 duration-300 ease-in-out">
              <Image
                src={`/${item.src}`}
                width={130}
                height={130}
                alt="Glass Type"
              />
            </div>
            <p className="text-sm font-semibold tracking-wide mt-2 text-center">
              {item.title}
            </p>
          </div>
        ))}
    </div>
  );
};

export default GlassesType;
