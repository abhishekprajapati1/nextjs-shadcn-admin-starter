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

const SelectLensDetail: React.FC<PurchaseStepProps> = ({
  onNext,
  onBack,
  control,
}) => {
  const { value: purchaseStore, setValue: setPurchaseStore } =
    useSessionStorage<PurchaseStore>("purchase_store");
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLensDetails(purchaseStore?.data?.lens_feature_id || "");
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
                step: 2,
                data: {
                  lens_feature_id: prev.data?.lens_feature_id || "",
                  power_type_id: prev.data?.power_type_id || "",
                },
              } as PurchaseStore;
            })
          }
        >
          <ChevronLeft />
        </Button>
        <span> Select Lens Detail</span>
      </DialogTitle>
      <div className="w-[900px] h-[620px] xl:w-full overflow-auto grid grid-cols-12">
        <div className="col-span-3 flex flex-col">
          <div className="h-52 border border-primary/30 flex-shrink-0" />
          <div className="flex flex-col flex-grow">
            <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2">
              Power Range
            </div>
            <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2">
              Index/Thickness
            </div>
            <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2">
              Warrenty Period
            </div>
            <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2">
              Blue Light Blocker
            </div>
            <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2">
              Breakage &amp; Crack Resistance
            </div>
            <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2">
              Both Side Anti Refelective Coating
            </div>
            <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2">
              UV Protection
            </div>
            <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2">
              Water &amp; Dust Protection (Hydrophobic)
            </div>
            <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 flex items-center peer cursor-pointer px-2">
              Lens ID
            </div>
          </div>
        </div>
        <div className="col-span-9">
          <MultiCardSlider
            template={LensDetailTemplate}
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
          />
        </div>
      </div>
    </div>
  );
};
export default SelectLensDetail;
