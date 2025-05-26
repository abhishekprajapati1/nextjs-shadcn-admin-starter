"use client";

import React from "react";

function TestPage() {
  const [files, setFiles] = React.useState<File[]>([]);
  return (
    <div className="w-full h-full flex gap-4 items-center justify-center">
      <div className="flex gap-4 w-full max-w-[700px] aspect-[8/3] bg-red-400">
        {/* <div className="flex-shrink-0 w-[200px]">eyeglass trends</div> */}
      </div>
      <div className="flex gap-4 w-full max-w-[700px] aspect-[8/3] bg-red-400">
        {/* <div className="flex-shrink-0 w-[200px]">eyeglass tends</div> */}
      </div>
    </div>
  );
}

export default TestPage;
