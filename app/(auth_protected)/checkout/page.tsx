import OrderItems from "@/components/checkout/OrderItems";
import Logo from "@/components/navigation/Logo";

const CheckoutPage = () => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="pt-12">
        <div className="text-center leading-[1px]">
          <Logo />
          <p className="text-center text-xs text-foreground/50 tracking-wider">
            Checkout with 100% safety
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <OrderItems />
      </div>
    </div>
  );
};
export default CheckoutPage;
