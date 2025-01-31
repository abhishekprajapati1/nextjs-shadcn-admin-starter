"use client";
import React from "react";
import { notFound, useSearchParams } from "next/navigation";
import useVerifyEmail from "@/lib/mutations/auth/verify-email/userVerifyEmail";
import { useRouter } from "next/navigation"; // For navigation
import Verified from "./Verified";
import Verifying from "./Verifying";
import VerifiedAlready from "./VerifiedAlready";
import TokenExpired from "./TokenExpired";

const VerifyEmail: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  // also get the email
  const router = useRouter(); // To handle navigation

  const { mutate, isPending, error, isSuccess } = useVerifyEmail();

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

  if (!token) {
    notFound();
  }

  if (token && isPending) {
    return <Verifying />;
  }

  if (token && isSuccess) {
    return <Verified />;
  }
  if (token && error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-black">
        <p className="text-red-500">
          {error?.response?.data?.message ===
          "Verification link is expired. Please request another verification link." ? (
            <TokenExpired
              onClick={handleRetry}
              message="Verification link is expired. Please request another verification link."
            />
          ) : error?.response?.data?.message ===
            "Email is already verified. You can close this page." ? (
            <VerifiedAlready
              onClick={handleClose}
              message="Email is already verified. You can close this page."
            />
          ) : error?.response?.data?.message ===
            "Verification failed. No user exists with this email address." ? (
            <TokenExpired
              onClick={handleRetry}
              message="Verification failed. No user exists with this email address."
            />
          ) : (
            error?.response?.data?.message || "Verification failed."
          )}
        </p>
      </div>
    );
  }
};

export default VerifyEmail;
