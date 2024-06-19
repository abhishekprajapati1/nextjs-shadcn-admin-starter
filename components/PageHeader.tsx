import { IWrapper } from "@/lib/types";
import React from "react";
import { Separator } from "./ui/separator";

interface PageHeaderProps extends IWrapper {
  title: string;
  tagline?: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  children,
  title = "Page Title",
  tagline,
  className = "",
}) => {
  return (
    <React.Fragment>
      <div
        className={`flex w-full px-4 lg:px-10 justify-between items-center gap-4 h-16  ${
          className || ""
        }`}
      >
        <div className="">
          <h3 className="font-bold capitalize tracking-wide">{title}</h3>
          {tagline && <p className="text-xs tracking-wide">{tagline}</p>}
        </div>
        {children}
      </div>
      <Separator />
    </React.Fragment>
  );
};

export default PageHeader;
