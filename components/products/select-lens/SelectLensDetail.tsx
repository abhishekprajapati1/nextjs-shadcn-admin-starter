import { DialogTitle } from "@/components/ui/dialog";
import { PurchaseStepProps } from "./SelectPowerType";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { PurchaseStore } from ".";
import useSessionStorage from "@/hooks/use-session-storage";
import MultiCardSlider from "@/components/ui/swiper/MultiCardSlider";
import LensDetailTemplate from "./LensDetailTemplate";
import useLensDetails from "@/lib/queries/admin/lens-details/useLensDetails";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";

import React from "react";

const SelectLensDetail: React.FC<PurchaseStepProps> = ({
  onNext,
  onBack,
  control,
}) => {
  const { value: purchaseStore, setValue: setPurchaseStore } =
    useSessionStorage<PurchaseStore>("purchase_store");

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLensDetails({
      lens_feature_id: purchaseStore?.data?.lens_feature_id,
    });
  const elementRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  });

  return (
    <div className="flex flex-col gap-10 overflow-auto">
      <DialogTitle className="items-center flex gap-2">
        <Button
          title="Back to power type selection"
          size="icon"
          variant="ghost"
          onClick={() =>
            setPurchaseStore((prev) => {
              return {
                ...prev,
                step: prev.step - 1,
              } as PurchaseStore;
            })
          }
        >
          <ChevronLeft />
        </Button>
        <span> Select Lens Detail</span>
      </DialogTitle>
      <div className="  lg:w-[900px] h-[620px] xl:w-full overflow-auto grid grid-cols-12">
        <div className="col-span-6 md:col-span-3 flex flex-col">
          <div className="h-52 border border-primary/30 flex-shrink-0" />
          <div className="flex flex-col flex-grow">
            <div
              title="Power Range"
              className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2"
            >
              <span className="line-clamp-1">Power Range</span>
            </div>
            <div
              title="Index/Thickness"
              className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2"
            >
              <span className="line-clamp-1">Index/Thickness</span>
            </div>
            <div
              title="Warrenty Period"
              className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2"
            >
              <span className="line-clamp-1">Warrenty Period</span>
            </div>
            <div
              title="lue Light Blocker"
              className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2"
            >
              <span className="line-clamp-1">Blue Light Blocker</span>
            </div>
            <div
              title="Breakage & Crack Resistance"
              className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2"
            >
              <span className="line-clamp-1">
                Breakage &amp; Crack Resistance
              </span>
            </div>
            <div
              title="Both Side Anti Refelective Coating"
              className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2"
            >
              <span className="line-clamp-1">
                Both Side Anti Refelective Coating
              </span>
            </div>
            <div
              title="UV Protection"
              className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2"
            >
              <span className="line-clamp-1">UV Protection</span>
            </div>
            <div
              title="Water & Dust Protection (Hydrophobic)"
              className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2"
            >
              <span className="line-clamp-1">
                Water &amp; Dust Protection (Hydrophobic)
              </span>
            </div>
            <div
              title="Lens ID"
              className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2"
            >
              <span className="line-clamp-1">Lens ID</span>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-9">
          <MultiCardSlider
            template={LensDetailTemplate}
            navigation
            height={620}
            data={data}
            className="!px-0"
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              "@0.75": {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 0,
              },
            }}
            templateRef={elementRef}
          />
        </div>
      </div>
    </div>
  );
};
export default SelectLensDetail;
