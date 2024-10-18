"use client";
import { Button, ProcessIndicator } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
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
import { resetStore, showModal } from "@/store/lens-features/form.slice";
import FileInput from "../ui/file-input";
import FilePreview from "../ui/file-input/FilePreview";
import DragDropIcon from "../icons/DragDropIcon";
import { lensFeatureSchema } from "@/lib/validations/admin/lens-feature.validation";
import useUpdateLensFeature from "@/lib/mutations/admin/lens-features/useUpdateLensFeatures";
import useCreateLensFeature from "@/lib/mutations/admin/lens-features/useCreateLensFeatures";
import Combobox, { ComboboxOption } from "../ui/combo-box";
import usePowerTypes from "@/lib/queries/admin/power-types/usePowerTypes";

const LensFeatureForm: React.FC = () => {
  const form = useForm<z.infer<typeof lensFeatureSchema>>({
    defaultValues: { image: null, description: "", title: "" },
    mode: "onBlur",
    resolver: zodResolver(lensFeatureSchema),
  });

  const dispatch = useAppDispatch();

  const { data, lens_feature_id } = useAppSelector(
    (store) => store.lensFeatureStore.formStore,
  );

  const { mutate: updateLensFeature, isPending: updating } =
    useUpdateLensFeature(() => {
      form.reset({
        description: "",
        image: null,
        power_type_id: "",
        title: "",
      });
    });

  const { mutate: createLensFeature, isPending: creating } =
    useCreateLensFeature(() => {
      form.reset({
        description: "",
        image: null,
        power_type_id: "",
        title: "",
      });
    });

  const isPending = updating || creating;

  // create options for power type
  const { data: powerTypes } = usePowerTypes({ completeFetch: true });
  const power_type_options: ComboboxOption[] =
    powerTypes?.map((pt) => ({
      value: pt.id || "",
      label: pt.title || "",
    })) || [];

  const onSubmit = (data: z.infer<typeof lensFeatureSchema>) => {
    if (lens_feature_id) {
      updateLensFeature(data);
    } else {
      createLensFeature(data);
    }
  };

  React.useEffect(() => {
    if (data) {
      form.reset({
        title: data?.title,
        description: data?.description,
        power_type_id: data?.power_type_id,
      });
    }
  }, [data, form]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
            name="power_type_id"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center">
                <FormLabel className="flex-shrink-0">Power Type</FormLabel>
                <FormControl>
                  <Combobox
                    options={power_type_options}
                    placeholder="Select power type"
                    value={field.value}
                    onChange={field.onChange}
                    className="flex-grow"
                  />
                </FormControl>
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
              dispatch(lens_feature_id ? resetStore() : showModal(false))
            }
            variant="secondary"
          >
            {lens_feature_id ? "Discard" : "Cancel"}
          </Button>
          <Button type="submit">
            <ProcessIndicator
              isProcessing={isPending}
              btnText={lens_feature_id ? "Save" : "Create"}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default LensFeatureForm;
