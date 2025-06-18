import Link from "next/link";
import Logo from "./Logo";
import UserDropdown from "./UserDropdown";
import { Phone, ShoppingCart } from "lucide-react";
import SearchPanel from "./SearchPanel";

const DesktopNavbar = () => {
  return (
    <header className="container pt-2 py-4 sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200">
      <div className="flex items-center justify-between text-sm h-8">
        <div className="flex items-center gap-4">
          <Link href="/track-order">Track Order</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/contact-us">Contact Us</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="inline-flex items-center gap-1">
            <ShoppingCart className="h-5 w-5" />
            Cart
          </Link>
          <UserDropdown />
        </div>
      </div>
      <div className="flex items-center justify-between mt-1">
        <Link
          href="tel:+918188881661"
          className="inline-flex items-center gap-1 font-bold text-xs"
        >
          <Phone className="h-5 w-5" />
          +91 8188881661
        </Link>
        <div className="flex flex-col items-center">
          <Logo />
          <div className="flex items-center gap-6 justify-center font-semibold text-sm mt-2 tracking-wider">
            <Link href="/try-at-home">Try@Home</Link>
            <Link href="/try-at-home">Franchise Enquiry</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about-us">About Us</Link>
            <Link href="/contact-us">Contact</Link>
            <Link href="/support">Help</Link>
          </div>
        </div>
        <SearchPanel />
      </div>
    </header>
  );
};
export default DesktopNavbar;
