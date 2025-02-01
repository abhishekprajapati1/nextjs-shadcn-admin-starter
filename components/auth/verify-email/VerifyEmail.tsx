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
        {error?.response?.data?.type === "ERR_TOKEN_EXPIRED" ? (
          <TokenExpired
            onClick={handleRetry}
            message={`${error?.response?.data?.message}`}
          />
        ) : error?.response?.data?.type === "ERR_ALREADY_VERIFIED" ? (
          <VerifiedAlready
            onClick={handleClose}
            message={`${error?.response?.data?.message}`}
          />
        ) : error?.response?.data?.type === "ERR_TOKEN_INVALID" ? (
          <TokenExpired
            onClick={handleRetry}
            message={`${error?.response?.data?.message}`}
          />
        ) : (
          error?.response?.data?.type === "INTERNAL_SERVER_ERR" && (
            <TokenExpired
              onClick={handleRetry}
              message={`${error?.response?.data?.message}`}
            />
          )
        )}
      </div>
    );
  }
};

export default VerifyEmail;
