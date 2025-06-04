import CalculationAndCheckout from "@/components/cart/CalculationAndCheckout";
import CartItems from "@/components/cart/CartItems";
import Header from "@/components/navigation/auth-protected/header";
import PageWrapper from "@/components/wrappers/PageWrapper";

const CartPage = () => {
  return (
    <div className="h-full flex flex-col py-4 overflow-auto">
      <Header title="Shopping Cart" className="flex-shrink-0" />
      <PageWrapper className="!py-0 flex-grow flex flex-col sm:flex-row gap-4 lg:gap-10">
        <CartItems />
        <CalculationAndCheckout />
      </PageWrapper>
    </div>
  );
};
export default CartPage;
