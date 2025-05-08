import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Camera, ChevronLeft, Pencil } from "lucide-react";
import { PurchaseStore } from ".";
import React from "react";
import useSessionStorage from "@/hooks/use-session-storage";
import { HiPencil } from "react-icons/hi";

const SetPrescription = () => {
  const { setValue: setPurchaseStore } =
    useSessionStorage<PurchaseStore>("purchase_store");
  return (
    <div className="flex flex-col gap-10">
      <DialogTitle className="items-center flex gap-2">
        <Button
          title="Back to power type selection"
          size="icon"
          variant="ghost"
          onClick={() =>
            setPurchaseStore((prev) => {
              return {
                ...prev,
                step: 3,
              } as PurchaseStore;
            })
          }
        >
          <ChevronLeft />
        </Button>
        <span>Set Prescription</span>
      </DialogTitle>

      <div className="w-full max-w-[550px] mx-auto flex flex-col gap-4">
        <Button
          variant="outline"
          type="button"
          className="w-full h-20 flex items-center justify-between"
        >
          <span className="flex flex-col items-start gap-1">
            <strong>Fill it online</strong>
            <span className="text-primary/60">
              Fill it manually according to your printed prescription
            </span>
          </span>
          <span>
            <HiPencil className="size-10 text-primary/60" />
          </span>
        </Button>
        <span className="text-4xl text-primary/20 font-bold mx-auto">or</span>
        <Button
          variant="outline"
          type="button"
          className="w-full h-20 flex items-center justify-between"
        >
          <span className="flex flex-col items-start gap-1">
            <strong>Upload the image</strong>
            <span className="text-primary/60">
              Upload the photo of your prescription
            </span>
          </span>
          <span>
            <Camera className="size-10 text-primary/60" />
          </span>
        </Button>
      </div>
      <div className="flex items-center gap-2 justify-center mt-4">
        <Button variant="ghost">Add To Cart</Button>
        <Button>Ready To Checkout</Button>
      </div>
    </div>
  );
};
export default SetPrescription;
