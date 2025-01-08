import { IWrapper } from "@/lib/types";
import { Glasses } from "lucide-react";
import Link from "next/link";
import React from "react";
interface AuthHeaderProps extends IWrapper {}
const AuthHeader: React.FC<AuthHeaderProps> = ({ children }) => {
  return (
    <nav className="container mx-auto p-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Glasses className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">Akku Ka Chasma</span>
        </Link>
        {children}
      </div>
    </nav>
  );
};

export default AuthHeader;
