"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Glasses,
  Search,
  ShoppingCart,
  User,
  Menu,
  Heart,
  ChevronRight,
  PhoneCallIcon,
  FacebookIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Logo from "./Logo";
import { ICategory } from "../categories/ListItem";
import SearchPanel from "./SearchPanel";
import UserDropdown from "./UserDropdown";
import WhatsappChannelIcon from "../icons/WhatsappChannelIcon";

interface MainHeaderProps {
  categories?: ICategory[];
}

export const MainHeader: React.FC<MainHeaderProps> = ({ categories = [] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut for search

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
        isScrolled && "shadow-sm",
      )}
    >
      {/* Announcement Bar */}
      <div className="bg-primary px-4 py-2 text-primary-foreground">
        <p className="text-center text-sm font-medium">
          Free shipping on orders above ₹999! 🚚
        </p>
      </div>

      {/* Navigation */}
      <div className="hidden md:flex h-fit items-center border-b-2 py-2">
        <div className="container flex items-center justify-between">
          <div className="hidden md:flex items-center space-x-5">
            <Link
              href="https://www.facebook.com/akkukachasma/"
              className="text-secondary-foreground text-xs font-medium flex items-center gap-1 hover:text-primary"
            >
              <FacebookIcon size={"1rem"} /> Facebook
            </Link>
            <Link
              href="https://www.instagram.com/akku_ka_chasma_._com/"
              className="text-secondary-foreground text-xs font-medium flex items-center gap-1 hover:text-primary"
            >
              <InstagramLogoIcon /> Instagram
            </Link>
            <Link
              href="https://whatsapp.com/channel/0029VaBII82ISTkO8xHViI28"
              className="text-secondary-foreground text-xs font-medium flex items-center gap-1 hover:text-primary"
            >
              <WhatsappChannelIcon className="size-4" /> Join now
            </Link>
          </div>
          <a
            className="flex items-center gap-1 text-xs font-semibold"
            href="tel:8188881661"
          >
            <PhoneCallIcon size={"1rem"} /> +91 8188881661
          </a>
        </div>
      </div>

      <div className="container flex h-16 items-center">
        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus:ring-2 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
            <SheetHeader className="p-6 border-b">
              <SheetTitle className="flex items-center gap-2">
                <Logo />
              </SheetTitle>
            </SheetHeader>

            <nav className="px-6"></nav>
          </SheetContent>
        </Sheet>
        {/* end of Mobile Menu */}

        <Logo className="mr-6" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog">Blog</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/support">Contact Us</Link>
          </Button>
        </div>

        {/* Right Side Icons */}
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <SearchPanel />
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent relative"
            asChild
          >
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-accent" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};
