import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "qs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parse(value: string) {
  try {
    return JSON.parse(value);
  } catch (e) {
    console.error(e);
    return value;
  }
}
export const bytesToMB = (bytes: number): number => {
  try {
    return Number((bytes / 1024 / 1024).toFixed(2));
  } catch (e) {
    return 0;
  }
};

export const capitalizeFirstLetter = (string?: string): string => {
  try {
    if (string) {
      return string?.charAt(0)?.toUpperCase() + string?.slice(1);
    }
    return "";
  } catch (err) {
    console.error(err);
    return "";
  }
};

export const convertTo12HourFormat = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);

  let formattedHours = hours % 12;
  if (formattedHours === 0) {
    formattedHours = 12;
  }

  const amOrPm = hours < 12 ? "AM" : "PM";

  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;
};

export type GenerateQueryStringParams = {
  [key: string]: string | undefined;
};
export const generateQueryString = (
  filters?: GenerateQueryStringParams,
): string => {
  const validFilters = () => {
    if (!filters) return {};
    return Object.keys(filters).reduce(
      (accumlator: GenerateQueryStringParams, key) => {
        if (filters[key]) {
          accumlator[key] = filters[key];
        }
        return accumlator;
      },
      {},
    );
  };

  return qs.stringify(validFilters());
};
