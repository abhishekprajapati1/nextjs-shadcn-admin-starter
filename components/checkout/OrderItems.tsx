"use client";
import useFetch from "@/lib/hooks/use-fetch";
import ENDPOINTS from "@/lib/endpoints";
import { ICartItem } from "../cart/CartItem";
import { ICalculation } from "../cart/CartItems";
import { IUser } from "@/lib/types";
import { useRouter } from "next/navigation";
import OrderItem from "./OrderItem";
export type OrderStatus = "initiated" | "confirmed" | "picked" | "delivered";
type PaymentStatus = "pending" | "completed" | "failed";
type PaymentMode = "cod" | "online";
export interface IPayment {
  id: string;
  mode: PaymentMode;
  status: PaymentStatus;
  amount: number;
}
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
  payment: IPayment;
  user: IUser;
}
const OrderItems = () => {
  const router = useRouter();
  const { data, isLoading } = useFetch<IGetCheckoutResponse>({
    endpoint: ENDPOINTS.checkout.fetch_checkout_details,
  });

  if (isLoading && !Array.isArray(data?.order_items)) {
    return (
      <div className="flex flex-col gap-4 h-full overflow-auto col-span-12 md:col-span-7 xl:col-span-6">
        {Array(2)
          .fill("")
          .map((_, index) => (
            <OrderItem key={index} />
          ))}
      </div>
    );
  }

  if (data?.order_items?.length === 0) {
    router.replace("/page-not-found");
  }

  return (
    <div className="flex flex-col gap-4 h-full overflow-auto col-span-12 md:col-span-7 xl:col-span-6">
      {data?.order_items?.map((item) => {
        return <OrderItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default OrderItems;
