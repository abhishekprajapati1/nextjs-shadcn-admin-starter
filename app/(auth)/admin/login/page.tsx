"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/validations/auth.validation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "@/lib/mutations/auth/login/useLogin";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import SpinnerIcon from "@/components/icons/SpinnerIcon";

const LoginPage = () => {
  const { mutate, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    mutate(data);
  };

  return (
    <div
      className={cn(
        "w-full h-full grid place-content-center",
        isPending && "pointer-events-none",
      )}
    >
      <Card>
        <CardHeader>Howdy! Admin</CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g john.doe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter password here..."
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
                name="remember_me"
                render={({ field: { value, onChange } }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Checkbox checked={value} onCheckedChange={onChange} />
                      </FormControl>
                      <FormLabel className="ms-2">Remember me</FormLabel>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <Button
                className={cn("gap-2", isPending && "pointer-events-none")}
                type={isPending ? "button" : "submit"}
                disabled={isPending}
              >
                {isPending && (
                  <>
                    <SpinnerIcon /> Logging in...
                  </>
                )}
                {!isPending && <>Login</>}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
