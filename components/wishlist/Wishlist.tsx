"use client";
import { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2, HeartOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EmptyWishlist from "@/components/wishlist/EmptyWishlist";
import { Metadata } from "next";
import { initialWishlistItems } from "@/app/wishlist/data";

export const metadata: Metadata = {
  title: "My Wishlist | Akku Ka Chasma",
  description:
    "View and manage your saved eyewear items from Akku Ka Chasma. Find your favorite eyeglasses, sunglasses, and contact lenses all in one place.",
  keywords: [
    "wishlist",
    "saved items",
    "favorite eyewear",
    "akku ka chasma wishlist",
    "eyeglasses wishlist",
    "sunglasses collection",
    "saved for later",
  ],
  openGraph: {
    title: "My Wishlist | Akku Ka Chasma",
    description:
      "View and manage your saved eyewear items from Akku Ka Chasma. Find your favorite eyeglasses, sunglasses, and contact lenses all in one place.",
    url: "https://akkukachasma.com/wishlist",
    siteName: "Akku Ka Chasma",
    type: "website",
  },
};

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const removeFromWishlist = (itemId: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  if (wishlistItems.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="container py-8 min-h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground mt-1">
            {wishlistItems.length} items saved
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Clear Wishlist
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear your wishlist?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove all
                items from your wishlist.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={clearWishlist}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Clear All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="group relative">
            <CardHeader className="relative aspect-square">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain rounded-t-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFromWishlist(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {item.description}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{item.price.toLocaleString()}</p>
                  <span className="text-sm text-muted-foreground">
                    {item.category}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-4">
              <Button
                className="w-full"
                disabled={!item.inStock}
                variant={item.inStock ? "default" : "outline"}
              >
                {item.inStock ? (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </>
                ) : (
                  "Out of Stock"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Wishlist;
