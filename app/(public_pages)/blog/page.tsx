import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import HeroSlider from "@/components/blog/PopularPosts";
import ArticleCard from "@/components/blog/ArticleCard";

export default function Page() {
  const filters = [
    "UX Design",
    "Branding",
    "Web Development",
    "Design System",
    "Marketing",
  ];

  return (
    <div className="pb-10 container max-w-full sm:max-w-[70%] mx-auto">
      <HeroSlider />
      <div>
        <div className="py-8">
          <h2 className="text-4xl font-bold">Latest Articles</h2>
        </div>
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </div>
  );
}
