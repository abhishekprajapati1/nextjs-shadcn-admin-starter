"use client";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { IArticle } from "../articles/ListItem";
import { Button } from "../ui/button";
interface ArticleCardProps {
  data?: IArticle;
}
const ArticleCard: React.FC<ArticleCardProps> = ({ data }) => {
  if (data) {
    return <div>loading...</div>;
  }
  return (
    <Card className="relative animate-smooth group p-4 md:p-8 shadow-none rounded-none border-none hover:bg-primary/5 cursor-pointer">
      <div className="h-1 w-full absolute bg-transparent group-hover:bg-primary/10 top-0 left-0 animate-smooth" />
      <div className="flex flex-col md:flex-row gap-4 md:gap-8f w-full">
        <div className="w-[200px]">
          <Image
            src="/aviator.jpg"
            alt="alt text for smaple post card"
            width={100}
            height={100}
            className="rounded-md w-full h-auto"
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center text-foreground text-xs uppercase font-medium tracking-wider">
            <span>June 12, 2023</span>
            <div className="lowercase flex items-center divide-x divide-foreground/20">
              <span className="px-2">8 min</span>
              <span className="px-2">1.2k views</span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold line-clamp-2 mt-1">
            New Blog Post That You Were Looking For
          </h2>
        </div>
      </div>
      <div className="py-4 sm:py-6">
        <p className="text-foreground/60 text-sm line-clamp-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          consectetur, nisl vel aliquam aliquet, nisl nisl aliquet nisl, vel
          aliquam nisl nisl vel aliquam. Sed consectetur, nisl vel aliquam
          aliquet, nisl nisl aliquet nisl, vel aliquam nisl nisl vel aliquam.
        </p>
      </div>
      <div className="flex justify-end items-center w-full">
        <Button size="sm" variant="outline">
          Read full post
        </Button>
      </div>
    </Card>
  );
};

export default ArticleCard;
