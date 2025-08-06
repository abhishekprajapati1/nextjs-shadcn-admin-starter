"use client";
import { useSearchParams } from "next/navigation";
import SendPasswordResetLinkForm from "./SendPasswordResetLinkForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordForms() {
  const token = useSearchParams()?.get("token");

  if (!token) {
    return <SendPasswordResetLinkForm />;
  }

  return <ResetPasswordForm token={token} />;
}
