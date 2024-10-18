import React from "react";
import LensFeatureList from "@/components/lens-features/LensFeatureList";
import DeleteLensFeatureModal from "@/components/lens-features/DeleteLensFeatureModal";
import Header from "@/components/lens-features/header";
import EditLensFeatureModel from "@/components/lens-features/EditLensFeatureModel";
import AddLensFeatureModal from "@/components/lens-features/AddLensFeatureModal";
import PageWrapper from "@/components/wrappers/PageWrapper";

const Page = () => {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <DeleteLensFeatureModal />
      <EditLensFeatureModel />
      <AddLensFeatureModal />
      <Header />
      <PageWrapper>
        <LensFeatureList />
      </PageWrapper>
    </div>
  );
};

export default Page;
