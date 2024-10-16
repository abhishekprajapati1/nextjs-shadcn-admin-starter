import React from "react";
import LenseFeatureList from "@/components/lens-features/LenseFeatureList";
import DeleteLenseFeatureModal from "@/components/lens-features/DeleteLenseFeatureModal";
import Header from "@/components/lens-features/header";
import EditLenseFeatureModel from "@/components/lens-features/EditLenseFeatureModel";
import AddLensFeatureModal from "@/components/lens-features/AddLensFeatureModal";
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
