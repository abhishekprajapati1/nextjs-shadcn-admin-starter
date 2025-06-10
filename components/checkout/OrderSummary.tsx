"use client";
import React from "react";
import ApplyPromoCode from "../cart/ApplyPromoCode";
import useFetch from "@/lib/hooks/use-fetch";
import { IGetCheckoutResponse } from "./OrderItems";
import ENDPOINTS from "@/lib/endpoints";
import { Button } from "../ui/button";
import useUpdateOrderPaymentMode from "@/lib/mutations/order/useUpdateOrderPaymentMode";
import { cn } from "@/lib/utils";

const OrderSummary = () => {
  const { data, isLoading } = useFetch<IGetCheckoutResponse>({
    endpoint: ENDPOINTS.checkout.fetch_checkout_details,
  });

  const { mutate: updatePaymentMode, isPending: updatingPaymentMode } =
    useUpdateOrderPaymentMode(data?.id);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const base_price =
    data?.pricing?.subtotal +
    data?.pricing?.lens_detail_price +
    70 +
    ((data?.pricing?.subtotal + data?.pricing?.lens_detail_price + 70) *
      (data?.pricing.gst || 0)) /
      100;

  return (
    <div className="flex-grow flex flex-col gap-4">
      <div className="space-y-4 w-full">
        <h2 className="text-lg font-semibold">Order Summary</h2>

        <div className="flex justify-between">
          <span>Subtotal (MRP)</span>
          <span>₹ {data?.pricing?.subtotal || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount on MRP</span>
          <span className="text-destructive">
            − ₹ {data?.pricing?.discount_on_mrp || 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Lens Price</span>
          <span>₹ {data?.pricing?.lens_detail_price || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Prescription Upload</span>
          <span>Free</span>
        </div>

        <ApplyPromoCode
          order_id={data?.id}
          data={data?.pricing?.applied_coupon}
        />

        <div className="flex justify-between">
          <span>Mode Of Payment</span>
          <div className={cn("", updatingPaymentMode && "pointer-events-none")}>
            <Button
              size="xs"
              disabled={updatingPaymentMode}
              onClick={() => updatePaymentMode({ payment_mode: "cod" })}
              variant={data.payment.mode === "cod" ? "default" : "ghost"}
              className="rounded-2xl"
            >
              COD
            </Button>
            <Button
              size="xs"
              onClick={() => updatePaymentMode({ payment_mode: "online" })}
              disabled={updatingPaymentMode}
              variant={data.payment.mode === "online" ? "default" : "ghost"}
              className="rounded-2xl"
            >
              Online
            </Button>
          </div>
        </div>

        <div className="flex justify-between">
          <span>Shipping Cost</span>
          <span>
            {data?.pricing?.shipping_price
              ? `₹ ${data?.pricing?.shipping_price}`
              : "Free"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>GST ({data.pricing.gst || 0}%)</span>
          <span>₹ {data?.pricing?.gst_amount || 0}</span>
        </div>

        <hr />

        {base_price > data?.pricing?.total && (
          <div className="w-full inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700 shadow-sm ring-1 ring-inset ring-green-600/20">
            🎉 Congratulations!! You’re saving{" "}
            <span className="font-bold text-green-800">
              ₹ {(base_price - data?.pricing?.total).toFixed(2)}
            </span>{" "}
            on this order!
          </div>
        )}

        <div className="flex justify-between font-bold text-lg">
          <span>To Pay</span>
          <span>₹ {data?.pricing?.total || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
