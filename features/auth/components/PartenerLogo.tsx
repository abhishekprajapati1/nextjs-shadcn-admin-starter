import React from "react";

interface PartnerLogoProps {
  name: string;
}

export default function PartnerLogo({ name }: PartnerLogoProps) {
  return (
    <div className="flex items-center justify-center h-16 rounded-lg border bg-background/50 hover:bg-accent transition-colors duration-200">
      {/* Replace this with actual logo image */}
      <div className="text-sm font-medium text-muted-foreground">{name}</div>
    </div>
  );
}
