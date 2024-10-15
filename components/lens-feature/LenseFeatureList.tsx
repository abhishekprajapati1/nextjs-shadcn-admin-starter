"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { showEditModal } from "@/store/lense-feature/modal.slice";
import { showDeleteModal } from "@/store/lense-feature/modal.slice";
import LenseFeature from "./LenseFeature";

const LenseFeatureList = () => {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      <LenseFeature />
      <LenseFeature />
      <LenseFeature />
    </div>
  );

  return (
    <div className="flex flex-row gap-4 mt-4">
      {/* First card */}
      <div className="relative bg-white border border-sky-400 rounded-lg p-6 flex items-center space-x-4 w-1/2 sm:w-1/2 hover:border-sky-600 transition-all">
        <Image
          src="/chasma.png"
          alt="Single Vision Lens"
          width={200}
          height={200}
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            Hard Coat Lens
          </h3>
          <p className="text-sm text-gray-500">
            This lens comes with hard-coat technology that gives you protection
            from scratches only.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => dispatch(showEditModal(true))}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaRegEdit className="w-5 h-5 text-green-500" />
          </Button>
          <Button
            className="text-red-500 hover:text-red-700"
            onClick={() => dispatch(showDeleteModal(true))}
          >
            <MdDelete className="w-5 h-5 text-red-1000" />
          </Button>
        </div>
      </div>

      {/* Second card */}
      <div className="relative bg-white border border-sky-400 rounded-lg p-6 flex items-center space-x-4 w-1/2 sm:w-1/2 hover:border-sky-600 transition-all">
        <Image
          src="/chasma.png"
          alt="Single Vision Lens"
          width={200}
          height={200}
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            Progressive Lens
          </h3>
          <p className="text-sm text-gray-500">
            Distance and Reading in the same lens but that reading area is not
            visible.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => dispatch(showEditModal(true))}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaRegEdit className="w-5 h-5 text-green-500" />
          </Button>
          <Button
            className="text-red-500 hover:text-red-700"
            onClick={() => dispatch(showDeleteModal(true))}
          >
            <MdDelete className="w-5 h-5 text-red-1000" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LenseFeatureList;
