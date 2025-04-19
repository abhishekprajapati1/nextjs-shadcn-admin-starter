"use client";
import React from "react";
import { Button, ProcessIndicator } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "../ui/input";
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
import { resetStore, showModal } from "@/store/categories/form.slice";
import useUpdate from "@/lib/mutations/admin/categories/useUpdate";
import useCreate from "@/lib/mutations/admin/categories/useCreate";
import FileInput from "../ui/file-input";
import FilePreview from "../ui/file-input/FilePreview";
import DragDropIcon from "../icons/DragDropIcon";
import TextEditor from "../ui/text-editor";
import { formSchema } from "@/lib/validations/admin/categories.validation";
import { generateSlug } from "../articles/ArticleForm";
import useSessionStorage from "@/hooks/use-session-storage";
import { IFile } from "@/lib/types";
import useUpload from "@/lib/mutations/useUpload";

const CategoryForm: React.FC = () => {
  const { value: uploadedImage, setValue: setUploadedImage } =
    useSessionStorage<IFile>("category_image");

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { title: "", description: "", seo_title: "" },
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  const dispatch = useAppDispatch();
  const { data, item_id } = useAppSelector(
    (store) => store.categoryStore.formStore,
  );

  const { mutate: upload, isPending: uploading } = useUpload();
  const { mutate: updateCategory, isPending: updating } = useUpdate();
  const { mutate: createCategory, isPending: creating } = useCreate();
  const isPending = updating || creating;

  const { isDirty } = form.formState;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (isDirty || uploadedImage?.is_temp) {
      if (item_id) {
        updateCategory(data);
      } else {
        createCategory(data);
      }
    } else {
      dispatch(resetStore());
    }
  };

  React.useEffect(() => {
    if (data) {
      form.reset({
        title: data?.title,
        description: data?.description,
        seo_title: data?.seo_title,
        slug: data?.slug,
      });
    }
  }, [data, form]);

  React.useEffect(() => {
    if (data?.image) {
      setUploadedImage({
        id: data.image.id,
        url: data.image.url,
        fieldname: data.image.fieldname || "",
      });
    }
  }, [data]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Image Upload */}
        <FileInput
          onChange={(files) => {
            if (
              Array.isArray(files) &&
              !isNaN(files?.length) &&
              files?.length > 0
            ) {
              upload(
                { files, name: "image" },
                {
                  onSuccess: (data) => {
                    setUploadedImage({
                      id: data[0].id,
                      url: data[0].url,
                      fieldname: data[0].fieldname,
                      is_temp: data[0].is_temp,
                    });
                  },
                },
              );
            }
          }}
          className="size-[100px]"
        >
          <FilePreview
            file={null}
            {...(uploadedImage && {
              defaultValue: {
                type: "image",
                url: uploadedImage?.url,
              },
            })}
            className="size-full grid place-content-center"
          >
            <DragDropIcon className="size-[25px]" />
          </FilePreview>
        </FileInput>

        {/* Title input */}
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter title"
                    {...field}
                    onChange={(event) => {
                      form.setValue("slug", generateSlug(event.target.value));
                      field.onChange(event.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Enter slug" {...field} />
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
                <FormLabel>Seo Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Seo Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description textarea */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextEditor placeholder="Enter description" {...field} />
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

export default CategoryForm;
