import React from "react";
import ItemDetail from "@/components/products/details/ItemDetail";
import PageWrapper from "@/components/wrappers/PageWrapper";

function DetailsPage() {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <PageWrapper>
        <ItemDetail />
      </PageWrapper>
    </div>
  );
}

export default DetailsPage;
