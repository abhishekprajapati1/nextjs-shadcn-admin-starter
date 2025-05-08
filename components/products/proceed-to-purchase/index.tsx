"use client";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import useQueryState from "@/hooks/use-query-state";
import React from "react";
import SelectPowerType from "./SelectPowerType";
import { useForm, useWatch } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { purchaseSchema } from "@/lib/validations/admin/product.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import useSessionStorage from "@/hooks/use-session-storage";
import SelectLensDetail from "./SelectLensDetail";
import useLoggedInUser from "@/lib/queries/useLoggedInUser";
import SelectLensFeature from "./SelectLensFeature";
import SetPrescription from "./SetPrescription";
import { IColor } from "@/components/colors/ListItem";
import { IProductColor } from "@/lib/types";
export interface PurchaseStore {
  step: number;
  data: z.infer<typeof purchaseSchema> | null;
}

interface ProceedToPurchaseProps {
  product_colors: IProductColor[];
}

const ProceedToPurchase: React.FC<ProceedToPurchaseProps> = ({
  product_colors,
}) => {
  const { data } = useLoggedInUser();
  const [activeColor, setActiveColor] = React.useState<IColor | null>(null);
  const {
    value: purchaseStore,
    setValue: setPurchaseStore,
    removeValue: removePurchaseStore,
  } = useSessionStorage<PurchaseStore>("purchase_store", {
    data: null,
    step: 1,
  });
  const { value: open, setValue: onOpenChange } =
    useQueryState<boolean>("purchase");
  const { value: colorName } = useQueryState<string>("color_name");
  const form = useForm<z.infer<typeof purchaseSchema>>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      power_type_id: "",
    },
    mode: "onBlur",
  });

  // modal close handler
  const handleModalClose = (modalOpen: boolean) => {
    if (!modalOpen) {
      removePurchaseStore();
    }
    onOpenChange(modalOpen);
  };

  const onSubmit = (data: z.infer<typeof purchaseSchema>) => {
    console.log("see this'", data);
  };

  const onNext = () => {
    if (purchaseStore?.step) {
      if (purchaseStore?.step < 3) {
        setPurchaseStore({
          ...purchaseStore,
          step: purchaseStore.step + 1,
        });
      }
    }
  };

  const onBack = () => {
    if (purchaseStore?.step) {
      if (purchaseStore?.step > 1) {
        setPurchaseStore({
          ...purchaseStore,
          step: purchaseStore.step - 1,
        });
      }
    }
  };

  React.useEffect(() => {
    form.reset({
      lens_feature_id: purchaseStore?.data?.lens_feature_id || "",
      power_type_id: purchaseStore?.data?.power_type_id || "",
    });
  }, [purchaseStore, form]);

  React.useEffect(() => {
    if (colorName) {
      const name = colorName?.split("-")?.[0];
      const color = colorName?.split("-")?.[1];
      const product_color = product_colors?.find(
        (pc) => pc.color.color === color && pc.color.name === name,
      );
      if (product_color) {
        setActiveColor(product_color?.color);
      }
    }
  }, [colorName, product_colors]);

  return (
    <React.Fragment>
      {data && (
        <Button
          onClick={() => {
            onOpenChange(true);
            setPurchaseStore(
              (prev) =>
                ({
                  ...prev,
                  data: { ...prev.data, color_id: activeColor?.id || "" },
                }) as PurchaseStore,
            );
          }}
        >
          Buy Now
        </Button>
      )}
      <Modal
        open={Boolean(open)}
        onOpenChange={(val) => handleModalClose(val)}
        fullScreen
        showCloseIcon
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="size-full overflow-auto"
          >
            {purchaseStore?.step === 1 && (
              <SelectPowerType
                control={form.control}
                onNext={onNext}
                onBack={onBack}
              />
            )}
            {purchaseStore?.step === 2 && (
              <SelectLensFeature
                onNext={onNext}
                onBack={onBack}
                control={form.control}
              />
            )}
            {purchaseStore?.step === 3 && (
              <SelectLensDetail control={form.control} />
            )}

            {purchaseStore?.step === 4 && <SetPrescription />}
          </form>
        </Form>
      </Modal>
    </React.Fragment>
  );
};
export default ProceedToPurchase;
