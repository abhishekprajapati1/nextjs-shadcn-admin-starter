import { IconInterface } from "@/lib/types";
import React from "react";

const WitnessIcon: React.FC<IconInterface> = (props) => {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2"></path>
      <path d="M9.5 15a3.5 3.5 0 0 0 5 0"></path>
      <path d="M15 11l.01 0"></path>
      <path d="M9 11l.01 0"></path>
    </svg>
  );
};

export default WitnessIcon;
