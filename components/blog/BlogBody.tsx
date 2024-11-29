"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetStore, showModal } from "@/store/categories/form.slice";
import useUpdate from "@/lib/mutations/admin/categories/useUpdate";
import useCreate from "@/lib/mutations/admin/categories/useCreate";
import { formSchema } from "@/lib/validations/admin/categories.validation";
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

const BlogBody: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { title: "", description: "", seo_title: "" },
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  const dispatch = useAppDispatch();
  const { data, item_id } = useAppSelector(
    (store) => store.categoryStore.formStore
  );

  const { mutate: updateShape, isPending: updating } = useUpdate();
  const { mutate: createShape, isPending: creating } = useCreate();
  const isPending = updating || creating;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (form.formState.isDirty) {
      if (item_id) {
        updateShape(data);
      } else {
        createShape(data);
      }
    } else {
      dispatch(resetStore());
    }
  };

  console.log("see this", form.formState.isDirty);

  React.useEffect(() => {
    if (data) {
      form.reset({
        title: data?.title,
        description: data?.description,
        seo_title: data?.seo_title,
      });
    }
  }, [data, form]);

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
                        {...(data?.image?.url && {
                          defaultValue: {
                            type: "image",
                            url: data?.image?.url,
                          },
                        })}
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
            <div className="w-full flex justify-evenly pb-5">
              <Button
                type="button"
                onClick={() =>
                  dispatch(item_id ? resetStore() : showModal(false))
                }
                variant="secondary"
                className="text-md font-semibold text-secondary-foreground/60 px-12 py-7 bg-muted-foreground/15"
              >
                {item_id ? "Discard" : "Save draft"}
              </Button>
              <Button
                type="submit"
                className="text-md font-semibold text-muted-foreground px-12 py-7 bg-blue-600 text-white"
              >
                <ProcessIndicator
                  isProcessing={isPending}
                  btnText={item_id ? "Save" : "Publish"}
                />
              </Button>
            </div>
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
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-secondary-foreground/80">
                    Slug
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-10 text-xs border-none"
                      placeholder="enter-custom-slug"
                      {...field}
                    />
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
                  <FormLabel className="text-sm text-secondary-foreground/80">
                    Tags
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-xs border-b-2 border-t-0 border-r-0 border-l-0"
                      placeholder="Enter a keyword..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] text-secondary-foreground/50">
                    ! Enter comma, for adding keyword!
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-8 pt-6">
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-3xl font-bold text-muted-foreground/60">
                    Enter Blog Title Here...
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-12 text-start border-none"
                      // placeholder="Start typing your content here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-muted-foreground/60 italic">
                    Start typing your content here...
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BlogBody;
