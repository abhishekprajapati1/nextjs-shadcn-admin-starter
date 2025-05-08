import DevelopmentWarning from "@/components/DevelopmentWarning";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import { MainHeader } from "@/components/navigation/MainHeader";
import PersistedColorSwitcher from "@/components/products/PersistedColorSwitcher";
import ProceedToPurchase from "@/components/products/proceed-to-purchase";
import { Button } from "@/components/ui/button";
import GalleryCarousel from "@/components/ui/swiper/GalleryCarousel";
import WishlistButton from "@/components/wishlist/WishlistButton";
import { fetchProductDetails } from "@/services/product.service";
import { Heart } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsCart4 } from "react-icons/bs";

interface ProductDetailsPageProps {
  params: { product_slug: string };
}

const ProductDetailsPage = async ({
  params: { product_slug },
}: ProductDetailsPageProps) => {
  const product = await fetchProductDetails(product_slug);

  const message = encodeURIComponent(`
    Hi, I am interested in one of your product. Please contact me.
    The link to the product is https://akkukachasma.com/${product_slug}/
    `);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <MainHeader />
      <DevelopmentWarning />
      <div className="container grid grid-cols-12 gap-4 md:gap-6 lg:gap-12 xl:gap-20 mt-4">
        <div className="col-span-12 md:col-span-8">
          <GalleryCarousel product_colors={product?.product_colors} />
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="flex gap-2">
            <div className="flex-grow">
              <small className="text-gray-600">
                {product?.category?.title}
              </small>
              <h1 className="text-2xl font-medium">
                {product?.shape?.title} shaped {product?.model_name}
              </h1>
            </div>
            <WishlistButton />
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="text-success text-2xl">₹{product?.price}</span>
            <span className="line-through text-destructive">
              ₹{product?.listing_price}
            </span>
            <span className="text-gray-400 text-xs">
              {product?.discount_percent?.toFixed(2)}% off
            </span>
          </div>

          <PersistedColorSwitcher
            colors={product?.product_colors?.map((pc) => pc.color)}
            className="mt-4"
          />

          <div className="flex flex-wrap items-center mt-8 gap-2">
            <ProceedToPurchase product_colors={product?.product_colors} />
            <Button
              variant="ghost"
              className="inline-flex items-center gap-2 !text-success hover:bg-success/10"
              asChild
            >
              <Link
                href={`https://api.whatsapp.com/send/?phone=918188881661&text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappIcon className="w-5 h-5" />
                <span className="font-medium">Buy on WhatsApp</span>
              </Link>
            </Button>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-medium">Technical Details </h3>
            <table className="mt-4">
              <tbody>
                <tr>
                  <td className="w-40 text-gray-600">Model Number</td>
                  <td className="text-gray-900">{product?.model_number}</td>
                </tr>
                <tr>
                  <td className="text-gray-600">Model Name</td>
                  <td className="text-gray-900">{product?.model_name}</td>
                </tr>
                <tr>
                  <td className="text-gray-600">Color</td>
                  <td className="text-gray-900">
                    {product?.product_colors
                      ?.map((pc) => pc.color.name)
                      ?.join(", ")}
                  </td>
                </tr>
                <tr>
                  <td className="text-gray-600">Shape</td>
                  <td className="text-gray-900">{product?.shape?.title}</td>
                </tr>
                <tr>
                  <td className="text-gray-600">Category</td>
                  <td className="text-gray-900">{product?.category?.title}</td>
                </tr>
                <tr>
                  <td className="text-gray-600">Frame Size</td>
                  <td className="text-gray-900">{product?.frame_size}</td>
                </tr>
                <tr>
                  <td className="text-gray-600">Frame Width</td>
                  <td className="text-gray-900">{product?.frame_width} mm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailsPage;
