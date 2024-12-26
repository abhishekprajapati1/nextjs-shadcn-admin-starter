import DeleteModal from "@/components/articles/DeleteModal";
import Header from "@/components/articles/header";
import List from "@/components/articles/List";
import PageWrapper from "@/components/wrappers/PageWrapper";

const page = () => {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <DeleteModal />
      <Header />
      <PageWrapper>
        <List />
      </PageWrapper>
    </div>
  );
};
export default page;
