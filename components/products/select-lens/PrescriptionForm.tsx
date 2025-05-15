import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Modal, { ModalProps } from "@/components/ui/modal"; // stock and model number as par the color.
import { useWatch } from "react-hook-form";
import { PurchaseStepProps } from "./SelectPowerType";
import SelectBox from "@/components/ui/select-box";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useSessionStorage from "@/hooks/use-session-storage";
import { PurchaseStore } from ".";
import { InputOption } from "@/lib/types";
interface PrescriptionFormProps extends Omit<ModalProps, "children"> {
  control: PurchaseStepProps["control"];
}
const sph_options: InputOption[] = Array.from({ length: 81 }, (_, i) => {
  // -14 => +6
  const value = (-14 + i * 0.25).toFixed(2);
  const formatted = value.startsWith("-")
    ? value
    : value === "0.00"
      ? `${value}`
      : `+${value}`;
  return {
    value: formatted,
    label: value === "0.00" ? `${formatted} (Plain)` : formatted,
  };
});
const cyl_options: InputOption[] = Array.from({ length: 41 }, (_, i) => {
  // -6 => +4
  const value = (-6 + i * 0.25).toFixed(2);
  const formatted = value.startsWith("-")
    ? value
    : value === "0.00"
      ? `${value}`
      : `+${value}`;
  return {
    value: formatted,
    label: value === "0.00" ? `${formatted} (Plain)` : formatted,
  };
});
const axis_options: InputOption[] = Array.from({ length: 181 }, (_, i) => {
  const value = i.toString();
  return { value, label: `${value}°` };
});
const add_options: InputOption[] = [
  { value: "none", label: "None" },
  ...Array.from({ length: 9 }, (_, i) => {
    // +1 => +3
    const value = (1 + i * 0.25).toFixed(2);
    const formatted = value.startsWith("-") ? value : `+${value}`;
    return { value: formatted, label: formatted };
  }),
];

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({
  open,
  onOpenChange,
  control,
}) => {
  const { value: purchaseStore, setValue: setPurchaseStore } =
    useSessionStorage<PurchaseStore>("purchase_store");

  const handleDiscardClick = () => {
    if (purchaseStore) {
      const newPurchaseStoreData = purchaseStore.data;
      delete newPurchaseStoreData?.prescription;
      setPurchaseStore({
        step: purchaseStore?.step,
        data: newPurchaseStoreData,
      });
      onOpenChange(false);
    }
  };

  const handleFieldChange = (name: string, val: string) => {
    setPurchaseStore(
      (prev) =>
        ({
          ...prev,
          data: {
            ...prev.data,
            prescription: {
              ...(prev?.data?.prescription && prev?.data?.prescription),
              [name]: val,
            },
          },
        }) as PurchaseStore,
    );
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="max-w-[900px]">
      <h2 className="text-center mb-4 font-bold text-2xl">
        Fill the prescription details
      </h2>
      <table cellPadding={15}>
        <thead className="py-3">
          <tr>
            <th className="text-left">#</th>
            <th className="text-left">Sphere (SPH)</th>
            <th className="text-left">Cylinder (CYL)</th>
            <th className="text-left">Axis (AXI)</th>
            <th className="text-left">Add</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-bold">Right OD</td>
            <td>
              <FormField
                control={control}
                name="prescription.right_sph"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SelectBox
                        options={sph_options}
                        placeholder="Please Select"
                        value={field.value}
                        onChange={(val) => {
                          field.onChange(val);
                          handleFieldChange("right_sph", val);
                        }}
                        wrapperClass="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </td>
            <td>
              <FormField
                control={control}
                name="prescription.right_cyl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SelectBox
                        options={cyl_options}
                        placeholder="Please Select"
                        value={field.value}
                        onChange={(val) => {
                          field.onChange(val);
                          handleFieldChange("right_cyl", val);
                        }}
                        wrapperClass="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </td>
            <td>
              <FormField
                control={control}
                name="prescription.right_axis"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SelectBox
                        options={axis_options}
                        placeholder="Please Select"
                        value={field.value}
                        onChange={(val) => {
                          field.onChange(val);
                          handleFieldChange("right_axis", val);
                        }}
                        wrapperClass="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </td>
            <td>
              <FormField
                control={control}
                name="prescription.right_add"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SelectBox
                        options={add_options}
                        placeholder="Please Select"
                        value={field.value}
                        onChange={(val) => {
                          field.onChange(val);
                          handleFieldChange("right_add", val);
                        }}
                        wrapperClass="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </td>
          </tr>
          <tr>
            <td className="font-bold">Left OS</td>
            <td>
              <FormField
                control={control}
                name="prescription.left_sph"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SelectBox
                        options={sph_options}
                        placeholder="Please Select"
                        value={field.value}
                        onChange={(val) => {
                          field.onChange(val);
                          handleFieldChange("left_sph", val);
                        }}
                        wrapperClass="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </td>
            <td>
              <FormField
                control={control}
                name="prescription.left_cyl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SelectBox
                        options={cyl_options}
                        placeholder="Please Select"
                        value={field.value}
                        onChange={(val) => {
                          field.onChange(val);
                          handleFieldChange("left_cyl", val);
                        }}
                        wrapperClass="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </td>
            <td>
              <FormField
                control={control}
                name="prescription.left_axis"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SelectBox
                        options={axis_options}
                        placeholder="Please Select"
                        value={field.value}
                        onChange={(val) => {
                          field.onChange(val);
                          handleFieldChange("left_axis", val);
                        }}
                        wrapperClass="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </td>
            <td>
              <FormField
                control={control}
                name="prescription.left_add"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SelectBox
                        options={add_options}
                        placeholder="Please Select"
                        value={field.value}
                        onChange={(val) => {
                          field.onChange(val);
                          handleFieldChange("left_add", val);
                        }}
                        wrapperClass="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </td>
          </tr>
          <tr>
            <td className="font-bold">Additional Comment</td>
            <td colSpan={4}>
              <FormField
                name="prescription.comments"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write any additional details or comments"
                        className="!min-h-fit placeholder:text-muted-foreground/60 "
                        value={field.value}
                        onChange={(event) => {
                          field.onChange(event.target.value);
                          handleFieldChange("comments", event.target.value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <DialogFooter>
        <Button
          onClick={() => handleDiscardClick()}
          type="button"
          variant="ghost"
        >
          I want to upload the photo
        </Button>
        <Button type="button" onClick={() => onOpenChange(false)}>
          Save Prescription
        </Button>
      </DialogFooter>
    </Modal>
  );
};
export default PrescriptionForm;
