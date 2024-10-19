import { IconInterface } from "@/lib/types";
import React from "react";

const DragDropIcon: React.FC<IconInterface> = (props) => {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeWidth="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19 11v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
      <path d="M13 13l9 3l-4 2l-2 4l-3 -9"></path>
      <path d="M3 3l0 .01"></path>
      <path d="M7 3l0 .01"></path>
      <path d="M11 3l0 .01"></path>
      <path d="M15 3l0 .01"></path>
      <path d="M3 7l0 .01"></path>
      <path d="M3 11l0 .01"></path>
      <path d="M3 15l0 .01"></path>
    </svg>
  );
};

export default DragDropIcon;
