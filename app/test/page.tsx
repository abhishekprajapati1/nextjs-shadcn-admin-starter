import React from "react";
import Slider from "./slider";
import ProductCard, { Product } from "./ProductCard";
import chasma from "@/public/chasma.png";
import ProductSlider from "./ProductSlider";

// interface Product {
//   name: string;
//   price: number;
//   color: string;
//   colors: string[];
//   image: string;
// }

// Example usage:
const product: Product = {
  name: "Amity",
  price: 29,
  color: "Rose Gold",
  colors: ["#f4c2c2", "#e8a2a2", "#d98282"],
  image: chasma.src,
};

function page() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* <Slider /> */}
      {/* <ProductSlider/> */}
      <ProductCard product={product} />;
    </div>
  );
}

export default page;
