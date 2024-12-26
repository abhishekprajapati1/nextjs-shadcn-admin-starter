"use client";

import React, { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PlusIcon from "@/components/icons/PlusIcon";
import { InputOption } from "@/lib/types";

interface MultiSelectInputProps {
  value: string[] | undefined;
  onChange: (value: string[]) => void;
  options: InputOption[];
  label?: string;
  id: string;
}

const MultiSelect: FC<MultiSelectInputProps> = ({
  id,
  label,
  value,
  onChange,
  options,
}) => {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      setTags(value);
    }
  }, [value]);

  const handleSetValue = (val: string) => {
    let updatedTags: string[];
    if (tags.includes(val)) {
      updatedTags = tags.filter((tag) => tag !== val);
    } else {
      updatedTags = [...tags, val];
    }
    setTags(updatedTags);
    onChange(updatedTags);
  };

  const handleTagRemove = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    onChange(updatedTags);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {label && (
        <label htmlFor={id} className="mb-2 block font-medium">
          {label}
        </label>
      )}
      <div className="flex gap-2 flex-wrap justify-start w-full mb-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center gap-1 px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium"
          >
            {options.find((option) => option.value === tag)?.label}
            <button
              type="button"
              className="ml-2 text-red-500"
              onClick={() => handleTagRemove(tag)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-fit justify-between"
        >
          <span className="text-sm font-normal text-secondary-foreground/70">
            Select...
          </span>
          <PlusIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-fit p-0">
        <Command>
          <CommandGroup>
            <CommandList>
              {options.map((option) => (
                <CommandItem
                  id={id}
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSetValue(option.value)}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;
