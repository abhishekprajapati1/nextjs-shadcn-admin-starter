"use client";
import Logo from "@/components/navigation/Logo";
import FileInput from "@/components/ui/file-input";
import FilePreview from "@/components/ui/file-input/FilePreview";
import React from "react";
function TestPage() {
  const [files, setFiles] = React.useState<File[]>([]);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Logo />
    </div>
  );
}

export default TestPage;
