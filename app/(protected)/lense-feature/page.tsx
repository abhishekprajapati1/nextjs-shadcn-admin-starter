import React from "react";
import LenseFeatureList from "@/components/lens-feature/LenseFeatureList";
import DeleteLenseFeatureModal from "@/components/lens-feature/DeleteLenseFeatureModal";
import Header from "@/components/lens-feature/header";
import EditLenseFeatureModel from "@/components/lens-feature/EditLenseFeatureModel";
import AddLensFeatureModal from "@/components/lens-feature/AddLensFeatureModal";
import PageWrapper from "@/components/wrappers/PageWrapper";

const Page = () => {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <DeleteLenseFeatureModal />
      <EditLenseFeatureModel />
      <AddLensFeatureModal />
      <Header />
      <PageWrapper>
        <LenseFeatureList />
      </PageWrapper>
    </div>
  );
};

export default Page;
