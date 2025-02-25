"use client";
import React, { useState } from "react";
import Image from "next/image";
import glass from "../../../public/aviator.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FileInput from "@/components/ui/file-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import FilePreview from "@/components/ui/file-input/FilePreview";
import DragDropIcon from "@/components/icons/DragDropIcon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productSchema } from "@/lib/validations/admin/product.validation";
const PRODUCTS = {
  colors: [
    { id: "color_1", color: "#FF0000" }, // Red
    { id: "color_2", color: "#00FF00" }, // Green
    { id: "color_3", color: "#0000FF" }, // Blue
  ],
  images: [
    {
      id: "img_101",
      url: glass, // Red Image
      fieldname: "thumbnail",
      color_id: "#FF0000",
    },
    {
      id: "img_102",
      url: glass, // Green Image
      fieldname: "other_images",
      color_id: "#00FF00",
    },
    {
      id: "img_103",
      url: glass, // Blue Image
      fieldname: "other_images",
      color_id: "#0000FF",
    },
    {
      id: "img_104",
      url: glass, // Another Red Image
      fieldname: "other_images",
      color_id: "#FF0000",
    },
    {
      id: "img_105",
      url: glass, // Another Green Image
      fieldname: "other_images",
      color_id: "#00FF00",
    },
  ],
};

function ItemDetail() {
  const [data, setData] = useState(
    PRODUCTS?.images?.filter(
      (item) => item.color_id === PRODUCTS?.colors[0]?.color
    )
  );

  console.log("data", data);
  const form = useForm<z.infer<typeof productSchema>>({
    defaultValues: {
      other_images: null,
      thumbnail: null,
    },
    mode: "onBlur",
    resolver: zodResolver(productSchema),
  });

  const handleColor = (colorValue: string) => {
    setData(PRODUCTS?.images?.filter((items) => items.color_id === colorValue));
  };

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    console.log("productDetails", data);
  };

  return (
    <Card className="flex flex-col gap-6 border-none shadow-none">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-6">
          <Image
            src={glass}
            width={500}
            height={500}
            alt="glass"
            className="object-contain rounded-lg size-40 shadow-md"
          />
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-lg">Product A</h2>
            <h4 className="text-gray-500 text-sm">Model Number</h4>
          </div>
        </div>
        <div className="flex gap-6">
          <Button className="w-28">Edit</Button>
          <Button className="w-28">Delete</Button>
        </div>
      </div>
      <div className="flex flex-row gap-4 py-4 px-2">
        {PRODUCTS?.colors?.map((items, id) => (
          <Button
            onClick={() => handleColor(items.color)}
            key={id}
            className="w-24 cursor-pointer"
            style={{ backgroundColor: `${items.color}` }}
          ></Button>
        ))}
      </div>
      <Form {...form}>
        <form
          className="w-full grid grid-cols-12 gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-row gap-6">
            <div>
              {data
                ?.filter((item) => item.fieldname === "thumbnail")
                ?.map((item, index) => (
                  <span key={index}>
                    <FormField
                      control={form.control}
                      name="thumbnail"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FileInput
                              value={field.value}
                              onChange={(files) => field.onChange(files?.[0])}
                              className="size-56 shadow-md"
                            >
                              <FilePreview
                                file={field.value}
                                {...(item?.url && {
                                  defaultValue: {
                                    type: "image",
                                    url: item?.url.src,
                                  },
                                })}
                                className="size-full grid place-content-center border-none"
                              >
                                <DragDropIcon className="size-[25px]" />
                              </FilePreview>
                            </FileInput>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>
                ))}
              <span className="min-w-56 block">Thumbnail</span>
            </div>
            <div>
              <div className="flex flex-row gap-4">
                {data
                  ?.filter((item) => item.fieldname === "other_images")
                  ?.map((item, index) => (
                    <span key={index}>
                      <FormField
                        control={form.control}
                        name="other_images"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <FileInput
                                value={field.value}
                                onChange={(files) => field.onChange(files?.[0])}
                                className="size-56 shadow-md"
                              >
                                <FilePreview
                                  file={field.value}
                                  {...(item?.url && {
                                    defaultValue: {
                                      type: "image",
                                      url: item?.url.src,
                                    },
                                  })}
                                  className="size-full grid place-content-center border-none"
                                >
                                  <DragDropIcon className="size-[25px]" />
                                </FilePreview>
                              </FileInput>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </span>
                  ))}
              </div>
              <span className="min-w-56 block">Other Images</span>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
}

export default ItemDetail;
