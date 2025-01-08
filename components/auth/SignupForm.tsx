"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { Mail, Phone, Lock, User } from "lucide-react";

import { Button, ProcessIndicator } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "@/lib/hooks/use-toast";
import { signupSchema } from "@/lib/validations/auth.validation";
import useSignup from "@/lib/mutations/auth/useSignup";
import { cn } from "@/lib/utils";

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const { mutate, isPending } = useSignup();
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      phone_number: "",
      credentials: {
        password: "",
        confirm_password: "",
      },
      agree_t_and_c: false,
    },
  });

  const onSubmit = (values: SignupFormValues) => {
    mutate(values);
  };

  return (
    <div
      className={cn(
        "container mx-auto px-4 py-8",
        isPending && "pointer-events-none",
      )}
    >
      <Card className="max-w-lg mx-auto border shadow-lg bg-background/60 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <h2 className="text-2xl font-bold text-center">Create an account</h2>
          <p className="text-muted-foreground text-center">
            Enter your details below to create your account
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Enter your full name"
                          {...field}
                          disabled={isPending}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Enter your mobile number"
                          {...field}
                          disabled={isPending}
                          type="tel"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="credentials.password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Enter your password"
                          {...field}
                          disabled={isPending}
                          type="password"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs">
                      Password must contain at least 8 characters, one
                      uppercase, one lowercase, one number and one special
                      character
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="credentials.confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Confirm your password"
                          {...field}
                          disabled={isPending}
                          type="password"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agree_t_and_c"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the{" "}
                        <a
                          href="/terms"
                          className="text-primary underline hover:text-primary/90"
                        >
                          terms and conditions
                        </a>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                <ProcessIndicator
                  isProcessing={isPending}
                  btnText="Create account"
                  processingText="Creating account..."
                />
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary underline hover:text-primary/90"
            >
              Sign in
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
