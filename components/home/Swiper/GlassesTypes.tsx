"use client";
import React from "react";
import { GlassTypesData } from "@/lib/constants";
import Image from "next/image";

const GlassesType = () => {
  return (
    <div className="w-full flex flex-wrap md:flex-nowrap items-center gap-5 mt-6 justify-evenly md:justify-between">
      {GlassTypesData &&
        GlassTypesData.map((item, index) => (
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
