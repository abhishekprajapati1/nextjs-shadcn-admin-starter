'use server';

import { notFound } from "next/navigation";
import React from "react";
import VerifyEmail from "@/components/auth/verify-email/VerifyEmail";

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
