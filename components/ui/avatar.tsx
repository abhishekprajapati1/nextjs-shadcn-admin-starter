import { cn } from "@/lib/utils";
import Image from "next/image";

const avatarSizes = {
  xs: "size-[30px]",
  sm: "size-[35px]",
  md: "size-[45px]",
  lg: "size-[55px]",
  xl: "size-[65px]",
  "2xl": "size-[75px]",
  "3xl": "size-[85px]",
  "4xl": "size-[90px]",
  "5xl": "size-[95px]",
  "6xl": "size-[100px]",
};

const fallbackSizes = {
  xs: "text-[16px]",
  sm: "text-[18px]",
  md: "text-[20px]",
  lg: "text-[24px]",
  xl: "text-[28px]",
  "2xl": "text-[32px]",
  "3xl": "text-[36px]",
  "4xl": "text-[40px]",
  "5xl": "text-[44px]",
  "6xl": "text-[48px]",
};

interface AvatarProps {
  size?: keyof typeof avatarSizes;
  className?: string;
  src?: string;
  fallback?: string;
  fallbackClass?: string;
  alt: string;
}

const Avatar: React.FC<AvatarProps> = ({
  className = "",
  fallback = "A",
  fallbackClass = "",
  size = "md",
  src,
  alt,
}) => {
  return (
    <div
      className={cn(
        "rounded-full flex-shrink-0 overflow-hidden",
        !src ? "bg-[#5C5A68]" : "",
        avatarSizes[size],
        className,
      )}
    >
      {src && (
        <Image
          src={src}
          loading="lazy"
          className="size-full object-contain"
          width={100}
          height={100}
          alt={alt}
        />
      )}

      {!src && (
        <div
          className={cn(
            "size-full grid place-content-center font-semibold text-white",
            fallbackSizes[size],
            fallbackClass,
          )}
        >
          {fallback}
        </div>
      )}
    </div>
  );
};
export default Avatar;
