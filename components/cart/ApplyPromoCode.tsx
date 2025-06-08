"use client";
import React from "react";
import { Button, ProcessIndicator } from "../ui/button";
import { Input } from "../ui/input";
import { IGetCartResponse } from "./CartItems";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import OfferListModal from "./OfferListModal";
import useApplyPromoCode from "@/lib/mutations/cart/useApplyPromoCode";
import useRemovePromoCode from "@/lib/mutations/cart/useRemovePromoCode";

interface ApplyPromoCodeProps {
  data: IGetCartResponse["calculation"]["applied_coupon"];
  className?: string;
}

const ApplyPromoCode: React.FC<ApplyPromoCodeProps> = ({
  data,
  className = "",
}) => {
  const [promoCode, setPromoCode] = React.useState("");
  const { mutate: applyPromocode, isPending: applying } = useApplyPromoCode();
  const { mutate: removePromocode, isPending: removing } = useRemovePromoCode();

  if (data?.coupon) {
    return (
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <span>Applied Coupon</span>
          {data?.coupon?.name ? (
            <strong className="uppercase">({data?.coupon?.name})</strong>
          ) : (
            ""
          )}
          <Button
            type="button"
            size="icon"
            disabled={removing}
            variant="ghost"
            className="!text-destructive !bg-transparent size-6"
            title="Remove Coupon"
            onClick={() => removePromocode()}
          >
            <XIcon className="size-4" />
          </Button>
        </div>
        <span className="text-destructive">- ₹ {data?.discount || 0}</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <label className="block">
        Apply Promo Code <OfferListModal />
      </label>
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
          disabled={applying}
          variant={promoCode ? "default" : "secondary"}
          className="w-20 absolute top-1/2 right-[5px] -translate-y-1/2 shadow-none rounded-sm"
          onClick={() => applyPromocode({ coupon_code: promoCode })}
        >
          <ProcessIndicator
            isProcessing={applying}
            btnText="Apply"
            processingText="Applying..."
          />
        </Button>
      </div>
    </div>
  );
};
export default ApplyPromoCode;
