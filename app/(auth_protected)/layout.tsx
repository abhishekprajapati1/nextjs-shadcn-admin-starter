import React from "react";
import { IWrapper } from "@/lib/types";
import { protect } from "@/lib/server";

const AuthProtectionLayout: React.FC<IWrapper> = async ({ children }) => {
  await protect("/login", false);
  return <>{children}</>;
};
export default AuthProtectionLayout;
