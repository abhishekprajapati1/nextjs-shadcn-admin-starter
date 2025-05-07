"use client";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import React from "react";
import { cn } from "@/lib/utils";

const WishlistButton = () => {
  const [wishlisted, setWishlisted] = React.useState(false);
  return (
    <Button
      onClick={() => setWishlisted(!wishlisted)}
      size="icon"
      variant="ghost"
      className="flex-shrink-0"
    >
      <Heart
        {...(wishlisted && { fill: "currentColor" })}
        className={cn(
          "animate-smooth text-gray-500",
          wishlisted && "text-primary",
        )}
      />
    </Button>
  );
};
export default WishlistButton;
