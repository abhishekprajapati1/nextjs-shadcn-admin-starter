import { Button, ProcessIndicator } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Camera, ChevronLeft, Pencil } from "lucide-react";
import { PurchaseStore } from ".";
import React from "react";
import useSessionStorage from "@/hooks/use-session-storage";
import { HiPencil } from "react-icons/hi";
import PrescriptionForm from "./PrescriptionForm";
import PrescriptionImageForm from "./PrescriptionImageForm";
import { cn } from "@/lib/utils";
import { PurchaseStepProps } from "./SelectPowerType";

const SetPrescription: React.FC<
  PurchaseStepProps & { isPending?: boolean }
> = ({ control, isPending }) => {
  const { setValue: setPurchaseStore, value: purchaseStore } =
    useSessionStorage<PurchaseStore>("purchase_store");
  const [fillup, setFillup] = React.useState(false);
  const [photo, setPhoto] = React.useState(false);
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
        <div
          className={cn(
            "w-full h-20 rounded-lg flex items-center justify-between cursor-pointer border hover:border-primary animate-smooth px-4",
            purchaseStore?.data?.prescription?.type === "fillup" &&
              "border-2 border-primary",
          )}
          onClick={() => {
            // set the type of prescription right here
            setPurchaseStore(
              (prev) =>
                ({
                  ...prev,
                  data: {
                    ...prev.data,
                    prescription:
                      prev.data?.prescription?.type === "fillup"
                        ? {
                            ...prev.data?.prescription,
                            type: "fillup",
                          }
                        : { type: "fillup" },
                  },
                }) as PurchaseStore,
            );
            // open the prescription fillup form
            setFillup(true);
          }}
        >
          <div className="flex flex-col items-start gap-1">
            <h3>Fill it online</h3>
            <p className="text-primary/60">
              Fill it manually according to your printed prescription
            </p>
          </div>
          <div>
            <HiPencil className="size-10 text-primary/60" />
          </div>
        </div>
        <PrescriptionForm
          control={control}
          open={fillup}
          onOpenChange={setFillup}
        />
        <span className="text-4xl text-primary/20 font-bold mx-auto">or</span>
        <div
          className={cn(
            "w-full h-20 rounded-lg flex items-center justify-between cursor-pointer border hover:border-primary animate-smooth px-4",
            purchaseStore?.data?.prescription?.type === "photo" &&
              "border-2 border-primary",
          )}
          onClick={() => {
            // set the type of prescription right here
            setPurchaseStore(
              (prev) =>
                ({
                  ...prev,
                  data: {
                    ...prev.data,
                    prescription:
                      prev.data?.prescription?.type === "photo"
                        ? {
                            ...prev.data?.prescription,
                            type: "photo",
                          }
                        : { type: "photo" },
                  },
                }) as PurchaseStore,
            );
            // open the prescription fillup form
            setPhoto(true);
          }}
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
        </div>
        <PrescriptionImageForm
          control={control}
          open={photo}
          onOpenChange={setPhoto}
        />
      </div>
      <div className="flex items-center gap-2 justify-center mt-4">
        <Button type="submit" variant="ghost">
          <ProcessIndicator btnText="Add To Cart" isProcessing={isPending} />.
        </Button>
        <Button type="submit">Ready To Checkout</Button>
      </div>
    </div>
  );
};
export default SetPrescription;
