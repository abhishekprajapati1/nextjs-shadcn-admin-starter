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

const ArticleForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { title: "", description: "", seo_title: "", slug: "" },
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

  // const dispatch = useAppDispatch();
  // const { data, item_id } = useAppSelector(
  //   (store) => store.categoryStore.formStore
  // );

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
    <div className="container mx-auto">
      <Form {...form}>
        <form
          className="w-full grid grid-cols-12 gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="col-span-8 h-[65vh] bg-muted flex justify-center items-center rounded-lg">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl className="w-full">
                    <FileInput
                      value={field.value}
                      onChange={(files) => field.onChange(files?.[0])}
                      className=""
                    >
                      <FilePreview
                        file={field.value}
                        // {...(data?.image?.url && {
                        //   defaultValue: {
                        //     type: "image",
                        //     url: data?.image?.url,
                        //   },
                        // })}
                        className="size-full flex flex-col items-center justify-center bg-cyan-50/20 border-none"
                      >
                        <p className="text-sm text-muted-foreground">
                          Click to upload{" "}
                          <span className="font-semibold text-secondary-foreground/80">
                            Thumbnail
                          </span>
                        </p>
                        <IoImage className="w-20 h-20 text-gray-300" />
                        <p className="text-sm text-muted-foreground">
                          or{" "}
                          <span className="font-semibold text-secondary-foreground/80">
                            drag & drop
                          </span>{" "}
                          file here
                        </p>
                      </FilePreview>
                    </FileInput>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-4 bg-white p-5 shadow-md flex flex-col justify-around rounded-lg">
            <div className="w-full flex gap-2">
              <Button
                type="submit"
                // onClick={() =>
                //   dispatch(item_id ? resetStore() : showModal(false))
                // }
                variant="secondary"
                className="flex-grow"
                size="lg"
              >
                {/* {item_id ? "Discard" : "Save draft"} */}
                Save draft
              </Button>
              <Button
                size="lg"
                type="submit"
                className="w-[120px] flex-shrink-0"
              >
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
              name="shapes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-secondary-foreground/80">
                    shapes
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-secondary-foreground/80">
                    category
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
              name="products"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-secondary-foreground/80">
                    products
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
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-8 pt-6">
                <FormControl>
                  <Textarea
                    placeholder="Enter Blog Title Here..."
                    className="text-3xl border-none font-bold placeholder:text-muted-foreground/60"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-8 pt-6">
                <FormControl>
                  <TextEditor
                    placeholder="Enter Blog Title Here..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ArticleForm;
