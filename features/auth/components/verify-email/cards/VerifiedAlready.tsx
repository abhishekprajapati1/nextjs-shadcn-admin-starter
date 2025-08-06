import React from "react";
import { CheckCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface VerifiedAlreadyProps {
  email: string;
}

export default function VerifiedAlready({ email }: VerifiedAlreadyProps) {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted animate-smooth">
      <div className="w-full max-w-[90%] sm:max-w-[500px] p-6 sm:p-8 bg-card rounded-3xl shadow-2xl border border-border/50 flex flex-col items-center justify-center gap-4 sm:gap-6 text-center animate-fade-in">
        {/* Icon with animation */}
        <div className="p-4 bg-success/10 rounded-full animate-bounce">
          <CheckCircle className="w-16 h-16 text-success" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-accent-foreground">
          Already Verified!
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-lg text-muted-foreground">
          {email} has already been verified.
        </p>

        {/* Action Button */}
        <Button onClick={() => router.push("/login")} className="mt-4">
          <LogIn className="w-4 h-4 mr-2" />
          Go to Login
        </Button>
      </div>
    </div>
  );
}
