"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetStore, showModal } from "@/store/articles/form.slice";
import useUpdate from "@/lib/mutations/admin/articles/useUpdate";
import useCreate from "@/lib/mutations/admin/articles/useCreate";
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
import useShapes from "@/lib/queries/admin/shapes/useItems";
import useCategories from "@/lib/queries/admin/categories/useItems";
import useFetch from "@/lib/hooks/use-fetch";
import ENDPOINTS from "@/lib/endpoints";
import { IArticle } from "./ListItem";

interface ArticleFormProps {
  id?: string;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ id = "" }) => {
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

  // article data to reset the article form
  const { data } = useFetch<IArticle>({
    endpoint: ENDPOINTS.admin.articles.fetch_single(id),
    enabledKey: id,
    validate: true,
  });

  // shape, categories and product data to craft shapeOption, categoryOption and productOption respectively
  const { data: shapes } = useShapes({ completeFetch: true });
  const { data: categories } = useCategories({ completeFetch: true });
  const shapeOptions = shapes?.map((s) => ({
    value: s.id,
    label: s.title,
  }));
  const categoryOptions = categories?.map((s) => ({
    value: s.id,
    label: s.title,
  }));

  const { mutate: update, isPending: updating } = useUpdate();
  const { mutate: create, isPending: creating } = useCreate();
  const isPending = updating || creating;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (id) {
      update(data);
    } else {
      create(data);
    }
  };

  React.useEffect(() => {
    if (data) {
      form.reset({
        title: data?.title,
        description: data?.description,
        content: data?.content,
        seo_title: data?.seo_title,
        shape_ids: data?.shape_ids || [],
        category_ids: data?.category_ids || [],
        slug: data?.slug,
        keywords: data?.keywords,
      });
    }
  }, [data, form]);

  return (
    <Form {...form}>
      <form
        className="w-full grid grid-cols-12 gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-2">
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
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
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

        <div className="col-span-12 lg:col-span-4 bg-white p-5 shadow-md flex flex-col-reverse lg:flex-col justify-around rounded-lg gap-6">
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
          <div className="flex-grow flex flex-col gap-8">
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
                      options={shapeOptions || []}
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
                      options={categoryOptions || []}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] text-secondary-foreground/50">
                    ! Select category once from dropdown!
                  </FormMessage>
                </FormItem>
              )}
            />
            {/* <FormField
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
                      options={dataValueProps}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] text-secondary-foreground/50">
                    ! Select products once from dropdown!
                  </FormMessage>
                </FormItem>
              )}
            /> */}
          </div>
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
