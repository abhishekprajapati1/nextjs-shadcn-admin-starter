import Footer from "@/components/navigation/Footer";
import { IWrapper } from "@/lib/types";
import React from "react";

const PublicPageLayout: React.FC<IWrapper> = ({ children }) => {
  return (
    <React.Fragment>
      {children}
      <Footer />
    </React.Fragment>
  );
};
export default PublicPageLayout;
