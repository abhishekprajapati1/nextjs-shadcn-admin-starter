"use client";
import React from "react";
import { IColor } from "../colors/ListItem";
import ColorSwitcher from "./ColorSwitcher";
import useQueryState from "@/hooks/use-query-state";
interface PersisgtedColorSwitcherProps {
  colors?: Array<IColor[]>;
  className?: string;
}
const PersistedColorSwitcher: React.FC<PersisgtedColorSwitcherProps> = ({
  colors = [],
  className = "",
}) => {
  const { value: colorName, setValue: setColorName } =
    useQueryState<string>("color_name");
  return (
    <ColorSwitcher
      value={colorName || ""}
      onChange={setColorName}
      colors={colors}
      className={className}
    />
  );
};
export default PersistedColorSwitcher;
