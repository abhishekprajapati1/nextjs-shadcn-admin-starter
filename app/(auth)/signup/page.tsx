import React from "react";
import { SignupForm } from "@/components/auth/SignupForm";
import { checkToken } from "@/lib/server";
import { redirect } from "next/navigation";

const SignupPage = () => {
  const token = checkToken();
  if (token) {
    redirect("/");
  }

  return <SignupForm />;
};

export default SignupPage;
