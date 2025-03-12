"use client";
import FileInput from "@/components/ui/file-input";
import FilePreview from "@/components/ui/file-input/FilePreview";
import React from "react";
function TestPage() {
  const [files, setFiles] = React.useState<File[]>([]);
  return (
    <div className="w-full h-full flex items-center justify-center">
      {files.length}
      {files?.length < 4 && (
        <FileInput
          className="size-52"
          multiple
          maxFiles={4 - files.length}
          onChange={(files) =>
            setFiles((prev) => [...prev, ...(files ? files : [])])
          }
        >
          <FilePreview file={null}>upload images (4)</FilePreview>
        </FileInput>
      )}
    </div>
  );
}

export default TestPage;
