import DevelopmentWarning from "@/components/DevelopmentWarning";
import { MainHeader } from "@/components/navigation/MainHeader";
import PersistedColorSwitcher from "@/components/products/PersistedColorSwitcher";
import ProductModelNumber from "@/components/products/ProductModelNumber";
import PurchaseFrameOnly from "@/components/products/PurchaseFrameOnly";
import SelectLens from "@/components/products/select-lens";
import { Button } from "@/components/ui/button";
import GalleryCarousel from "@/components/ui/swiper/GalleryCarousel";
import WishlistButton from "@/components/wishlist/WishlistButton";
import { fetchProductDetails } from "@/services/product.service";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import BuyOnWhatsapp from "@/features/products/components/BuyOnWhatsapp";

export interface ProductDetailsParams {
  product_slug: string;
  model_number: string;
}
interface ProductDetailsPageProps {
  params: ProductDetailsParams;
}

const ProductDetailsPage = async ({
  params: { product_slug },
}: ProductDetailsPageProps) => {
  const product = await fetchProductDetails(product_slug);

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
            colors={product.product_colors?.map((pc) => pc.colors)}
            className="mt-4"
          />

          <div className="flex flex-wrap items-center mt-8 gap-2">
            <PurchaseFrameOnly />
            <SelectLens product_colors={product.product_colors} />
            <BuyOnWhatsapp />
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-medium">Technical Details </h3>
            <table className="mt-4">
              <tbody>
                <tr>
                  <td className="w-40 text-gray-600">Model Number</td>
                  <td className="text-gray-900">
                    <ProductModelNumber
                      product_colors={product?.product_colors}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-gray-600">Model Name</td>
                  <td className="text-gray-900">{product?.model_name}</td>
                </tr>
                <tr>
                  <td className="text-gray-600">Color</td>
                  <td className="text-gray-900">
                    {product?.product_colors
                      ?.map((pc) =>
                        pc.colors
                          ?.map((c) => `${c.name}-${c.color}`)
                          .join("-and-"),
                      )
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
