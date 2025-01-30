import React from "react";
import { CheckCircle } from "lucide-react";

const Verified: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gray-100">
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-[500px] h-[500px] flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-lg gap-4">
          <CheckCircle className="w-20 h-20 text-green-500" />
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            Thank you!
          </h2>
          <p className="text-sm font-medium text-green-600 tracking-wide">
            Email successfully verified!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verified;
