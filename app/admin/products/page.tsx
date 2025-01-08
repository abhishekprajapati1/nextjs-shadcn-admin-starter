import Header from "@/components/products/header";
import PageWrapper from "@/components/wrappers/PageWrapper";
import List from "@/components/products/List";
import EditModal from "@/components/products/EditModal";
import AddModal from "@/components/products/AddModal";

const ProductPage = () => {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <Header />
      <EditModal />
      <AddModal />
      <PageWrapper>
        <List />
      </PageWrapper>
    </div>
  );
};
export default ProductPage;
