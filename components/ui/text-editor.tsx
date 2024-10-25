"use client";
import React, { FC } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { cn } from "@/lib/utils";
const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

interface TextEditorProps {
  value: string | undefined;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  id?: string;
}

const TextEditor: FC<TextEditorProps> = ({
  value,
  onChange,
  error = "",
  id = "custom-quill-editor",
  placeholder = "Write here...",
}) => {
  return (
    <div className="w-full h-fit">
      <ReactQuill
        modules={modules}
        formats={formats}
        theme="snow"
        className={cn(`custom-text-editor`, error && "editor-error")}
        placeholder={placeholder}
        style={{
          boxSizing: "border-box",
          padding: 0,
        }}
        value={value}
        onChange={onChange}
        id="custom-quill-editor"
      />
      {error && <small className="text-destructive">{error}</small>}
    </div>
  );
};

const modules = {
  keyboard: { bindings: { tab: false } },
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }],
    [
      {
        color: [
          "#000000",
          "#e60000",
          "#ff9900",
          "#ffff00",
          "#008a00",
          "#0066cc",
          "#9933ff",
          "#ffffff",
          "#facccc",
          "#ffebcc",
          "#ffffcc",
          "#cce8cc",
          "#cce0f5",
          "#ebd6ff",
          "#bbbbbb",
          "#f06666",
          "#ffc266",
          "#ffff66",
          "#66b966",
          "#66a3e0",
          "#c285ff",
          "#888888",
          "#a10000",
          "#b26b00",
          "#b2b200",
          "#006100",
          "#0047b2",
          "#6b24b2",
          "#444444",
          "#5c0000",
          "#663d00",
          "#666600",
          "#003700",
          "#002966",
          "#3d1466",
          "custom_color",
        ],
      },
    ],
    [{ align: "" }, { align: "center" }, { align: "right" }],
    ["bold", "italic", "underline"],
  ],
};

const formats = [
  "header",
  "height",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "color",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "size",
];

export default TextEditor;
