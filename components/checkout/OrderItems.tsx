"use client";
import useFetch from "@/lib/hooks/use-fetch";
import ENDPOINTS from "@/lib/endpoints";
import { ICoupon } from "../coupon-manager/ListItem";
import { Card, CardContent } from "../ui/card";
import { ShoppingCart } from "lucide-react";
import CartItem, { ICartItem } from "../cart/CartItem";
import { ICalculation } from "../cart/CartItems";
import { IUser } from "@/lib/types";
import { useRouter } from "next/navigation";
export type OrderStatus = "initiated" | "confirmed" | "picked" | "delivered";
export interface IGetCheckoutResponse {
  id: string;
  order_id: string | null;
  created_at: string;
  updated_at: string;
  status: OrderStatus;
  notes: string | null;
  deleted_at: string | null;
  cancelled_at: string | null;
  confirmed_at: string | null;
  picked_at: string | null;
  delivered_at: string | null;
  user_id: string;
  pricing: ICalculation & { id: string };
  order_items: ICartItem[];
  payment: [];
  user: IUser;
}
const OrderItems = () => {
  const router = useRouter();
  const { data, isLoading } = useFetch<IGetCheckoutResponse>({
    endpoint: ENDPOINTS.checkout.fetch_checkout_details,
  });

  console.log("see this", data);

  if (isLoading && !Array.isArray(data?.order_items)) {
    return (
      <div className="flex flex-col gap-4 lg:min-w-[700px]">
        {Array(4)
          .fill("")
          .map((_, index) => (
            <CartItem forOrder key={index} />
          ))}
      </div>
    );
  }

  if (data.order_items?.length === 0) {
    router.replace("/page-not-found");
  }

  return (
    <div className="flex flex-col gap-4 lg:min-w-[700px] h-full overflow-auto">
      {data.order_items.map((item) => {
        return <CartItem forOrder key={item.id} item={item} />;
      })}
    </div>
  );
};
export default OrderItems;
