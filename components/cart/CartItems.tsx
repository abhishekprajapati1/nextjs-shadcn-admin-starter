"use client";
import useFetch from "@/lib/hooks/use-fetch";
import CartItem, { ICartItem } from "./CartItem";
import ENDPOINTS from "@/lib/endpoints";
import { ICoupon } from "../coupon-manager/ListItem";
import { Card, CardContent } from "../ui/card";
import { ShoppingCart } from "lucide-react";

export interface ICalculation {
  subtotal: number;
  discount_on_mrp: number;
  lens_detail_price: number;
  shipping_price: number;
  total: number;
  applied_coupon?: {
    coupon: ICoupon | null;
    discount: number;
  };
  gst?: number;
  gst_amount?: number;
}
export interface IGetCartResponse {
  cart_items: Array<ICartItem>;
  calculation: ICalculation;
  checkout_initiated: boolean;
}
const CartItems = () => {
  const { data, isLoading } = useFetch<IGetCartResponse>({
    endpoint: ENDPOINTS.cart.fetch_items,
  });

  if (isLoading && !Array.isArray(data?.cart_items)) {
    return (
      <div className="flex flex-col gap-4 lg:min-w-[700px]">
        {Array(4)
          .fill("")
          .map((_, index) => (
            <CartItem key={index} />
          ))}
      </div>
    );
  }

  if (data.cart_items?.length === 0) {
    return (
      <div className="flex min-h-[70vh] absolute w-screen flex-col items-center justify-center text-center px-4">
        <Card className="w-full max-w-md border-none shadow-none animate-fade-in">
          <CardContent className="flex flex-col items-center py-12 space-y-6">
            <div className="bg-muted rounded-full p-4 text-muted-foreground animate-bounce">
              <ShoppingCart className="h-10 w-10" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Your cart is empty
            </h2>
            <p className="text-sm text-muted-foreground">
              Looks like you haven’t added anything to your cart yet.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:min-w-[700px] h-full overflow-auto">
      {data.cart_items.map((item) => {
        return <CartItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default CartItems;
