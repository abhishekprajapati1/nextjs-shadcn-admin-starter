"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import useVerifyEmail from "@/lib/mutations/auth/verify-email/userVerifyEmail";
import { useRouter } from "next/navigation"; // For navigation
import { Button } from "@/components/ui/button";

const VerifyEmail: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const router = useRouter(); // To handle navigation

  const { mutate, isPending, error } = useVerifyEmail();

  React.useEffect(() => {
    if (token) {
      mutate(token);
    }
  }, [token, mutate]);

  // Handler for "Try Again" button
  const handleRetry = () => {
    router.push("/resend-verification");
  };

  // Handler to close the page or navigate to home
  const handleClose = () => {
    router.push("/login");
  };

  return (
    <div className="w-full h-full flex items-center md:ml-[11%] lg:ml-[14%] xl:ml-[18%]">
      <div className="flex flex-col items-center gap-4">
        {!token ? (
          <p className="text-sm font-medium text-destructive">
            Error: No token found. Please check the link.
          </p>
        ) : (
          <>
            {isPending ? (
              <p className="text-sm font-medium text-accent-foreground">
                Email Verifying...
              </p>
            ) : (
              <>
                {error ? (
                  <>
                    <p className="text-red-500">
                      {error?.response?.data?.message ===
                      "Verification link is expired. Please request another verification link." ? (
                        <div className="flex flex-col items-center gap-2">
                          <p className="text-sm text-destructive font-medium">
                            Verification link is expired. Please request another
                            verification link.
                          </p>
                          <Button
                            onClick={handleRetry}
                            className="mt-4 px-4 py-2 "
                          >
                            Try Again
                          </Button>
                        </div>
                      ) : error?.response?.data?.message ===
                        "Email is already verified. You can close this page." ? (
                        <div className="flex flex-col items-center gap-2">
                          <p className="text-sm text-destructive font-medium">
                            Email is already verified. You can close this page.
                          </p>
                          <button
                            onClick={handleClose}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Close
                          </button>
                        </div>
                      ) : error?.response?.data?.message ===
                        "Verification failed. No user exists with this email address." ? (
                        <div className="flex flex-col items-center gap-2">
                          <p className="text-sm text-destructive font-medium">
                            Verification failed. No user exists with this email
                            address.
                          </p>
                          <Button onClick={handleRetry} variant={"default"}>
                            Try Again!
                          </Button>
                        </div>
                      ) : (
                        error?.response?.data?.message || "Verification failed."
                      )}
                    </p>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm font-medium text-green-600 tracking-wide">
                      Email successfully verified!
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
