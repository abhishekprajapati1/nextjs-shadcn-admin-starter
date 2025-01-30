import React from "react";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";

type TokenExpiredProps = {
  message: string;
  onClick: () => void;
};

const TokenExpired: React.FC<TokenExpiredProps> = ({ message, onClick }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-[500px] h-[500px] flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-lg gap-4">
        <CircleX className="w-20 h-20 text-destructive" />
        <h2 className="text-2xl font-semibold text-destructive mt-4 text-center">
          {message}
        </h2>
        <Button
          onClick={onClick}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Try Again!
        </Button>
      </div>
    </div>
  );
};

export default TokenExpired;
