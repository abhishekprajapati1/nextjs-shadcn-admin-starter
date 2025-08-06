"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getApiClient, getErrorMessage } from "@/lib/api";
import ENDPOINTS from "@/lib/endpoints";
import { toast } from "@/lib/hooks/use-toast";
import { useRouter } from "next/navigation";

import Verified from "./cards/Verified";
import Verifying from "./cards/Verifying";
import TokenExpired from "./cards/TokenExpired";
import ServerError from "./cards/ServerError";
import VerifiedAlready from "./cards/VerifiedAlready";

type VerificationStatus =
  | "verifying"
  | "verified"
  | "expired"
  | "error"
  | "already_verified";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<VerificationStatus>("verifying");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      toast({
        description: "Invalid verification link",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    const verifyEmail = async () => {
      try {
        const api = getApiClient();
        const response = await api.get(ENDPOINTS.AUTH.verify_email(token));

        if (response.data.success) {
          setEmail(response.data.data.email);
          setStatus("verified");

          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }
      } catch (error: any) {
        console.error("Email verification error:", error);

        if (error.response?.status === 400) {
          const message = error.response.data.message;

          if (message.includes("already verified")) {
            setStatus("already_verified");
            setEmail(error.response.data.data?.email || "");
          } else if (
            message.includes("expired") ||
            message.includes("invalid")
          ) {
            setStatus("expired");
          } else {
            setStatus("error");
          }
        } else {
          setStatus("error");
        }
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  const renderCard = () => {
    switch (status) {
      case "verifying":
        return <Verifying />;
      case "verified":
        return <Verified email={email} />;
      case "expired":
        return <TokenExpired />;
      case "error":
        return <ServerError />;
      case "already_verified":
        return <VerifiedAlready email={email} />;
      default:
        return <Verifying />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {renderCard()}
    </div>
  );
}
