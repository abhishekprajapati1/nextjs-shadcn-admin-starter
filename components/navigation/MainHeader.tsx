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
  Phone,
  Facebook,
  PhoneCallIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Logo from "./Logo";

const categories = [
  {
    title: "Eyeglasses",
    href: "/eyeglasses",
    description: "Find your perfect pair of prescription glasses",
    items: [
      { title: "Men", href: "/eyeglasses/men" },
      { title: "Women", href: "/eyeglasses/women" },
      { title: "Kids", href: "/eyeglasses/kids" },
    ],
  },
  // ... (other categories remain the same)
];

export function MainHeader() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
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
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

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
              href="https://facebook.com"
              className="text-secondary-foreground text-xs font-medium flex items-center gap-1 hover:text-primary"
            >
              <Facebook size={"1rem"} /> Facebook
            </Link>
            <Link
              href="https://instagram.com"
              className="text-secondary-foreground text-xs font-medium flex items-center gap-1 hover:text-primary"
            >
              <InstagramLogoIcon /> Instagram
            </Link>
            <Link
              href="https://twitter.com"
              className="text-secondary-foreground text-xs font-medium flex items-center gap-1 hover:text-primary"
            >
              <TwitterLogoIcon /> Twitter
            </Link>
          </div>
          <a
            className="flex items-center gap-1 text-xs font-semibold"
            href="tel:6388233466"
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
                {/* <Glasses className="h-5 w-5" />
                Akku Ka Chasma */}
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav className="px-6">
              {categories.map((category) => (
                <div
                  key={category.title}
                  className="py-4 border-b last:border-0"
                >
                  <Link
                    href={category.href}
                    className="flex items-center justify-between text-lg font-medium hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.title}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <div className="mt-2 space-y-1">
                    {category.items.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="block py-2 text-sm text-muted-foreground hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2 transition-transform hover:scale-105"
        >
          {/* <Glasses className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">
            Akku Ka Chasma
          </span> */}
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {categories.map((category) => (
              <NavigationMenuItem key={category.title}>
                <NavigationMenuTrigger className="h-10 px-4 py-2">
                  {category.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium">{category.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {category.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="group rounded-lg border p-4 hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium group-hover:text-primary">
                            {item.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Icons */}
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-accent"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
            <kbd className="ml-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          <Button variant="ghost" size="sm" className="hover:bg-accent" asChild>
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              <Badge className="ml-1 hidden sm:inline-flex">0</Badge>
            </Link>
          </Button>

          <Button variant="ghost" size="sm" className="hover:bg-accent" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="ml-1 hidden sm:inline-flex">0</Badge>
            </Link>
          </Button>

          <Button
            variant="default"
            size="sm"
            className="hidden sm:inline-flex"
            asChild
          >
            <Link href="/login">
              <User className="mr-2 h-5 w-5" />
              Login
            </Link>
          </Button>
        </div>
      </div>

      {/* Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Search for frames, sunglasses, lenses... (ESC to close)" />
        <CommandList>
          <CommandEmpty>
            <div className="flex flex-col items-center py-4">
              <Search className="h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                No results found.
              </p>
            </div>
          </CommandEmpty>
          <CommandGroup heading="Quick Links">
            {categories.map((category) =>
              category.items.map((item) => (
                <CommandItem
                  key={item.href}
                  onSelect={() => {
                    setIsSearchOpen(false);
                    router.push(item.href);
                  }}
                >
                  <ChevronRight className="mr-2 h-4 w-4" />
                  {item.title}
                </CommandItem>
              )),
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
