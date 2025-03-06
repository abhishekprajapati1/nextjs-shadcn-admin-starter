import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

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

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-80 border rounded-lg overflow-hidden shadow-md bg-[#F5F5F5] border-none">
      <div className="relative p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-contain"
        />
        <button className="absolute top-4 right-4 bg-white p-1 rounded-full shadow">
          <Heart className="w-5 h-5 text-red-700" />
        </button>
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
          {product.colors.map((c, index) => (
            <span
              key={index}
              className="w-5 h-5 rounded-full border"
              style={{ backgroundColor: c }}
            ></span>
          ))}
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
