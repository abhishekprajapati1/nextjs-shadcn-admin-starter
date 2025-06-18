// import ProductsSlider from "@/components/home/home-section/ProductsSlider";
import React from "react";
import { fetchArticleBySlug } from "@/services/article.service";
import dayjs from "dayjs";
import { Calendar, Clock, Eye } from "lucide-react";
import Image from "next/image";
import TagsAndKeywords from "@/components/blog/TagsAndKeywords";
import { notFound } from "next/navigation";

interface BlogDetailsPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogDetailsPageProps) {
  const postTitle = decodeURIComponent(params.slug.replace(/-/g, " "));

  return {
    title: `${postTitle} | Blog`,
    description: `Read our latest blog post titled "${postTitle}". Stay informed with in-depth analysis, expert insights, and practical advice.`,
  };
}

const BlogDetailsPage = async ({ params: { slug } }: BlogDetailsPageProps) => {
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <React.Fragment>
      <div className="pb-10 container max-w-full sm:max-w-[90%] md:max-w-[700px] lg:max-w-[900px] mx-auto">
        {article?.thumbnail?.url && (
          <Image
            className="rounded-2xl shadow-lg shadow-foregroun/5 mb-10"
            src={article.thumbnail?.url}
            width={1000}
            height={1000}
            alt="Picture of the author"
          />
        )}
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 text-sm mb-6">
          <span className="mr-4 flex items-center">
            <Clock className="size-3 me-1" />
            {article.reading_time || 0} min read
          </span>
          <span className="mr-4 flex items-center">
            <Eye className="size-3 me-1" />
            {article.views?.toLocaleString()} views
          </span>
          <span className="mr-4 flex items-center">
            <Calendar className="size-3 me-1" />
            {dayjs(article.updated_at).format("MMMM D, YYYY")}
          </span>
        </div>
        <div
          className="article-container"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        <TagsAndKeywords tags={article.tags} keywords={article.keywords} />
      </div>
      {/* <ProductsSlider
        title="Related"
        subtitle="Products"
        data={article.related_products}
        className="mb-8"
      /> */}
    </React.Fragment>
  );
};

export default BlogDetailsPage;
