import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ServerError() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted animate-smooth">
      <div className="w-full max-w-[90%] sm:max-w-[500px] p-6 sm:p-8 bg-card rounded-3xl shadow-2xl border border-border/50 flex flex-col items-center justify-center gap-4 sm:gap-6 text-center animate-fade-in">
        {/* Icon with animation */}
        <div className="p-4 bg-destructive/10 rounded-full animate-bounce">
          <AlertTriangle className="w-16 h-16 text-destructive" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-accent-foreground">
          Something went wrong!
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-lg text-muted-foreground">
          We encountered an error while verifying your email. Please try again.
        </p>

        {/* Action Button */}
        <Button
          onClick={() => router.push("/forgot-password")}
          className="mt-4"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
