import { ILensDetail } from "@/components/lens-details/LensDetail";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SliderTemplateProps } from "@/components/ui/swiper/MultiCardSlider";
import useSessionStorage from "@/hooks/use-session-storage";
import React from "react";
import { PurchaseStore } from ".";
import { cn } from "@/lib/utils";
import { useSwiper } from "swiper/react";
import Modal from "@/components/ui/modal";
import Image from "next/image";
import { Expand } from "lucide-react";

const LensDetailTemplate: React.FC<SliderTemplateProps<ILensDetail>> = ({
  index,
  data,
}) => {
  const swiper = useSwiper();
  const [expand, setExpand] = React.useState(false);
  const { value: purchaseStore, setValue: setPurchaseStore } =
    useSessionStorage<PurchaseStore>("purchase_store");
  const isSelected = purchaseStore?.data?.lens_detail_id === data?.id;
  const selectedIndex = isSelected ? index : null;
  const handleLensDetailSelection = (lens_detail_id: string) => {
    if (purchaseStore?.data) {
      setPurchaseStore({
        ...(purchaseStore && purchaseStore),
        step: 4,
        data: {
          ...(purchaseStore?.data && purchaseStore.data),
          lens_detail_id,
        },
      });
    }
  };

  React.useEffect(() => {
    if (typeof selectedIndex === "number" && swiper) {
      swiper.slideTo(selectedIndex);
    }
  }, [selectedIndex, swiper]);

  return (
    <div
      className={cn(
        "h-full group flex flex-col hover:bg-primary/10 animate-smooth",
        isSelected && "bg-primary/10",
      )}
    >
      <Modal open={expand} onOpenChange={setExpand} showCloseIcon>
        <Image
          src={data?.image?.url || ""}
          alt={data?.title || "expanded lens detail image"}
          width={900}
          height={400}
          className="w-full h-auto"
        />
      </Modal>
      <div className="h-52 border border-primary/30 border-l-0 flex-shrink-0 grid place-content-center">
        <div className="flex flex-col gap-2">
          <Avatar className="w-12 h-12 bg-white rounded-lg mx-auto relative">
            <AvatarImage src={data?.image?.url} alt={data.title} />
            <AvatarFallback>
              {data?.title?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
            <Button
              type="button"
              onClick={() => setExpand(true)}
              title="Click to expand the image"
              className="!h-full absolute hidden inset-0 group-hover:grid place-content-center bg-primary/50 text-white"
            >
              <Expand className="size-4" />
            </Button>
          </Avatar>
          <h3 className="text-center font-medium text-foreground/90 text-sm">
            {data?.title}
          </h3>
          <span className="text-center text-2xl">₹{data?.price}</span>
          <Button
            onClick={() => handleLensDetailSelection(data?.id)}
            size="sm"
            className={cn("text-sm", isSelected && "bg-primary/60")}
          >
            {!isSelected ? "Select This Lens" : "Selected"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 border-l-0 flex items-center justify-center cursor-pointer peer-hover:shadow-xl px-2">
          {data?.power_range}
        </div>
        <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 border-l-0 flex items-center justify-center cursor-pointer peer-hover:shadow-xl px-2">
          {data?.thickness} mm
        </div>
        <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 border-l-0 flex items-center justify-center cursor-pointer peer-hover:shadow-xl px-2">
          {data?.warranty_period} month
          {(data?.warranty_period || 0) > 1 ? "s" : ""}
        </div>
        <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 border-l-0 flex items-center justify-center cursor-pointer peer-hover:shadow-xl px-2">
          {data?.blue_light_blocker ? "Yes" : "No"}
        </div>
        <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 border-l-0 flex items-center justify-center cursor-pointer peer-hover:shadow-xl px-2">
          {data?.crack_resistant}%
        </div>
        <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 border-l-0 flex items-center justify-center cursor-pointer peer-hover:shadow-xl px-2">
          {data?.anti_reflection ? "Yes" : "No"}
        </div>
        <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 border-l-0 flex items-center justify-center cursor-pointer peer-hover:shadow-xl px-2">
          {data?.uv_protection ? "Yes" : "No"}
        </div>
        <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 border-l-0 flex items-center justify-center cursor-pointer peer-hover:shadow-xl px-2">
          {data?.hydrophobic ? "Yes" : "No"}
        </div>
        <div className="h-full text-sm text-foreground/80 border border-primary/30 border-t-0 border-l-0 flex items-center justify-center cursor-pointer peer-hover:shadow-xl px-2">
          {data?.lens_id}
        </div>
      </div>
    </div>
  );
};
export default LensDetailTemplate;
