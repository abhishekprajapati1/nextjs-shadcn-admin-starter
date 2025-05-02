"use client";

import React from "react";

function TestPage() {
  const [files, setFiles] = React.useState<File[]>([]);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex gap-4 w-full">
        {/* <div className="flex-shrink-0 w-[200px]">eyeglass trends</div> */}
      </div>
    </div>
  );
}

export default TestPage;
