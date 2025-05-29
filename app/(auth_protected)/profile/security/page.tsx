import UpdatePasswordForm from "@/components/account/UpdatePasswordForm";
import Header from "@/components/navigation/auth-protected/header";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Security | Manage Account - Akku Ka Chasma",
};
const SecurityPage = () => {
  return (
    <div className="h-full p-4">
      <UpdatePasswordForm />
    </div>
  );
};
export default SecurityPage;
