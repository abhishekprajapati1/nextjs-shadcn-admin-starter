"use client";
import React from "react";
import { IFile } from "@/lib/types";
import { prescriptionSchema } from "@/lib/validations/admin/product.validation";
import Image from "next/image";
import { z } from "zod";
import Modal from "../ui/modal";
import { Button } from "../ui/button";
import { Expand } from "lucide-react";

interface PrescriptionDetailsProps {
  data: z.infer<typeof prescriptionSchema>;
}
const PrescriptionDetails: React.FC<PrescriptionDetailsProps> = ({ data }) => {
  const [expand, setExpand] = React.useState(false);
  if (data.type === "photo") {
    return (
      <React.Fragment>
        <Modal open={expand} onOpenChange={setExpand} showCloseIcon>
          <Image
            src={(data.image as unknown as IFile)?.url || ""}
            alt="Prescription Image"
            width={400}
            height={200}
            className="w-full h-full"
          />
        </Modal>
        <div className="w-full h-full relative group">
          <Image
            src={(data.image as unknown as IFile)?.url || ""}
            alt="Prescription Image"
            width={400}
            height={200}
            className="w-full h-full"
          />
          <div className="absolute hidden inset-0 bg-black bg-opacity-50 text-white p-2 group-hover:grid place-content-center">
            <Button
              type="button"
              onClick={() => setExpand(true)}
              title="Click to expand the image"
              variant="ghost"
              className="!text-white hover:bg-black/10"
              size="icon"
            >
              <Expand className="size-4" />
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <table className="w-full h-full text-left text-xs font-light tracking-wide">
      <thead className="border-b font-medium">
        <tr>
          <th scope="col" className="px-4 py-2">
            #
          </th>
          <th scope="col" className="px-4 py-2">
            Spherical (SPH)
          </th>
          <th scope="col" className="px-4 py-2">
            Cylindrical (CYL)
          </th>
          <th scope="col" className="px-4 py-2">
            Pupil Distance (PD)
          </th>
          <th scope="col" className="px-4 py-2">
            Add
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="whitespace-nowrap px-4 py-2 font-medium">RIGHT</td>
          <td className="whitespace-nowrap px-4 py-2">{data.right_sph}</td>
          <td className="whitespace-nowrap px-4 py-2">{data.right_cyl}</td>
          <td className="whitespace-nowrap px-4 py-2">{data.right_axis}</td>
          <td className="whitespace-nowrap px-4 py-2">{data.right_add}</td>
        </tr>
        <tr className="border-b">
          <td className="whitespace-nowrap px-4 py-2 font-medium">LEFT</td>
          <td className="whitespace-nowrap px-4 py-2">{data.left_sph}</td>
          <td className="whitespace-nowrap px-4 py-2">{data.left_cyl}</td>
          <td className="whitespace-nowrap px-4 py-2">{data.left_axis}</td>
          <td className="whitespace-nowrap px-4 py-2">{data.left_add}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default PrescriptionDetails;
