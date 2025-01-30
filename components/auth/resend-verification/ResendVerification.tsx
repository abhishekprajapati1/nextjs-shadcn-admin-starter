"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button, ProcessIndicator } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ResendVerificationSchema } from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import useResendVerification from "@/lib/mutations/auth/verify-email/useResendVerification";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail } from "lucide-react";
import { z } from "zod";

type ResendVerificationFormValues = z.infer<typeof ResendVerificationSchema>;

const ResendVerification = () => {
  const form = useForm<ResendVerificationFormValues>({
    resolver: zodResolver(ResendVerificationSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useResendVerification();

  const onSubmit = (values: ResendVerificationFormValues) => {
    mutate(values);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="space-y-1">
        <h2 className="text-2xl font-bold text-center">Welcome</h2>
        <p className="text-muted-foreground text-center">
          Resend Verification Link
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        disabled={isPending}
                        type="email"
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              <ProcessIndicator
                isProcessing={isPending}
                btnText="Submit"
                processingText="Submitting email..."
              />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResendVerification;
