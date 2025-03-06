import DeleteModal from "@/components/newsletters/DeleteModal";
import EditModal from "@/components/newsletters/EditModal";
import Header from "@/components/newsletters/header";
import List from "@/components/newsletters/List";
import PageWrapper from "@/components/wrappers/PageWrapper";

const page = () => {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <DeleteModal />
      <EditModal />
      <Header />
      <PageWrapper>
        <List />
      </PageWrapper>
    </div>
  );
};
export default page;
