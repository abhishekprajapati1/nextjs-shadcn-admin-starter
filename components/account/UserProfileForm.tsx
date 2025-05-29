"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button, ProcessIndicator } from "../ui/button";
import FileInput from "../ui/file-input";
import FilePreview from "../ui/file-input/FilePreview";
import DragDropIcon from "../icons/DragDropIcon";
import React from "react";
import useUpload from "@/lib/mutations/useUpload";
import useSessionStorage from "@/hooks/use-session-storage";
import { IFile, IUser } from "@/lib/types";
import useFetch from "@/lib/hooks/use-fetch";
import ENDPOINTS from "@/lib/endpoints";
import { Input } from "../ui/input";
import { z } from "zod";
import { formSchema } from "@/lib/validations/account.validations";
import useUpdateProfile from "@/lib/mutations/account/useUpdateProfile";
import { cn } from "@/lib/utils";

const UserProfileForm = () => {
  const { value: uploadedImage, setValue: setUploadedImage } =
    useSessionStorage<IFile>("avatar");
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    defaultValues: {
      name: "",
      phone_number: "",
    },
  });
  const { data } = useFetch<IUser>({
    endpoint: ENDPOINTS.AUTH.details,
  });
  const { mutate: upload, isPending: uploading } = useUpload();
  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = form;

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (isDirty || uploadedImage?.is_temp) {
      updateProfile(data);
    }
  };

  React.useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        phone_number: data.phone_number,
      });
    }
  }, [data, reset]);

  React.useEffect(() => {
    if (data?.avatar) {
      setUploadedImage({
        id: data.avatar.id,
        url: data.avatar.url,
        fieldname: data.avatar.fieldname || "",
      });
    }
  }, [data]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "max-w-[500px] flex flex-col gap-8",
          isPending && "pointer-events-none",
        )}
      >
        <div className="flex gap-10">
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
            className="size-[100px] rounded-full flex-shrink-0"
          >
            <FilePreview
              file={null}
              {...(uploadedImage && {
                defaultValue: {
                  type: "image",
                  url: uploadedImage?.url,
                },
              })}
              className="size-full grid place-content-center"
            >
              <DragDropIcon className="size-[25px]" />
            </FilePreview>
          </FileInput>
          <div className="flex flex-col gap-4 flex-grow">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter phone number"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type={isPending ? "button" : "submit"}
            className="min-w-24 rounded-3xl"
            disabled={isPending}
          >
            <ProcessIndicator isProcessing={isPending} btnText="Save" />
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default UserProfileForm;
