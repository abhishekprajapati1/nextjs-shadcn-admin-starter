import { notFound } from "next/navigation";
import React from "react";
import VerifyEmail from "@/components/auth/verify-email/VerifyEmail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | Akku Ka Chasma",
  description:
    "Verify your email address to complete your registration with Akku Ka Chasma and access your account.",
  keywords: [
    "email verification",
    "account verification",
    "verify account",
    "confirm email",
    "email confirmation",
    "account activation",
  ],
};

const Page = async ({ searchParams }: { searchParams: { token?: string } }) => {
  const token = searchParams?.token;

  // Redirect to 404 if token is not present
  if (!token) {
    notFound();
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <VerifyEmail />
    </div>
  );
};

export default Page;
