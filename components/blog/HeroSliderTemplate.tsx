import Image from "next/image";
import { IArticle } from "../articles/ListItem";
import Link from "next/link";
import { Button } from "../ui/button";

interface HeroSliderTemplateProps {
  data: IArticle;
}

const HeroSliderTemplate: React.FC<HeroSliderTemplateProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row py-5">
        <h1 className="text-5xl font-semibold text-foreground/80 flex-grow">
          {data.title}
        </h1>
        <div className="w-64 flex-shrink-0">
          <p className="text-sm text-foreground/60 line-clamp-4 min-h-[100px]">
            {data.description}
          </p>

          <Button asChild variant="outline" className="mt-3">
            <Link href={`/blog/${data.slug}`}>Read full blog</Link>
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <Image
          className="rounded-3xl mx-auto"
          src={data.thumbnail?.url || ""}
          width={1200}
          height={500}
          alt="Picture of the author"
        />
      </div>
    </div>
  );
};

export default HeroSliderTemplate;
