"use client";
import { ILensFeature } from "@/components/lens-features/LensFeature";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form";
import TemplateRadioGroup, {
  TemplateProps,
  TemplateRadioOption,
} from "@/components/ui/TemplateRadioGroup";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import useLensFeatures from "@/lib/queries/admin/lens-features/useLensFeatures";
import usePowerTypes from "@/lib/queries/admin/power-types/usePowerTypes";
import { cn } from "@/lib/utils";
import { purchaseSchema } from "@/lib/validations/admin/product.validation";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Control, useWatch } from "react-hook-form";
import * as z from "zod";
import { PurchaseStore } from ".";
import useSessionStorage from "@/hooks/use-session-storage";

export interface PurchaseStepProps {
  onBack?: () => void;
  onNext?: () => void;
  control?: Control<z.infer<typeof purchaseSchema>>;
}

const SelectLensFeature: React.FC<PurchaseStepProps> = ({
  onNext,
  onBack,
  control,
}) => {
  const { value: purchaseStore, setValue: setPurchaseStore } =
    useSessionStorage<PurchaseStore>("purchase_store");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useLensFeatures();

  const elementRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  });

  const lensFeaturesOptions: TemplateRadioOption[] =
    data?.map((d) => ({
      value: d.id,
      label: d.title || "",
      icon: d.image?.url,
      data: d,
    })) || [];

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
                step: 1,
              } as PurchaseStore;
            })
          }
        >
          <ChevronLeft />
        </Button>
        <span> Select Lens Feature</span>
      </DialogTitle>
      <div className="flex-grow overflow-auto">
        <FormField
          control={control}
          name="lens_feature_id"
          render={({ field }) => (
            <TemplateRadioGroup
              value={field.value}
              onChange={(val) => {
                field.onChange(val);
                setPurchaseStore(
                  (prev) =>
                    ({
                      ...prev,
                      step: 3,
                      data: {
                        ...prev.data,
                        lens_feature_id: val,
                      },
                    }) as PurchaseStore,
                );
              }}
              name="lens_feature_id"
              template={LensFeatureInput as any}
              options={lensFeaturesOptions}
              className="grid grid-cols-12 gap-4"
              templateRef={elementRef}
            />
          )}
        />
      </div>
    </div>
  );
};

const LensFeatureInput = React.forwardRef<
  HTMLDivElement,
  TemplateProps<ILensFeature>
>(({ data, isChecked, isLast, onClick }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "cursor-pointer col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 flex-shrink-0 border p-4 rounded-xl flex flex-col items-center",
        isChecked && "border-primary border-2 bg-primary/10",
      )}
      onClick={(e) => onClick(e)}
    >
      <Image
        src={data?.data?.image?.url || ""}
        alt={data?.data?.title || ""}
        width={100}
        height={80}
        className="rounded-md"
      />
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-medium">{data?.data?.title || ""}</p>
        <p className="text-xs text-gray-500 text-center">
          {data?.data?.description || ""}
        </p>
      </div>
    </div>
  );
});

LensFeatureInput.displayName = "LensFeatureInput";

export default SelectLensFeature;
