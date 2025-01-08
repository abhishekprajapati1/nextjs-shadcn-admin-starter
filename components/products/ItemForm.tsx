"use client";
import { Button, ProcessIndicator } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
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
  FormDescription,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  formSchema,
  frameSizes,
  FrameStyle,
  frameStyles,
  Gender,
} from "@/lib/validations/admin/product.validation";
import { resetStore, showModal } from "@/store/products/form.slice";
import useUpdate from "@/lib/mutations/admin/products/useUpdate";
import useCreate from "@/lib/mutations/admin/products/useCreate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import MultiSelect from "../ui/multi-select";

const ItemForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      category_id: "",
      color_ids: [],
      description: "",
      frame_material_id: "",
      frame_size: [],
      frame_style: FrameStyle.FULL_FRAME,
      frame_width: 0,
      raw_material_sourced_from: "Imported International",
      gender: Gender.MALE,
      lens_height: 0,
      lens_width: 0,
      lens_material: "Demo Polycarbonate",
      listing_price: 0,
      model_name: "",
      model_number: 0,
      power_type_ids: [],
      price: 0,
      seo_title: "",
      shape_id: "",
      stock_quantity: 0,
      tags: [],
    },
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  const dispatch = useAppDispatch();

  const { data, item_id } = useAppSelector(
    (store) => store.couponStore.formStore,
  );

  const { mutate: update, isPending: updating } = useUpdate();

  const { mutate: create, isPending: creating } = useCreate();

  const isPending = updating || creating;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (item_id) {
      update(data);
    } else {
      create(data);
    }
  };

  React.useEffect(() => {
    if (data) {
      form.reset({});
    }
  }, [data, form]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Title input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* model name */}
          <FormField
            control={form.control}
            name="model_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter model name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* end of model name */}

          {/* model number */}
          <FormField
            control={form.control}
            name="model_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter model number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* end of model number */}

          {/* seo title */}
          <FormField
            control={form.control}
            name="seo_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the title for seo purposes"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* end of seo title */}

          {/* description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the description here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* end of description */}

          {/* listing price */}
          <FormField
            control={form.control}
            name="listing_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Listing Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) =>
                      field.onChange(
                        isNaN(+e.target.value) ? 0 : +e.target.value,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* end of listing price */}

          {/* selling price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selling Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        isNaN(+e.target.value) ? 0 : +e.target.value,
                      )
                    }
                  />
                </FormControl>
                <FormDescription>
                  The price to sell this product at.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* end of selling price */}

          {/* stock quantity */}
          <FormField
            control={form.control}
            name="stock_quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        isNaN(+e.target.value) ? 0 : +e.target.value,
                      )
                    }
                  />
                </FormControl>
                <FormDescription>
                  How many products do you have in stock.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* end of stock quantity */}

          {/* gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Gender.MALE}>Male</SelectItem>
                      <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                      <SelectItem value={Gender.OTHER}>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  The gender this product is for
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* end of gender */}

          {/* lens width */}
          <FormField
            control={form.control}
            name="lens_width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lens Width (mm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        isNaN(+e.target.value) ? 0 : +e.target.value,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* end of lens width */}

          {/* lens height */}
          <FormField
            control={form.control}
            name="lens_height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lens Height (mm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        isNaN(+e.target.value) ? 0 : +e.target.value,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* end of lens height */}

          {/* raw material sourced from */}
          <FormField
            control={form.control}
            name="lens_material"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lens Material</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* end of lens material */}

          {/* raw material sourced from */}
          <FormField
            control={form.control}
            name="raw_material_sourced_from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raw Material Sourced From</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* end of raw material sourced from */}

          {/* frame width */}
          <FormField
            control={form.control}
            name="frame_width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>frame width (mm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        isNaN(+e.target.value) ? 0 : +e.target.value,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* end of frame width */}

          {/* frame style */}
          <FormField
            control={form.control}
            name="frame_style"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frame Style</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a frame style" />
                    </SelectTrigger>
                    <SelectContent>
                      {frameStyles?.map((fs) => (
                        <SelectItem key={fs.value} value={fs.value || ""}>
                          {fs.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* end of frame style */}

          {/* frame style */}
          <FormField
            control={form.control}
            name="frame_size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frame Size</FormLabel>
                <FormControl>
                  <MultiSelect
                    id="frame-sizes"
                    options={frameSizes}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* end of frame size */}
        </div>

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

export default ItemForm;
