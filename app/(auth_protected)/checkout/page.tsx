import OrderItems from "@/components/checkout/OrderItems";
import OrderSummary from "@/components/checkout/OrderSummary";
import ProceedToPay from "@/components/checkout/ProceedToPay";
import SelectAddress from "@/components/checkout/select-address";
import Logo from "@/components/navigation/Logo";

const CheckoutPage = () => {
  return (
    <div className="flex flex-col gap-4 h-full px-4 xl:px-10">
      <div className="pt-12">
        <div className="text-center leading-[1px]">
          <Logo />
          <p className="text-center text-xs text-foreground/50 tracking-wider">
            Checkout with 100% safety
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-8 xl:gap-12">
        <OrderItems />
        <div className="col-span-12 md:col-span-5 xl:col-span-6">
          <OrderSummary />
          <hr className="my-4" />
          <SelectAddress />
          <hr className="my-4" />
          <ProceedToPay />
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
