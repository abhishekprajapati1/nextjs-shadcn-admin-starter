import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
interface LogoProps {
  className?: string;
}
const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <Link
      href="/"
      className={cn("inline-block w-[300px]  sm:w-[450px]", className)}
    >
      <Image
        src="/Logo.png"
        alt="Logo"
        width={800}
        height={400}
        className="w-full h-full"
      />
    </Link>
  );
};

export default Logo;
