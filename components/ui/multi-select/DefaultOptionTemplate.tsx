"use client";
import React from "react";
import { OptionTemplateProps } from ".";

const DefaultOptionTemplate: React.FC<OptionTemplateProps> = ({
  label,
  value,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect()}
      className="flex items-center p-2 animate-smooth rounded hover:bg-primary hover:text-primary-foreground cursor-pointer"
    >
      <span className="mr-2">{label}</span>
    </div>
  );
};

export default DefaultOptionTemplate;
