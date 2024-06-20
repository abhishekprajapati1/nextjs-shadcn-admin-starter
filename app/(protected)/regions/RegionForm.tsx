"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { IFormOption } from "@/lib/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RegionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: IFormOption | null;
  mutationFn: (data: IFormOption) => void;
  isMutating?: boolean;
}

const xero_keys = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];

const RegionForm: React.FC<RegionFormProps> = ({
  mutationFn,
  open,
  onOpenChange,
  data,
  isMutating,
}) => {
  const form = useForm<IFormOption>({
    defaultValues: {
      label: "",
      xero_key: "",
    },
  });

  const onSubmit = (data: IFormOption) => {
    mutationFn(data);
  };

  React.useEffect(() => {
    if (data) {
      form.reset({ label: data?.label || "", xero_key: data?.xero_key || "" });
    }
  }, [data]);

  React.useEffect(() => {
    if (!open) {
      form.reset({ label: "", xero_key: "" });
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`max-w-80 ${isMutating && "pointer-events-none"}`}
      >
        <Form {...form}>
          <form
            className={`p-4 flex flex-col gap-4 ${
              isMutating && "pointer-events-none"
            }`}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="xero_key"
              render={({ field }) => (
                <FormItem>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state code" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {xero_keys.map((key) => (
                        <SelectItem key={key} value={key}>
                          {key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>These codes are state keys for xero & myob</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter label here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isMutating}
              type={isMutating ? "button" : "submit"}
              size="lg"
              className="gap-2"
            >
              {isMutating && (
                <React.Fragment>
                  <SpinnerIcon /> {data ? "Updating" : "Creating..."}
                </React.Fragment>
              )}
              {!isMutating && (
                <React.Fragment>
                  {data ? "Update label" : "Add label"}
                </React.Fragment>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RegionForm;
