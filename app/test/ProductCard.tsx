"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import TemplateRadioGroup, {
  TemplateProps,
  TemplateRadioOption,
} from "@/components/ui/TemplateRadioGroup";
import { FC, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ProductSlider } from "./ProductSlider";

export interface Product {
  name: string;
  price: number;
  color: string;
  colors: string[];
  image: string;
}

interface ProductCardProps {
  product: Product;
}
const options: TemplateRadioOption[] = [
  { value: "#8e9f0f", label: "#8e9f0f" },
  { value: "#8e0f9f", label: "#8e0f9f" },
  { value: "#8e5f0f", label: "#8e5f0f" },
];

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<any>(
    product?.color || "#ffffff"
  );

  const handleColorChange = (value: string) => {
    setSelectedColor(value);
  };

  return (
    <Card className="w-80 border rounded-lg overflow-hidden shadow-md bg-[#F5F5F5] border-none">
      <div className="relative p-4">
        <ProductSlider color={selectedColor} />
        <Button
          variant="ghost"
          className="size-8 absolute top-4 right-4 bg-white rounded-full"
        >
          <span>
            <Heart className="size-5 text-red-700" />
          </span>
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <span className="w-full flex items-center justify-between gap-4">
            <span className="flex gap-2">
              <span className="text-base font-semibold">${product.price}</span>
              <span className="text-base font-semibold line-through text-muted-foreground/60">
                $35
              </span>
            </span>
            <span className="text-base font-medium text-red-500">30% OFF</span>
          </span>
        </div>
        <p className="text-sm text-gray-500">{product.color}</p>
        <div className="flex gap-1 mt-2 mb-3">
          <TemplateRadioGroup
            name="color_radio"
            value={selectedColor}
            onChange={handleColorChange}
            template={ColorTemplate}
            options={options}
            className="flex flex-row gap-2"
          />
        </div>
        <Button
          variant="outline"
          className="w-full h-10 text-sm border-transparent bg-white hover:border-yellow-300 hover:bg-white"
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export const ColorTemplate: FC<TemplateProps> = ({
  onClick,
  isChecked,
  data,
}) => {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      className="h-5 flex items-center p-0 bg-transparent hover:bg-transparent"
    >
      <span
        style={
          isChecked && data?.label ? { borderColor: data.label } : undefined
        }
        className={twMerge(
          "grid place-content-center size-5 border-2 rounded-full"
        )}
      >
        <span
          style={data?.label ? { backgroundColor: data.label } : undefined}
          className={twMerge(`block size-3 bg-transparent rounded-full`)}
        />
      </span>
    </Button>
  );
};
