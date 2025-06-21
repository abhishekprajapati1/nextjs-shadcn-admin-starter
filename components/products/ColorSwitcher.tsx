"use client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { IColor } from "../colors/ListItem";
import { getColorName } from "@/lib/hooks/useColorName";

interface ColorSwitcherProps {
  colors?: Array<IColor[]>;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const ColorSwitcher: React.FC<ColorSwitcherProps> = ({
  colors = [],
  onChange,
  value,
  className = "",
}) => {
  const [activeColor, setActiveColor] = React.useState<string>("");

  const handleChange = (val: string) => {
    setActiveColor(val);
    onChange?.(val);
  };

  React.useEffect(() => {
    if (value) {
      setActiveColor(value);
    }
  }, [value]);

  return (
    <RadioGroup
      defaultValue={value}
      value={activeColor}
      onValueChange={handleChange}
      className={cn("flex items-center gap-2", className)}
    >
      {colors.map((color) => {
        const value = getColorName(color);
        const isActive = value === activeColor;
        return (
          <div key={value} className="flex items-center">
            <RadioGroupItem value={value} id={value} className="peer sr-only" />
            <Label
              htmlFor={value}
              className={cn(
                "h-8 w-8 rounded-full flex flex-col overflow-hidden border border-gray-200 cursor-pointer ring-offset-background transition-all hover:scale-110",
                "peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-offset-2",
                "peer-data-[state=checked]:ring-black",
              )}
            >
              {color?.map((c) => {
                return (
                  <span
                    key={c.id}
                    className="size-full inline-block"
                    style={{ backgroundColor: c.color }}
                  />
                );
              })}
              <span className="sr-only">{value}</span>
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default ColorSwitcher;
