import UserProfileForm from "@/components/account/UserProfileForm";
import Header from "@/components/navigation/auth-protected/header";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile | Manage Account - Akku Ka Chasma",
};
const ProfilePage = () => {
  return (
    <div className="h-full p-4">
      <UserProfileForm />
    </div>
  );
};
export default ProfilePage;
