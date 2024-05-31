import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";


interface FilePreviewProps {
    file: File | null;
    className?: string;
    defaultUrl?: string;
    defaultUrlType?: string;
    children?: React.ReactNode;
    error?: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ className = "", error, children, defaultUrl, defaultUrlType, file }) => {
    return (
        <div className={twMerge("relative p-6 w-full h-full rounded-3xl bg-[#F8F8F9] text-gray-600 border-2 border-dashed border-gray-200 cursor-pointer overflow-hidden", error && "border-danger bg-danger/5", className)}>

            {
                file && (
                    <div className="w-full h-full">
                        {
                            file?.type?.startsWith("image") && (
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt="Employee Photo"
                                    fill
                                    className="object-cover"
                                />
                            )
                        }
                        {
                            file?.type === 'application/pdf' && (
                                <div className="bg-[#F8F8F9] absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center">
                                    {/* <MdPictureAsPdf className="text-5xl text-gray-400" /> */}
                                    <p className="text-sm mavenpro-medium">{file?.name}</p>
                                </div>
                            )
                        }
                    </div>
                )
            }


            {
                defaultUrl && !file && (
                    <div className="w-full h-full">
                        {defaultUrlType?.startsWith("image") && (
                            <Image
                                src={defaultUrl}
                                alt="Employee Photo"
                                fill
                                className="object-cover"
                            />
                        )}
                        {
                            defaultUrlType?.includes("pdf") && (
                                <div className="bg-[#F8F8F9] absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center">
                                    {/* <MdPictureAsPdf className="text-5xl text-gray-400" /> */}
                                    <p className="text-sm mavenpro-medium">{defaultUrl}</p>
                                </div>
                            )
                        }
                    </div>
                )
            }


            {!defaultUrl && !file && <>{children}</>}

        </div>
    )
};

export default FilePreview;