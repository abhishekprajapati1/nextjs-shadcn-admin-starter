"use client";
import useFetch from "@/lib/hooks/use-fetch";
import { Button } from "../ui/button";
import { IGetCheckoutResponse } from "./OrderItems";
import ENDPOINTS from "@/lib/endpoints";
import { Skeleton } from "../ui/skeleton";

const ProceedToPay = () => {
  const { data, isLoading } = useFetch<IGetCheckoutResponse>({
    endpoint: ENDPOINTS.checkout.fetch_checkout_details,
  });

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-end">
        <Skeleton className="h-10 w-32 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-end">
      {data?.payment?.mode === "cod" ? (
        <Button size="lg" className="rounded-3xl min-w-32">
          Place Order
        </Button>
      ) : (
        <Button size="lg" className="rounded-3xl min-w-32">
          Pay Now
        </Button>
      )}
    </div>
  );
};
export default ProceedToPay;
