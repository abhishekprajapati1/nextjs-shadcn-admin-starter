import React from "react";
import { MultiImageSlider } from "./MultiImageSlider";
import { ImageProps } from "./images";
export interface IGlass {
  title?: string;
  images: ImageProps[];
}

export default function Glass({ title, images }: IGlass) {
  return (
    <section className="max-w-full min-w-[20rm] bg-white pt-8">
      <div className="container px-0 mt-5">
        <div className="flex justify-between items-center border-b pb-2 max-w-full">
          <h2 className="text-lg font-medium tracking-wide">{title}</h2>
          <a href="#" className="text-teal-500 text-sm hover:underline">
            View Range
          </a>
        </div>
      </div>
      <MultiImageSlider images={images} />
    </section>
  );
}
