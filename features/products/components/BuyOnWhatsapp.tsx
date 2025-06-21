"use client";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import { Button } from "@/components/ui/button";
import useCurrentUrl from "@/hooks/use-current-url";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const BuyOnWhatsapp = () => {
  const url = useCurrentUrl();
  const message = encodeURIComponent(`
    Hi, I am interested in one of your product. Please contact me.
    The link to the product is: ${url}
    `);
  return (
    <Button
      variant="ghost"
      className="inline-flex items-center gap-2 !text-success hover:bg-success/10"
      asChild
    >
      <Link
        href={`https://api.whatsapp.com/send/?phone=918188881661&text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsappIcon className="w-5 h-5" />
        <span className="font-medium">Buy on WhatsApp</span>
      </Link>
    </Button>
  );
};
export default BuyOnWhatsapp;
