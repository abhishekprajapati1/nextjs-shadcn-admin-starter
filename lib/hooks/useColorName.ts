import React from "react";
import { IProductColor } from "../types";

export const getColorName = (product_color: IProductColor): string => {
  if (product_color) {
    const value = product_color.colors
      ?.map((c) => `${c.name}-${c.color}`)
      .join("-and-");
    return value;
  }
  return "";
};

const useColorName = ({
  product_color,
}: {
  product_color: IProductColor;
}): string => {
  const [colorName, setColorName] = React.useState<string>("");
  React.useEffect(() => {
    const value = getColorName(product_color);
    if (value) setColorName(value);
  }, [product_color]);
  return colorName;
};
export default useColorName;
