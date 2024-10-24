"use client";
import React from "react";
import { Button, ProcessIndicator } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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
import { useAppDispatch, useAppSelector } from "@/store";
import { resetStore, showModal } from "@/store/shapes/form.slice";
import useUpdate from "@/lib/mutations/admin/shapes/useUpdate";
import useCreate from "@/lib/mutations/admin/shapes/useCreate";
import FileInput from "../ui/file-input";
import FilePreview from "../ui/file-input/FilePreview";
import DragDropIcon from "../icons/DragDropIcon";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  seo_title: z.string().min(1, "Please provide a seo friendly title."),
  description: z.string().min(1, "Description is required"),
  image: z.any().optional(), // Optional for image upload
});

const ShapeForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { title: "", description: "", seo_title: "", image: null },
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  const dispatch = useAppDispatch();
  const { data, item_id } = useAppSelector(
    (store) => store.shapeStore.formStore
  );

  const { mutate: updateShape, isPending: updating } = useUpdate();
  const { mutate: createShape, isPending: creating } = useCreate();
  const isPending = updating || creating;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (item_id) {
      updateShape(data);
    } else {
      createShape(data);
    }
  };

  React.useEffect(() => {
    if (data) {
      form.reset({
        title: data?.title,
        description: data?.description,
        seo_title: data?.seo_title,
        image: data?.image,
      });
    }
  }, [data, form]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Image upload */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileInput
                  value={field.value}
                  onChange={(files) => field.onChange(files?.[0])}
                  className="size-[100px]"
                >
                  <FilePreview
                    file={field.value}
                    {...(data?.image?.url && {
                      defaultValue: {
                        type: "image",
                        url: data?.image?.url,
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

        {/* Title input */}
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
          name="seo_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter Seo Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description textarea */}
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

        {/* Footer with buttons */}
        <DialogFooter>
          <Button
            type="button"
            onClick={() => dispatch(item_id ? resetStore() : showModal(false))}
            variant="secondary"
          >
            {item_id ? "Discard" : "Cancel"}
          </Button>
          <Button type="submit">
            <ProcessIndicator
              isProcessing={isPending}
              btnText={item_id ? "Save" : "Create"}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ShapeForm;
