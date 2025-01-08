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
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Glasses,
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  {
    title: "Sunglasses",
    href: "/sunglasses",
    description: "Protect your eyes with stylish sunglasses",
    items: [
      { title: "Men", href: "/sunglasses/men" },
      { title: "Women", href: "/sunglasses/women" },
      { title: "Kids", href: "/sunglasses/kids" },
    ],
  },
  {
    title: "Contact Lenses",
    href: "/contact-lenses",
    description: "Browse our collection of contact lenses",
    items: [
      { title: "Daily", href: "/contact-lenses/daily" },
      { title: "Monthly", href: "/contact-lenses/monthly" },
      { title: "Colored", href: "/contact-lenses/colored" },
    ],
  },
];

export function MainHeader() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Toggle search dialog with keyboard shortcut
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Mobile Menu Trigger */}
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
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-4">
              {categories.map((category) => (
                <div key={category.title} className="space-y-3">
                  <Link
                    href={category.href}
                    className="text-lg font-semibold hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.title}
                  </Link>
                  <div className="ml-4 space-y-2">
                    {category.items.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="block text-muted-foreground hover:text-primary"
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
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Glasses className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            Akku Ka Chasma
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {categories.map((category) => (
              <NavigationMenuItem key={category.title}>
                <NavigationMenuTrigger>{category.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="grid gap-1">
                      <h3 className="font-medium leading-none">
                        {category.description}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {category.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          )}
                        >
                          <div className="text-sm font-medium leading-none">
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

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Search Trigger */}
          <Button
            variant="ghost"
            className="px-0 text-base hover:bg-transparent focus:ring-2"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-6 w-6" />
            <span className="sr-only">Search products</span>
            <kbd className="pointer-events-none ml-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          {/* Wishlist */}
          <Button
            variant="ghost"
            className="px-0 text-base hover:bg-transparent focus:ring-2"
            asChild
          >
            <Link href="/wishlist">
              <Heart className="h-6 w-6" />
              <span className="sr-only">View wishlist</span>
            </Link>
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            className="px-0 text-base hover:bg-transparent focus:ring-2"
            asChild
          >
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">View cart</span>
            </Link>
          </Button>

          {/* Login */}
          <Button
            variant="ghost"
            className="hidden px-0 text-base hover:bg-transparent focus:ring-2 sm:flex"
            asChild
          >
            <Link href="/login">
              <User className="h-6 w-6" />
              <span className="ml-2">Login</span>
              <span className="sr-only">Login to your account</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Search for frames, sunglasses, lenses..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Links">
            <CommandItem
              onSelect={() => {
                setIsSearchOpen(false);
                router.push("/eyeglasses/men");
              }}
            >
              Men's Eyeglasses
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setIsSearchOpen(false);
                router.push("/eyeglasses/women");
              }}
            >
              Women's Eyeglasses
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setIsSearchOpen(false);
                router.push("/sunglasses");
              }}
            >
              Sunglasses Collection
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
