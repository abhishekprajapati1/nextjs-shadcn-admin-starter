"use client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { IColor } from "../colors/ListItem";

interface ColorSwitcherProps {
  colors?: IColor[];
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
        const isActive = `${color.name}-${color.color}` === activeColor;
        return (
          <div key={color.id} className="flex items-center">
            <RadioGroupItem
              value={`${color.name}-${color.color}`}
              id={color.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={color.id}
              className={cn(
                "h-8 w-8 rounded-full border border-gray-200 cursor-pointer ring-offset-background transition-all hover:scale-110",
                "peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-offset-2",
                "peer-data-[state=checked]:ring-black",
              )}
              style={{ backgroundColor: color.color }}
            >
              <span className="sr-only">{color.name}</span>
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default ColorSwitcher;
