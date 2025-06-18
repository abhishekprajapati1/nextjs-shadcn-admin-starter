export const dynamic = "force-dynamic";
import HeroSlider from "@/components/blog/PopularPosts";
import ArticleCard from "@/components/blog/ArticleCard";
import {
  fetchPopularArticles,
  fetchPublishedArticles,
} from "@/services/article.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Akku Ka Chasma",
  description: `Explore trending eyewear stories, eye care tips, and updates from Akku Ka Chasma. Discover expert articles, guides, and popular posts on eyeglasses, lenses, and more.`,
  keywords: [
    "eyewear blog",
    "eye care tips",
    "akku ka chasma blog",
    "eyeglasses articles",
    "popular eyewear posts",
    "sunglasses blog",
    "contact lens care",
  ],
  openGraph: {
    title: "Blog | Akku Ka Chasma",
    description: `Read our latest blog posts on eyeglasses, sunglasses, contact lenses, and more. Stay informed with popular insights and expert tips from Akku Ka Chasma.`,
    url: "https://akkukachasma.com/blog",
    siteName: "Akku Ka Chasma",
    type: "website",
  },
};

export default async function Page() {
  const popularArticles = await fetchPopularArticles();
  const publishedArticles = await fetchPublishedArticles();
  return (
    <div className="pb-10 container max-w-full sm:max-w-[95%] md:max-w-[90%] lg:max-w-[900px] mx-auto">
      <HeroSlider articles={popularArticles} />
      <div>
        <div className="py-8">
          <h2 className="text-4xl font-bold">Latest Articles</h2>
        </div>
        {publishedArticles?.data?.map((article) => (
          <ArticleCard key={article.id} data={article} />
        ))}
      </div>
    </div>
  );
}
