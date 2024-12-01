"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PlusIcon from "@/components/icons/PlusIcon";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export default function MultiSelect() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string[]>([]);

  const handleSetValue = (val: string) => {
    if (value.includes(val)) {
      value.splice(value.indexOf(val), 1);
      setValue(value.filter((item) => item !== val));
    } else {
      setValue((prevValue) => [...prevValue, val]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex gap-2 flex-wrap justify-start w-[200px]">
        {value?.length
          ? value.map((val, i) => (
              <div
                key={i}
                className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium"
              >
                {frameworks.find((framework) => framework.value === val)?.label}
              </div>
            ))
          : "select"}
      </div>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {/* <div className="flex gap-2 justify-start">
            {value?.length
              ? value.map((val, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium"
                  >
                    {
                      frameworks.find((framework) => framework.value === val)
                        ?.label
                    }
                  </div>
                ))
              : "Select framework..."}
          </div> */}
          Select framework...
          <PlusIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            <CommandList>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => {
                    handleSetValue(framework.value);
                  }}
                >
                  {framework.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
