import React from "react";
import { cn } from "@/lib/utils";
import { LoginForm } from "@/features/auth";
import { checkToken } from "@/lib/server";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const token = checkToken();

  if (token) {
    redirect("/");
  }
  return (
    <div className={cn("w-full h-full grid place-content-center")}>
      <React.Suspense fallback={<div>Ruko jara sabar karo</div>}>
        <LoginForm forAdmin />
      </React.Suspense>
    </div>
  );
};

export default LoginPage;
