import React from "react";
import { cn } from "@/lib/utils";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsappIcon from "./icons/WhatsappIcon";

interface UnderConstructionProps {
  className?: string;
  whatsappNumber?: string;
  message?: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({
  className,
  whatsappNumber = "+919999999999",
  message = "Hello, I'm interested in Akku Ka Chasma.",
}) => {
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted py-8 animate-smooth text-center",
        className,
      )}
    >
      <div className="rounded-full bg-accent/20 p-6 animate-bounce">
        <Construction className="h-16 w-16 text-accent-foreground" />
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">
        Under Construction
      </h1>
      <p className="mt-2 text-lg text-muted-foreground max-w-xl">
        We're working hard to bring you something amazing! Contact us on
        WhatsApp for more information or inquiries.
      </p>
      <div className="mt-8">
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="flex gap-2 items-center">
            <WhatsappIcon className="h-5 w-5 text-green-500" /> Contact us on WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
};

export default UnderConstruction;
