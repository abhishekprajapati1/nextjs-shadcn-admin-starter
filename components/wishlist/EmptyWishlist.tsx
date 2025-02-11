import { HeartOff } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const EmptyWishlist = () => {
  return (
    <div className="container min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 animate-fade-in">
      <HeartOff className="h-16 w-16 text-muted-foreground mb-4" />
      <h1 className="text-2xl font-bold text-center mb-2">
        Your wishlist is empty
      </h1>
      <p className="text-muted-foreground text-center mb-6">
        Add items to your wishlist to keep track of products you love.
      </p>
      <Button asChild>
        <Link href="/eyeglasses">Start Shopping</Link>
      </Button>
    </div>
  )
}
export default EmptyWishlist;