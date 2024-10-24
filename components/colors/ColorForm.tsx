"use client";
import { Button, ProcessIndicator } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "@/lib/validations/admin/colors.validation";

import { resetStore, showModal } from "@/store/colors/form.slice";
import useUpdate from "@/lib/mutations/admin/colors/useUpdate";
import useCreate from "@/lib/mutations/admin/colors/useCreate";
import { Input } from "../ui/input";

const ColoreForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { color: "#000000" },
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  const dispatch = useAppDispatch();

  const { data, item_id } = useAppSelector(
    (store) => store.colorStore.formStore
  );

  const { mutate: updateColor, isPending: updating } = useUpdate();

  const { mutate: createColor, isPending: creating } = useCreate();

  const isPending = updating || creating;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (item_id) {
      updateColor(data);
    } else {
      createColor(data);
    }
  };

  React.useEffect(() => {
    if (data) {
      form.reset({
        color: data?.color,
      });
    }
  }, [data, form]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="color" className="size-8 p-0" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <span className="text-xs text-gray-500">OR</span>
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter hex color code." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

export default ColoreForm;
