"use client";
import { Button, ProcessIndicator } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import useCreatePowerType from "@/lib/mutations/admin/power-types/useCreatePowerTypes";
import { useForm } from "react-hook-form";
import { powerTypeSchema } from "@/lib/validations/admin/power-type.validation";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdatePowerType from "@/lib/mutations/admin/power-types/useUpdatePowerTypes";
import { resetStore, showModal } from "@/store/power-types/form.slice";
import FileInput from "../ui/file-input";
import FilePreview from "../ui/file-input/FilePreview";
import DragDropIcon from "../icons/DragDropIcon";

const PowerTypeForm: React.FC = () => {
  const form = useForm<z.infer<typeof powerTypeSchema>>({
    defaultValues: { image: null, description: "", title: "" },
    mode: "onBlur",
    resolver: zodResolver(powerTypeSchema),
  });

  const dispatch = useAppDispatch();
  const { data, power_type_id } = useAppSelector(
    (store) => store.powerTypeStore.formStore,
  );

  const { mutate: updatePowerType, isPending: updating } = useUpdatePowerType(
    () => {
      form.reset();
    },
  );

  const { mutate: createPowerType, isPending: creating } = useCreatePowerType(
    () => {
      form.reset();
    },
  );

  const isPending = updating || creating;

  const onSubmit = (data: z.infer<typeof powerTypeSchema>) => {
    if (power_type_id) {
      updatePowerType(data);
    } else {
      createPowerType(data);
    }
  };

  React.useEffect(() => {
    if (data) {
      form.reset({ title: data?.title, description: data?.description });
    }
  }, [data, form]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          {/* Image Upload */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <FileInput
                    value={field.value?.[0]}
                    onChange={(files) => field.onChange(files?.[0])}
                    className="size-[100px]"
                  >
                    <FilePreview
                      file={field.value}
                      {...(data?.default_url && {
                        defaultValue: {
                          type: "image",
                          url: data?.default_url,
                        },
                      })}
                      className="size-full grid place-content-center"
                    >
                      <DragDropIcon className="size-[25px]" />
                    </FilePreview>
                  </FileInput>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={() =>
              dispatch(power_type_id ? resetStore() : showModal(false))
            }
            variant="secondary"
          >
            {power_type_id ? "Discard" : "Cancel"}
          </Button>
          <Button type="submit">
            <ProcessIndicator
              isProcessing={isPending}
              btnText={power_type_id ? "Save" : "Create"}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default PowerTypeForm;
