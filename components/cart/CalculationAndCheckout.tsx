"use client";

import useFetch from "@/lib/hooks/use-fetch";
import { IGetCartResponse } from "./CartItems";
import ENDPOINTS from "@/lib/endpoints";
import { Button, ProcessIndicator } from "../ui/button";
import ApplyPromoCode from "./ApplyPromoCode";
import useCartCheckout from "@/lib/mutations/order/useCartCheckout";
import Link from "next/link";

const CalculationAndCheckout = () => {
  const { data } = useFetch<IGetCartResponse>({
    endpoint: ENDPOINTS.cart.fetch_items,
  });

  const { mutate: cartCheckout, isPending: checkingOut } = useCartCheckout();

  if (!Array.isArray(data?.cart_items) || !data?.cart_items.length) return null;

  return (
    <div className="flex-grow flex flex-col gap-4">
      <div className="p-4 space-y-4 w-full">
        <h2 className="text-lg font-semibold">Order Summary</h2>

        <div className="flex justify-between">
          <span>Subtotal (MRP)</span>
          <span>₹ {data?.calculation?.subtotal || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount on MRP</span>
          <span className="text-destructive">
            − ₹ {data?.calculation?.discount_on_mrp || 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Lens Price</span>
          <span>₹ {data?.calculation?.lens_detail_price || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Prescription Upload</span>
          <span>Free</span>
        </div>

        <ApplyPromoCode data={data?.calculation?.applied_coupon} />

        <hr />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹ {data?.calculation?.total || 0}</span>
        </div>
      </div>

      <div className="flex justify-end">
        {!data.checkout_initiated && (
          <Button
            type="button"
            className="rounded-3xl"
            size="lg"
            disabled={checkingOut}
            onClick={() => cartCheckout()}
          >
            <ProcessIndicator isProcessing={checkingOut} btnText="Checkout" />
          </Button>
        )}
        {data.checkout_initiated && (
          <Button type="button" className="rounded-3xl" size="lg" asChild>
            <Link href="/checkout">Complete Pending Checkout</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
export default CalculationAndCheckout;
