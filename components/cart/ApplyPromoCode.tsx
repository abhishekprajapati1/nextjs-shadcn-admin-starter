"use client";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IGetCartResponse } from "./CartItems";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApplyPromoCodeProps {
  data: IGetCartResponse["calculation"]["applied_coupon"];
  className?: string;
}

const ApplyPromoCode: React.FC<ApplyPromoCodeProps> = ({
  data,
  className = "",
}) => {
  const [promoCode, setPromoCode] = React.useState("");

  if (data?.coupon) {
    return (
      <div className="flex justify-between text-destructive">
        <div className="flex items-center gap-1">
          <span>Applied Coupon</span>
          {data?.coupon?.name ? <strong>({data?.coupon?.name})</strong> : ""}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="!text-destructive !bg-transparent size-6"
            title="Remove Coupon"
          >
            <XIcon className="size-4" />
          </Button>
        </div>
        <span>₹ {data?.discount || 0}</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <label className="block">Apply Promo Code</label>
      <div className="relative">
        <Input
          type="text"
          className="h-10 pr-20 shadow-none rounded-sm"
          placeholder="Enter code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value?.toUpperCase())}
        />
        <Button
          size="sm"
          variant={promoCode ? "default" : "secondary"}
          className="w-20 absolute top-1/2 right-[5px] -translate-y-1/2 shadow-none rounded-sm"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};
export default ApplyPromoCode;
