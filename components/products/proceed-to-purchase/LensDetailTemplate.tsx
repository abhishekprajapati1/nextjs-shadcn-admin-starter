import { ILensDetail } from "@/components/lens-details/LensDetail";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SliderTemplateProps } from "@/components/ui/swiper/MultiCardSlider";
import React from "react";

const LensDetailTemplate: React.FC<SliderTemplateProps<ILensDetail>> = ({
  index,
  data,
}) => {
  return (
    <div className="h-full flex flex-col hover:bg-primary/10 animate-smooth">
      <div className="h-52 border border-primary/30 border-l-0 flex-shrink-0 grid place-content-center">
        <div className="flex flex-col gap-2">
          <Avatar className="w-8 h-8 rounded-lg mx-auto">
            <AvatarImage src={data?.image?.url} alt={data.title} />
            <AvatarFallback>
              {data?.title?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-center font-medium text-foreground/90 text-sm">
            {data?.title}
          </h3>
          <span className="text-center text-2xl">₹{data?.price}</span>
          <Button size="sm" className="text-sm">
            Select This Lens
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
