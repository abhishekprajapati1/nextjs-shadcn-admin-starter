import React from "react";
import { Loader } from "lucide-react";

const Verifying: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gray-100">
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-[500px] h-[500px] flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-lg gap-4">
          <Loader className="w-20 h-20 text-yellow-500" />
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            Please wait!
          </h2>
          <p className="text-sm font-medium text-yellow-600 tracking-wide">
            Email Verifying ...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verifying;
