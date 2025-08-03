"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { Mail, Phone, Lock, User, CheckCircle, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

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
import { cn } from "@/lib/utils";
import { getApiClient, getErrorMessage } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [cooldownData, setCooldownData] = useState<{
    remainingSeconds: number;
    attempts: number;
  } | null>(null);
  const [countdownTimer, setCountdownTimer] = useState<NodeJS.Timeout | null>(
    null,
  );

  // Check URL params on component mount and fetch cooldown status
  useEffect(() => {
    const success = searchParams.get("success");
    const email = searchParams.get("email");

    if (success === "true" && email) {
      setIsSignupSuccess(true);
      setUserEmail(email);

      // Fetch current cooldown status and check email verification from backend
      const fetchStatus = async () => {
        try {
          const api = getApiClient();

          // Check email verification status first
          const verificationResponse = await api.get(
            ENDPOINTS.AUTH.email_verification_status(email),
          );

          if (
            verificationResponse.data.success &&
            verificationResponse.data.data.isVerified
          ) {
            // Email is already verified, redirect to login
            toast({
              description: "Email already verified! Redirecting to login...",
            });

            // Clear URL params and redirect
            router.push("/login");
            return;
          }

          // If not verified, check cooldown status
          const cooldownResponse = await api.get(
            ENDPOINTS.AUTH.email_cooldown(email),
          );

          if (cooldownResponse.data.success) {
            const { canSend, remainingSeconds, attempts } =
              cooldownResponse.data.data;

            console.log("Cooldown status from backend:", {
              canSend,
              remainingSeconds,
              attempts,
            });

            if (!canSend && remainingSeconds > 0) {
              setCooldownData({
                remainingSeconds,
                attempts,
              });
            } else {
              setCooldownData(null);
            }
          }
        } catch (error) {
          console.log("Failed to fetch status:", error);
        }
      };

      fetchStatus();
    }
  }, [searchParams]);

  // Start countdown timer when cooldown data is set
  useEffect(() => {
    if (cooldownData?.remainingSeconds && cooldownData.remainingSeconds > 0) {
      const timer = setInterval(() => {
        setCooldownData((prev) => {
          if (!prev || prev.remainingSeconds <= 1) {
            clearInterval(timer);
            setCountdownTimer(null);

            // When countdown reaches 0, verify with backend
            if (userEmail) {
              const verifyCooldown = async () => {
                try {
                  const api = getApiClient();
                  const response = await api.get(
                    ENDPOINTS.AUTH.email_cooldown(userEmail),
                  );

                  if (response.data.success && response.data.data.canSend) {
                    setCooldownData(null);
                  } else {
                    // Backend still has cooldown, sync the actual remaining time
                    setCooldownData({
                      remainingSeconds: response.data.data.remainingSeconds,
                      attempts: response.data.data.attempts,
                    });
                  }
                } catch (error) {
                  console.log("Failed to verify cooldown with backend:", error);
                }
              };

              verifyCooldown();
            }

            return null;
          }
          return {
            ...prev,
            remainingSeconds: prev.remainingSeconds - 1,
          };
        });
      }, 1000);

      setCountdownTimer(timer);
    }

    // Cleanup timer on unmount
    return () => {
      if (countdownTimer) {
        clearInterval(countdownTimer);
      }
    };
  }, [cooldownData?.remainingSeconds, userEmail]);

  // Periodically sync with backend cooldown status and check email verification (every 30 seconds)
  useEffect(() => {
    if (isSignupSuccess && userEmail) {
      const syncInterval = setInterval(async () => {
        try {
          const api = getApiClient();

          // Check email verification status first
          const verificationResponse = await api.get(
            ENDPOINTS.AUTH.email_verification_status(userEmail),
          );

          if (
            verificationResponse.data.success &&
            verificationResponse.data.data.isVerified
          ) {
            // Email is verified, redirect to login
            toast({
              description:
                "Email verified successfully! Redirecting to login...",
            });

            // Clear URL params and redirect
            router.push("/login");
            return;
          }

          // If not verified, check cooldown status
          const cooldownResponse = await api.get(
            ENDPOINTS.AUTH.email_cooldown(userEmail),
          );

          if (cooldownResponse.data.success) {
            const { canSend, remainingSeconds, attempts } =
              cooldownResponse.data.data;

            if (!canSend && remainingSeconds > 0) {
              setCooldownData({
                remainingSeconds,
                attempts,
              });
            } else if (canSend) {
              setCooldownData(null);
            }
          }
        } catch (error) {
          console.log("Failed to sync status:", error);
        }
      }, 30000); // Sync every 30 seconds

      return () => clearInterval(syncInterval);
    }
  }, [isSignupSuccess, userEmail, router]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignupFormValues) => {
      // @ts-ignore
      delete data.credentials.confirm_password;
      const api = getApiClient();
      const response = await api.post(ENDPOINTS.AUTH.SIGNUP, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update URL with success state
      const params = new URLSearchParams();
      params.set("success", "true");
      params.set("email", variables.email);
      router.push(`/signup?${params.toString()}`);

      setIsSignupSuccess(true);
      setUserEmail(variables.email);
      toast({ description: "Account created successfully." });
    },
    onError: (error: any) => {
      toast({
        description: getErrorMessage(error) || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const resendVerificationMutation = useMutation({
    mutationFn: async () => {
      const api = getApiClient();
      const response = await api.post(ENDPOINTS.AUTH.resend_verification_mail, {
        email: userEmail,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast({ description: "Verification email sent successfully." });

      // Update cooldown data from backend response
      if (data.data) {
        setCooldownData({
          remainingSeconds: data.data.cooldownSeconds,
          attempts: data.data.attempts,
        });
      }
    },
    onError: (error: any) => {
      // Handle cooldown error from backend
      if (error?.response?.data?.data) {
        const { remainingSeconds, attempts } = error.response.data.data;
        setCooldownData({
          remainingSeconds,
          attempts,
        });
        toast({
          description: error.response.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          description:
            getErrorMessage(error) || "Failed to resend verification email",
          variant: "destructive",
        });
      }
    },
  });

  const handleResendVerification = async () => {
    // Check if there's an active cooldown
    if (cooldownData?.remainingSeconds && cooldownData.remainingSeconds > 0) {
      toast({
        description: `Please wait ${cooldownData.remainingSeconds} seconds before requesting another email.`,
        variant: "destructive",
      });
      return;
    }

    console.log(
      "Attempting to resend verification email. Cooldown data:",
      cooldownData,
    );

    setIsResending(true);
    await resendVerificationMutation.mutateAsync();
    setIsResending(false);
  };

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

  // Success UI
  if (isSignupSuccess) {
    return (
      <Card className="max-w-lg mx-auto border shadow-lg bg-background/60 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold">Account Created Successfully!</h2>
          <p className="text-muted-foreground">
            We've sent a verification email to{" "}
            <span className="font-medium text-foreground">{userEmail}</span>
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Please check your email and click the verification link to
              activate your account.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Didn't receive the email?</p>
            <p>Check your spam folder or contact support if you need help.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResendVerification}
              disabled={
                isResending || (cooldownData?.remainingSeconds || 0) > 0
              }
            >
              <RefreshCw
                className={cn("mr-2 h-4 w-4", isResending && "animate-spin")}
              />
              {isResending
                ? "Sending..."
                : cooldownData?.remainingSeconds
                  ? `Resend in ${cooldownData.remainingSeconds}s (${cooldownData.attempts} attempts)`
                  : "Resend Verification Email"}
            </Button>
            {cooldownData?.remainingSeconds &&
              cooldownData.remainingSeconds > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-linear"
                    style={{
                      width: `${((cooldownData.attempts * 10 - cooldownData.remainingSeconds) / (cooldownData.attempts * 10)) * 100}%`,
                    }}
                  />
                </div>
              )}
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              // Clear URL params and reset form
              router.push("/signup");
              setIsSignupSuccess(false);
              setUserEmail("");
              form.reset();
            }}
          >
            Create Another Account
          </Button>
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
    );
  }

  // Form UI
  return (
    <div className={cn("w-full h-full", isPending && "pointer-events-none")}>
      <Card className="border shadow-lg bg-background/60 backdrop-blur-sm">
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

              <div className="flex flex-column sm:flex-row w-full gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
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
                    <FormItem className="w-full">
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
              </div>
              <div className="flex flex-column sm:flex-row w-full gap-6">
                <FormField
                  control={form.control}
                  name="credentials.password"
                  render={({ field }) => (
                    <FormItem className="w-full">
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
                    <FormItem className="w-full">
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
              </div>
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
