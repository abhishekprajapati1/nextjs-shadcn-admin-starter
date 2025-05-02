import { getCategories } from "@/services/category.service";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

const Categories = async () => {
  const categories = await getCategories();

  if (!categories) return <div>No categories found</div>;

  return (
    <div className="flex items-center justify-center py-10 gap-8 container">
      {categories.data?.map((category) => (
        <Link
          href={`/categories/${category.slug}`}
          key={category.id}
          className="flex flex-col justify-normal items-center max-w-[160px] group"
        >
          <Avatar className="size-[120px] rounded-full animate-smooth shadow-md group-hover:shadow-2xl group-hover:scale-75">
            <AvatarImage src={category.image?.url} alt={category.title} />
            <AvatarFallback className="rounded-full bg-white">
              {category.title?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm animate-smooth text-foreground group-hover:text-primary line-clamp-1 font-semibold tracking-wide mt-2 text-center">
            {category.title}
          </p>
        </Link>
      ))}
    </div>
  );
};
export default Categories;
