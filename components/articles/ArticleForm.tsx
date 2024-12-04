"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetStore, showModal } from "@/store/categories/form.slice";
import useUpdate from "@/lib/mutations/admin/categories/useUpdate";
import useCreate from "@/lib/mutations/admin/categories/useCreate";
import { formSchema } from "@/lib/validations/admin/articles.validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FileInput from "@/components/ui/file-input";
import FilePreview from "@/components/ui/file-input/FilePreview";
import { IoImage } from "react-icons/io5";
import { Button, ProcessIndicator } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import TextEditor from "../ui/text-editor";
import MultiTextInput from "../ui/mult-text-input";
import MultiSelect from "../ui/multi-select";
import DragDropIcon from "../icons/DragDropIcon";

const ArticleForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: "",
      description: "",
      seo_title: "",
      slug: "",
      category_ids: [],
      content: "",
      keywords: [],
      product_ids: [],
      shape_ids: [],
      thumbnail: null,
    },
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  const dataValueProps = [
    {
      value: "circl",
      label: "Circle",
    },
    {
      value: "oval",
      label: "Oval",
    },
    {
      value: "square",
      label: "Square",
    },
    {
      value: "rectangle",
      label: "Rectangle",
    },
    {
      value: "trapezoidal",
      label: "Trapezoidal",
    },
  ];

  const { mutate: updateShape, isPending: updating } = useUpdate();
  const { mutate: createShape, isPending: creating } = useCreate();
  const isPending = updating || creating;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("see this form data here", data);
  };

  // console.log("see this", form.formState.isDirty);

  // React.useEffect(() => {
  //   if (data) {
  //     form.reset({
  //       title: data?.title,
  //       description: data?.description,
  //       seo_title: data?.seo_title,
  //     });
  //   }
  // }, [data, form]);

  return (
    <Form {...form}>
      <form
        className="w-full grid grid-cols-12 gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="col-span-8 flex flex-col gap-4">
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileInput
                    value={field.value}
                    onChange={(files) => field.onChange(files?.[0])}
                    className="aspect-[1200/675] w-full"
                  >
                    <FilePreview
                      file={field.value}
                      // {...(data?.image?.url && {
                      //   defaultValue: {
                      //     type: "image",
                      //     url: data?.image?.url,
                      //   },
                      // })}
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
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-8 pt-6">
                <FormControl>
                  <Textarea
                    placeholder="Enter Blog Title Here..."
                    className="!min-h-fit text-3xl border-none font-bold placeholder:text-muted-foreground/60 shadow-none"
                    value={field.value}
                    onChange={(event) => {
                      form.setValue("slug", generateSlug(event.target.value));
                      field.onChange(event.target.value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-8 pt-6">
                <FormControl>
                  <TextEditor
                    placeholder="Enter Blog Title Here..."
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-4 bg-white p-5 shadow-md flex flex-col justify-around rounded-lg gap-6">
          <div className="w-full flex gap-2">
            <Button
              type="button"
              variant="secondary"
              className="flex-grow"
              size="lg"
            >
              {/* {item_id ? "Discard" : "Save draft"} */}
              Save draft
            </Button>
            <Button size="lg" type="submit" className="w-[120px] flex-shrink-0">
              <ProcessIndicator
                isProcessing={isPending}
                // btnText={item_id ? "Save" : "Publish"}
                btnText={"Publish"}
              />
            </Button>
          </div>
          <FormField
            name="seo_title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-secondary-foreground/80">
                  Title (For SEO)
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-secondary-foreground/80">
                  Description (SEO Friendly)
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="h-32 text-xs"
                    placeholder="Enter description here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="slug"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-secondary-foreground/80">
                  Slug
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="enter-custom-slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-secondary-foreground/80">
                  keywords
                </FormLabel>
                <FormControl>
                  <MultiTextInput
                    id="keyword-input"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage className="text-[10px] text-secondary-foreground/50">
                  ! Enter comma, for adding keyword!
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shape_ids"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-secondary-foreground/80">
                  Select Shapes
                </FormLabel>
                <FormControl>
                  <MultiSelect
                    id="shapes-input"
                    value={field.value}
                    onChange={field.onChange}
                    dataValueProps={dataValueProps}
                  />
                </FormControl>
                <FormMessage className="text-[10px] text-secondary-foreground/50">
                  ! Select shapes once from dropdown!
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category_ids"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-secondary-foreground/80">
                  Select Categories
                </FormLabel>
                <FormControl>
                  <MultiSelect
                    id="category-input"
                    value={field.value}
                    onChange={field.onChange}
                    dataValueProps={dataValueProps}
                  />
                </FormControl>
                <FormMessage className="text-[10px] text-secondary-foreground/50">
                  ! Select category once from dropdown!
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="product_ids"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-secondary-foreground/80">
                  Select Products
                </FormLabel>
                <FormControl>
                  <MultiSelect
                    id="products-input"
                    value={field.value}
                    onChange={field.onChange}
                    dataValueProps={dataValueProps}
                  />
                </FormControl>
                <FormMessage className="text-[10px] text-secondary-foreground/50">
                  ! Select products once from dropdown!
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export const generateSlug = (str: string) => {
  try {
    return str
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  } catch {
    return "";
  }
};

export default ArticleForm;
