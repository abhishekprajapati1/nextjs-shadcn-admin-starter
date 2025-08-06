import { SendPasswordResetLinkForm } from "@/features/auth";

const ForgotPasswordPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted animate-smooth">
      <SendPasswordResetLinkForm />
    </div>
  );
};

export default ForgotPasswordPage;
