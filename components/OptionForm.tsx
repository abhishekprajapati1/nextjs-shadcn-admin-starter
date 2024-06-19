"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { IFormOption } from "@/lib/types";
import { Dialog, DialogContent } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import SpinnerIcon from "./icons/SpinnerIcon";

interface OptionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: IFormOption | null;
  mutationFn: (data: IFormOption) => void;
  isMutating?: boolean;
}

const OptionForm: React.FC<OptionFormProps> = ({
  mutationFn,
  open,
  onOpenChange,
  data,
  isMutating,
}) => {
  const form = useForm<IFormOption>({
    defaultValues: {
      label: "",
    },
  });

  const onSubmit = (data: IFormOption) => {
    mutationFn(data);
  };

  React.useEffect(() => {
    if (data) {
      form.reset({ label: data?.label || "" });
    }
  }, [data]);

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
            {/* <Input placeholder="Enter label" {...register("label")} /> */}
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
            >
              {isMutating && (
                <React.Fragment>
                  <SpinnerIcon /> Creating...
                </React.Fragment>
              )}
              {!isMutating && "Add Label"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OptionForm;
