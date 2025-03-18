import first from "@/public/auth-banner.png";
import second from "@/public/aviator.jpg";
import third from "@/public/chasma.png";
import { StaticImageData } from "next/image";

export interface ImageProps {
  src: string | StaticImageData;
  alt: string;
}

export const images: ImageProps[] = [
  { src: first, alt: "First" },
  { src: second, alt: "Second" },
  { src: third, alt: "Third" },
  { src: second, alt: "Second" },
  { src: third, alt: "Third" },
];
