"use client";
import React from "react";
import { Button, ProcessIndicator } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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
import { resetStore, showModal } from "@/store/banners/form.slice";
import useUpdate from "@/lib/mutations/admin/banners/useUpdate";
import useCreate from "@/lib/mutations/admin/banners/useCreate";
import FileInput from "../ui/file-input";
import FilePreview from "../ui/file-input/FilePreview";
import DragDropIcon from "../icons/DragDropIcon";
import TextEditor from "../ui/text-editor";
import { formSchema } from "@/lib/validations/admin/banners.validation";
import { Checkbox } from "../ui/checkbox";
import MultiSelect from "../ui/multi-select";
import useCategories from "@/lib/queries/admin/categories/useItems";
import useShapes from "@/lib/queries/admin/shapes/useItems";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import useSessionStorage from "@/hooks/use-session-storage";
import { IFile } from "@/lib/types";
import useUpload from "@/lib/mutations/useUpload";
import { toast } from "@/lib/hooks/use-toast";

const ItemForm: React.FC = () => {
  const { value: uploadedImage, setValue: setUploadedImage } =
    useSessionStorage<IFile>("banner_image");
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      category_ids: [],
      shape_ids: [],
      is_active: false,
      show_on_home: false,
    },
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });
  const { isDirty, errors } = form.formState;

  const dispatch = useAppDispatch();
  const { data: storeData } = useAppSelector(
    (store) => store.bannerStore.formStore,
  );

  const { mutate: updateBanner, isPending: updating } = useUpdate();
  const { mutate: createBanner, isPending: creating } = useCreate();
  const { mutate: upload, isPending: uploading } = useUpload();
  const isPending = updating || creating;

  // prepare category data
  const {
    data: categories,
    isLoading: categoryLoading,
    hasNextPage: categoryHasNextPage,
    fetchNextPage: categoryFetchNextPage,
    isFetchingNextPage: categoryIsFetchingNextPage,
  } = useCategories();
  const categoryElementRef = useInfiniteScroll({
    hasNextPage: categoryHasNextPage,
    fetchNextPage: categoryFetchNextPage,
    isLoading: categoryLoading,
    isFetchingNextPage: categoryIsFetchingNextPage,
  });
  const categoryOptions =
    categories?.map((category) => ({
      label: category.title,
      value: category.id,
    })) || [];

  //prepare shape options
  const {
    data: shapes,
    isLoading: shapeLoading,
    hasNextPage: shapeHasNextPage,
    fetchNextPage: shapeFetchNextPage,
    isFetchingNextPage: shapeIsFetchingNextPage,
  } = useShapes();
  const shapeElementRef = useInfiniteScroll({
    hasNextPage: shapeHasNextPage,
    fetchNextPage: shapeFetchNextPage,
    isLoading: shapeLoading,
    isFetchingNextPage: shapeIsFetchingNextPage,
  });
  const shapeOptions =
    shapes?.map((shape) => ({
      label: shape.title,
      value: shape.id,
    })) || [];
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!uploadedImage) {
      toast({
        title: "Alert",
        description: "Please upload an image",
        variant: "default",
      });
      return;
    }
    if (isDirty) {
      if (storeData?.id) {
        updateBanner(data);
      } else {
        createBanner(data);
      }
    } else {
      dispatch(resetStore());
    }
  };

  React.useEffect(() => {
    if (storeData) {
      console.log(storeData?.category_ids);
      form.reset({
        is_active: storeData?.is_active,
        show_on_home: storeData?.show_on_home,
        category_ids: storeData?.category_ids || [],
        shape_ids: storeData?.shape_ids || [],
      });
    }
  }, [storeData, form]);

  React.useEffect(() => {
    if (storeData?.image) {
      setUploadedImage({
        id: storeData.image.id,
        url: storeData.image.url,
        fieldname: storeData.image.fieldname || "",
      });
    }
  }, [storeData]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
          className="w-full aspect-video"
        >
          <FilePreview
            imagePreviewSize={{ width: 1080, height: 720 }}
            file={null}
            {...(uploadedImage && {
              defaultValue: {
                type: "image",
                url: uploadedImage.url,
              },
            })}
            className="size-full"
          >
            <div className="size-full grid place-content-center">
              <DragDropIcon className="size-[25px]" />
            </div>
          </FilePreview>
        </FileInput>
        {/* Title input */}
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="!mt-0">Active</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="show_on_home"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="!mt-0">Show on Home</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <FormField
              control={form.control}
              name="category_ids"
              render={({ field }) => (
                <FormItem className="w-full max-w-72">
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <MultiSelect
                      id="category_ids"
                      options={categoryOptions}
                      value={field.value}
                      onChange={field.onChange}
                      optionRef={categoryElementRef as any}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shape_ids"
              render={({ field }) => (
                <FormItem className="w-full max-w-72">
                  <FormLabel>Shapes</FormLabel>
                  <FormControl>
                    <MultiSelect
                      id="shape_ids"
                      options={shapeOptions}
                      value={field.value}
                      onChange={field.onChange}
                      optionRef={shapeElementRef as any}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Footer with buttons */}
        <DialogFooter>
          <Button
            type="button"
            onClick={() =>
              dispatch(storeData?.id ? resetStore() : showModal(false))
            }
            variant="secondary"
          >
            {storeData?.id ? "Discard" : "Cancel"}
          </Button>
          <Button type="submit">
            <ProcessIndicator
              isProcessing={isPending}
              btnText={storeData?.id ? "Save" : "Create"}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ItemForm;
