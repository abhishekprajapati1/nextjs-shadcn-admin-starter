import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServerError: React.FC = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted animate-smooth">
      <div className="w-[400px] p-8 bg-card rounded-3xl shadow-2xl border border-border/50 flex flex-col items-center justify-center gap-6 text-center animate-fade-in">
        {/* Icon with animation */}
        <div className="p-4 bg-destructive/10 rounded-full animate-pulse">
          <AlertTriangle className="w-16 h-16 text-destructive" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-destructive">Oops!</h2>

        {/* Description */}
        <p className="text-muted-foreground">
          Something went wrong. Please check the link or try again later.
        </p>

        {/* Button */}
        <Button
          className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ServerError;