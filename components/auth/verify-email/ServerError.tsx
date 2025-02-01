import React from "react";
import { Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServerError: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gray-100">
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-[500px] h-[500px] flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-lg gap-4">
          <Ban className="w-20 h-20 text-destructive" />
          <h2 className="text-2xl font-semibold text-destructive mt-4 text-center">
            Error: No token found. Please check the link.
          </h2>
          <Button
            //   onClick={handleClose}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-green-600"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
