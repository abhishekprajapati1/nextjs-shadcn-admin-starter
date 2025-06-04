"use client";
import useFetch from "@/lib/hooks/use-fetch";
import CartItem, { ICartItem } from "./CartItem";
import ENDPOINTS from "@/lib/endpoints";
import { ICoupon } from "../coupon-manager/ListItem";
export interface IGetCartResponse {
  cart_items: Array<ICartItem>;
  calculation: {
    subtotal: number;
    discount_on_mrp: number;
    lens_detail_price: number;
    shipping_price: number;
    total: number;
    applied_coupon?: {
      coupon: ICoupon | null;
      discount: number;
    };
  };
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
      <div className="flex flex-col gap-4 lg:min-w-[700px]">Cart is empty</div>
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
