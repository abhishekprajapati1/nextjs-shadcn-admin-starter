import React from "react";
import Image from "next/image";

function Logo() {
  return (
    <div className="w-full h-10 flex justify-center items-center">
      <Image
        src="/logo.png"
        alt="Logo"
        width={200}
        height={100}
        className="w-full h-full object-contain md:scale-125"
      />
    </div>
  );
}

export default Logo;
