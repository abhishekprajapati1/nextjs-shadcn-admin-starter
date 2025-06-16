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

export default function Page() {
  const filters = [
    "UX Design",
    "Branding",
    "Web Development",
    "Design System",
    "Marketing",
  ];

  return (
    <div className="bg-white pb-10">
      <HeroSlider height={800} />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 p-6">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Filters :</h2>
            <div className="space-y-3">
              {filters.map((filter, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox />
                  <label htmlFor={`filter-${index}`} className="text-sm">
                    {filter}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2 mt-8">Follow us on :</h3>
            <div className="flex gap-3">
              <span>
                <Image
                  src="/instagram.svg"
                  width={20}
                  height={20}
                  alt="instagram"
                />
              </span>
              <span>
                <Image
                  src="/twitter.svg"
                  width={20}
                  height={20}
                  alt="twitter"
                />
              </span>
              <span>
                <Image
                  src="/facebook.svg"
                  width={20}
                  height={20}
                  alt="facebook"
                />
              </span>
            </div>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="w-full md:w-3/4 space-y-6">
          <Card className="p-4 flex items-start gap-4 shadow-none border-none">
            <div className="flex flex-row gap-4 w-full">
              <div className="w-1/5">
                <Image
                  src="/aviator.jpg"
                  alt="alt text for smaple post card"
                  width={100}
                  height={100}
                  className="rounded object-cover"
                />
              </div>
              <div className="w-4/5 space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>New Blog Post That You Were Looking For</span>
                  <span className="pe-50">June 12, 2023</span>
                </div>
                <div>
                  <CardHeader className="p-0">
                    <CardTitle className="text-3xl font-bold">
                      New Blog Post That You Were Looking For
                    </CardTitle>
                  </CardHeader>
                </div>
              </div>
            </div>

            <div>
              <CardContent className="p-0 mt-2">
                <CardDescription className="text-lg text-gray-600">
                  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  non risus. Suspendisse lectus tortor, dignissim sit amet,
                  adipiscing nec, ultricies sed, dolor. Cras elementum ultrices
                  diam. Maecenas ligula massa, varius a, semper congue, euismod
                  in, nullam.
                </CardDescription>
                <div className="flex justify-end">
                  <Button variant="link" className="text-blue-900 p-0 mt-1 ">
                    Read full blog
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
