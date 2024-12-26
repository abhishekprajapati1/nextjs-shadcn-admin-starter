import ArticleForm from "@/components/articles/ArticleForm";
import Header from "@/components/articles/header/NewArticleHeader";
import PageWrapper from "@/components/wrappers/PageWrapper";
interface PageProps {
  params: { id: string };
}
const page: React.FC<PageProps> = ({ params: { id } }) => {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <Header />
      <PageWrapper>
        <ArticleForm id={id} />
      </PageWrapper>
    </div>
  );
};
export default page;
