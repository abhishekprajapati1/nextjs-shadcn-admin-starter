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
import { updatePasswordSchema } from "@/lib/validations/account.validations";
import { cn } from "@/lib/utils";
import useUpdatePassword from "@/lib/mutations/account/useUpdatePassword";

const UpdatePasswordForm = () => {
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    mode: "all",
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const { handleSubmit } = form;

  const { mutate: updateProfile, isPending } = useUpdatePassword();

  const onSubmit = (data: z.infer<typeof updatePasswordSchema>) => {
    updateProfile(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "max-w-[500px] flex flex-col gap-8",
          isPending && "pointer-events-none",
        )}
      >
        <div className="flex flex-col gap-4 flex-grow">
          <FormField
            control={form.control}
            name="current_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter current password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter new password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter password again to confirm"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button
            type={isPending ? "button" : "submit"}
            className="min-w-24 rounded-3xl"
            disabled={isPending}
          >
            <ProcessIndicator
              isProcessing={isPending}
              btnText="Update Password"
            />
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default UpdatePasswordForm;
