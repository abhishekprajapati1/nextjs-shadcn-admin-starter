"use client";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store";
import { FaRegEdit } from "react-icons/fa";
import { PiSquaresFour } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

const HeaderButton = () => {
  const dispatch = useAppDispatch();
  return (
    <PageHeader
      title="Blogs"
      className="flex-shrink-0 border-2 border-red-500 py-14"
    >
      <div className="shadow-[0_0_60px_15px_rgba(0,0,0,0.1)] w-full flex justify-between px-6 py-4 rounded-3xl">
        <Button variant={"ghost"} size={"icon"} title="View">
          <PiSquaresFour className="w-10 h-10 text-black font-bold" />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          title="logout"
          className="bg-slate-200"
        >
          <TbLogout className="w-5 h-5 text-gray-500" />
        </Button>
      </div>
    </PageHeader>
  );
};

export default HeaderButton;
