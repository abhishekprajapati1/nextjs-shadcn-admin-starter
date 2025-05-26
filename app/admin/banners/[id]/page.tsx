import AddModal from "@/components/banners/detail-view/AddModal";
import DeleteModal from "@/components/banners/detail-view/DeleteModal";
import EditModal from "@/components/banners/detail-view/EditModal";
import Header from "@/components/banners/detail-view/header";
import List from "@/components/banners/detail-view/List";
import PageWrapper from "@/components/wrappers/PageWrapper";
import React from "react";

interface BannerDetailsPageProps {
  params: {
    id: string;
  };
}
const BannerDetailsPage: React.FC<BannerDetailsPageProps> = ({
  params: { id },
}) => {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <Header />
      <AddModal />
      <EditModal />
      <DeleteModal />
      <PageWrapper className="flex-grow">
        <List />
      </PageWrapper>
    </div>
  );
};
export default BannerDetailsPage;
