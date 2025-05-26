import { IWrapper } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";

const PageWrapper: React.FC<IWrapper & { className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div className={cn("p-4 lg:px-10 w-full overflow-auto", className)}>
      {children}
    </div>
  );
};

export default PageWrapper;
