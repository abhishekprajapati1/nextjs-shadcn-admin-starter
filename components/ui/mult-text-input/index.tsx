"use client";
import React, { FC, KeyboardEvent, useEffect, useState } from "react";
import { Input } from "../input";
import Selected from "./Selected";

interface MultiTextInputProps {
  value: string[] | undefined;
  onChange: (value: string[]) => void;
  label?: string;
  id: string;
}

const MultiTextInput: FC<MultiTextInputProps> = ({
  id,
  label,
  value,
  onChange,
}) => {
  const [tags, setTags] = useState<any[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  const handleTagClose = (tagToRemove: string) => {
    let newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onChange(newTags);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue.endsWith(",")) {
      const newKeyword = inputValue.slice(0, -1).trim();
      if (newKeyword && !tags.includes(newKeyword)) {
        const newTags = [...tags, newKeyword];
        setTags(newTags);
        onChange(newTags);
        setKeyword("");
      } else {
        setKeyword("");
      }
    } else {
      setKeyword(inputValue);
    }
  };

  useEffect(() => {
    if (Array.isArray(value)) {
      setTags(value);
    }
  }, [value]);

  return (
    <div className="w-full h-fit">
      {label && (
        <label htmlFor={id} className="mb-6">
          {label}
        </label>
      )}
      <div className="flex items-center flex-wrap gap-1 mb-2">
        {tags.map((tag) => (
          <Selected key={tag} label={tag} onClose={() => handleTagClose(tag)} />
        ))}
      </div>
      <Input
        id={id}
        placeholder="Enter a keyword..."
        value={keyword}
        onChange={(event) => handleKeywordChange(event)}
        // onKeyDown={(event) => handleOnKeyDown(event)}
      />
    </div>
  );
};

export default MultiTextInput;
