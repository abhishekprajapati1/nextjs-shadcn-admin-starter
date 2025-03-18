import React from "react";
import ResetPasswordForms from "@/components/auth/reset-password/ResetPasswordForms";

const ResetPasswordPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted animate-smooth">
      <React.Suspense>
        <ResetPasswordForms />
      </React.Suspense>
    </div>
  );
};

export default ResetPasswordPage;
