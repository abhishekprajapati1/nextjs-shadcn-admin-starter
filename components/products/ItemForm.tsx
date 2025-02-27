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
  genderOptions,
  tags,
} from "@/lib/validations/admin/product.validation";
import { resetStore, showModal } from "@/store/products/form.slice";
import useUpdate from "@/lib/mutations/admin/products/useUpdate";
import useCreate from "@/lib/mutations/admin/products/useCreate";
import { Textarea } from "../ui/textarea";
import MultiSelect from "../ui/multi-select";
import SelectBox from "../ui/select-box";
import useFetch from "@/lib/hooks/use-fetch";
import ENDPOINTS from "@/lib/endpoints";
import { ICategory } from "../categories/ListItem";
import { IFrameMaterial } from "../frame-materials/FrameMaterial";
import { IShape } from "../shapes/ListItem";
import { IColor } from "../colors/ListItem";
import { IPowerType } from "../power-types/PowerType";

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

  const { data: categoriesData, isLoading: categoriesDataLoading } = useFetch<
    ICategory[]
  >({
    endpoint: ENDPOINTS.admin.categories.fetch_all(),
  });

  const { data: frameMaterialsData, isLoading: frameMaterialsLoading } =
    useFetch<IFrameMaterial[]>({
      endpoint: ENDPOINTS.admin.frame_materials.fetch_all(),
    });

  const { data: shapesData, isLoading: shapesDataLoading } = useFetch<IShape[]>(
    {
      endpoint: ENDPOINTS.admin.shapes.fetch_all(),
    }
  );
  const { data: colorData, isLoading: colorDataLoading } = useFetch<IColor[]>({
    endpoint: ENDPOINTS.admin.colors.fetch_all(),
  });

  const { data: powerData, isLoading: powerDataLoading } = useFetch<
    IPowerType[]
  >({
    endpoint: ENDPOINTS.admin.power_types.fetch_all(),
  });

  const dispatch = useAppDispatch();

  const { data, item_id } = useAppSelector(
    (store) => store.productStore.formStore
  );

  const { mutate: update, isPending: updating } = useUpdate();

  const {
    mutate: create,
    isPending: creating,
    isError,
    isSuccess,
  } = useCreate();

  const isPending = updating || creating;

  console.log("error", form.formState.errors);
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const payload = { ...data };

    if (item_id) {
      delete payload.color_ids;
      update(payload);
    } else {
      create(payload);
    }
  };

  React.useEffect(() => {
    if (data) {
      form.reset(data);
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
                  <Input
                    placeholder="Enter model number"
                    {...field}
                    type="number"
                    onChange={(e) =>
                      field.onChange(
                        isNaN(+e.target.value) ? 0 : +e.target.value
                      )
                    }
                  />
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
                        isNaN(+e.target.value) ? 0 : +e.target.value
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
                        isNaN(+e.target.value) ? 0 : +e.target.value
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
                        isNaN(+e.target.value) ? 0 : +e.target.value
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
                  <SelectBox
                    options={genderOptions}
                    placeholder="Select gender"
                    value={field.value}
                    onChange={field.onChange}
                  />
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
                        isNaN(+e.target.value) ? 0 : +e.target.value
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
                        isNaN(+e.target.value) ? 0 : +e.target.value
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
                        isNaN(+e.target.value) ? 0 : +e.target.value
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
                  <SelectBox
                    options={frameStyles}
                    placeholder="Select frame style"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Category starts */}
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <SelectBox
                    options={
                      categoriesDataLoading
                        ? []
                        : categoriesData?.map((cat) => ({
                            label: cat?.title ?? "Unknown",
                            value: cat?.id ?? "",
                          })) ?? []
                    }
                    placeholder="Select category"
                    value={field.value ?? ""}
                    onChange={(val) => field.onChange(val ?? "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Category ends */}

          {/* Frame material starts */}
          <FormField
            control={form.control}
            name="frame_material_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frame Material</FormLabel>
                <FormControl>
                  <SelectBox
                    options={
                      frameMaterialsLoading
                        ? []
                        : frameMaterialsData?.map((mat) => ({
                            label: mat?.title ?? "Unknown",
                            value: mat?.id ?? "",
                          })) ?? []
                    }
                    placeholder="Select Material"
                    value={field.value ?? ""}
                    onChange={(val) => field.onChange(val ?? "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Frame material ends */}

          {/* shape starts */}
          <FormField
            control={form.control}
            name="shape_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shape</FormLabel>
                <FormControl>
                  <SelectBox
                    options={
                      shapesDataLoading
                        ? []
                        : shapesData?.map((shape) => ({
                            label: shape?.title ?? "Unknown",
                            value: shape?.id ?? "",
                          })) ?? []
                    }
                    placeholder="Select Shape"
                    value={field.value ?? ""}
                    onChange={(val) => field.onChange(val ?? "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* shape ends */}

          {/* color start */}
          <FormField
            control={form.control}
            name="color_ids"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colors</FormLabel>
                <FormControl>
                  <MultiSelect
                    id="color_ids"
                    options={
                      colorDataLoading
                        ? []
                        : colorData?.map((color) => ({
                            label: color?.color ?? "Unknown",
                            value: color?.id ?? "",
                          })) ?? []
                    }
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* color ends */}

          {/* power type start */}
          <FormField
            control={form.control}
            name="power_type_ids"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Power Types</FormLabel>
                <FormControl>
                  <MultiSelect
                    id="power_type_ids"
                    options={
                      powerDataLoading
                        ? []
                        : powerData?.map((power) => ({
                            label: power?.title ?? "Unknown",
                            value: power?.id ?? "",
                          })) ?? []
                    }
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* power types ends */}

          {/* frame size  starts*/}
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
          {/* frame size ends */}

          {/* tags start */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <MultiSelect
                    id="tags"
                    options={tags}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* tags ends */}
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
