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
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "@/lib/validations/admin/colors.validation";

import { resetStore, showModal } from "@/store/colors/form.slice";
import useUpdate from "@/lib/mutations/admin/colors/useUpdate";
import useCreate from "@/lib/mutations/admin/colors/useCreate";

const ColoreForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { title: "", description: "" },
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
        //  title: data?.title,
        // description: data?.description,
      });
    }
  }, [data, form]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          
          
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
