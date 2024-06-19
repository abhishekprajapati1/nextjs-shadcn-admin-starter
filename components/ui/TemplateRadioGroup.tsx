"use client";
import { ChangeEvent, FC, FormEvent, Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";

export type TemplateRadioOption = {
  value: string | number;
  label: string;
  icon?: string;
  data?: any;
};

export type TemplateProps = {
  isLast: boolean;
  isChecked: boolean;
  data: TemplateRadioOption;
  onClick: (event: any) => void;
};

type TemplateRadiosTypes = {
  value: any;
  name: string;
  onChange: (arg: ChangeEvent<HTMLInputElement> | any) => void;
  options: TemplateRadioOption[];
  template?: FC<TemplateProps>;
  className?: string;
};

const DefaultTemplate: FC<TemplateProps> = ({ onClick, isChecked, data }) => {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={(e) => onClick(e)}
      className={`gap-2 text-base flex justify-start p-0 bg-transparent hover:bg-transparent`}
    >
      <span
        className={twMerge(
          "grid smooth place-content-center size-5 border-2 rounded-full",
          isChecked && "border-primary"
        )}
      >
        <span
          className={twMerge(
            "block smooth size-3 bg-transparent rounded-full",
            isChecked && "bg-primary"
          )}
        />
      </span>
      <span
        className={twMerge(
          "smooth text-base font-normal",
          isChecked && "text-primary"
        )}
      >
        {data.label}
      </span>
    </Button>
  );
};

const TemplateRadioGroup: FC<TemplateRadiosTypes> = ({
  name,
  value,
  onChange,
  className,
  options = [],
  template = DefaultTemplate,
}) => {
  const Template = template;

  const handleChange = (event: FormEvent<HTMLDivElement>) => {
    onChange((event.target as HTMLInputElement).value);
  };

  const handleInputClick = (event: any) => {
    const target = event.currentTarget;
    let inputElement: HTMLInputElement | null = target.nextSibling;
    inputElement?.click();
  };

  return (
    <div
      aria-labelledby="radios with templates"
      onChange={(event) => handleChange(event)}
      className={twMerge("", className || "")}
    >
      {options.map((item, index) => {
        return (
          <Fragment key={index}>
            <Template
              onClick={handleInputClick}
              isLast={index === options.length - 1}
              isChecked={value == item.value}
              data={item}
            />
            <input
              className="hidden"
              type="radio"
              value={item.value}
              name={name}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

export default TemplateRadioGroup;
