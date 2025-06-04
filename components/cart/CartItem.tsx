"use client";
import React from "react";
import { IFile } from "@/lib/types";
import Image from "next/image";
import { IProduct } from "../products/ListItem";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Cable, PencilRuler } from "lucide-react";
import PrescriptionDetails from "./PrescriptionDetails";
import { z } from "zod";
import { prescriptionSchema } from "@/lib/validations/admin/product.validation";
import { useAppDispatch } from "@/store";
import { setItemToDelete } from "@/store/cart.slice";
import DeleteCartItemModal from "./DeleteCartItemModal";

export interface ICartItem {
  id: string;
  cart_id: string;
  product_color_id: string;
  power_type_id: string;
  lens_feature_id: string;
  lens_detail_id: string;
  frame_only: boolean;
  prescription: z.infer<typeof prescriptionSchema>;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  lens_detail: {
    title: string;
    price: number;
    id: string;
    anti_reflection: boolean;
    blue_light_blocker: boolean;
    hydrophobic: number;
    uv_protection: boolean;
  };
  lens_feature: {
    id: string;
    title: string;
  };
  power_type: {
    id: string;
    title: string;
  };
  product_color: {
    images: Array<IFile>;
    product: IProduct;
  };
}

interface ICartItemProps {
  item?: ICartItem;
}

const CartItem: React.FC<ICartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  if (!item) {
    return (
      <div className="relative border rounded-md">
        <div className="absolute top-2 right-2 flex text-xs tracking-wide">
          <Skeleton className="w-20 bg-destructive/10 h-6" />
        </div>
        <div className="p-2">
          <div className="flex gap-5 py-5">
            <Skeleton className="w-56 h-24" />
            <div className="text-sm tracking-wide space-y-2">
              <div>
                <Skeleton className="w-44 h-3" />
                <p className="text-xs text-gray-500">Hydrophobic Anti-Glore</p>
                <p className="text-[10px] text-gray-400">Sold By Store</p>
              </div>
              <p className="font-semibold">Rs 199</p>
            </div>
          </div>
          <hr />
          <div className="space-y-2">
            <div className="text-sm">
              <div className="flex items-center gap-6 p-2">
                <p>
                  <span className="font-semibold tracking-wide">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      version="1.2"
                      baseProfile="tiny"
                      viewBox="0 0 24 24"
                      className="inline "
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16.972 6.251c-.967-.538-2.185-.188-2.72.777l-3.713 6.682-2.125-2.125c-.781-.781-2.047-.781-2.828 0-.781.781-.781 2.047 0 2.828l4 4c.378.379.888.587 1.414.587l.277-.02c.621-.087 1.166-.46 1.471-1.009l5-9c.537-.966.189-2.183-.776-2.72z"></path>
                    </svg>
                    Size :
                  </span>
                  135 mm
                </p>
                <p className="font-semibold tracking-wide">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    version="1.2"
                    baseProfile="tiny"
                    viewBox="0 0 24 24"
                    className="inline "
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.972 6.251c-.967-.538-2.185-.188-2.72.777l-3.713 6.682-2.125-2.125c-.781-.781-2.047-.781-2.828 0-.781.781-.781 2.047 0 2.828l4 4c.378.379.888.587 1.414.587l.277-.02c.621-.087 1.166-.46 1.471-1.009l5-9c.537-.966.189-2.183-.776-2.72z"></path>
                  </svg>
                  Power Submitter
                </p>
              </div>
            </div>
            <div>
              <div className="overflow-hidden border rounded-md">
                <table className="min-w-full text-left text-xs font-light tracking-wide">
                  <thead className="border-b font-medium">
                    <tr>
                      <th scope="col" className="px-4 py-2">
                        #
                      </th>
                      <th scope="col" className="px-4 py-2">
                        Spherical (SPH)
                      </th>
                      <th scope="col" className="px-4 py-2">
                        Cylindrical (CYL)
                      </th>
                      <th scope="col" className="px-4 py-2">
                        Pupil Distance (PD)
                      </th>
                      <th scope="col" className="px-4 py-2">
                        Add
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="whitespace-nowrap px-4 py-2 font-medium">
                        RIGHT
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">1.75</td>
                      <td className="whitespace-nowrap px-4 py-2">0.00</td>
                      <td className="whitespace-nowrap px-4 py-2">29</td>
                      <td className="whitespace-nowrap px-4 py-2">25</td>
                    </tr>
                    <tr className="border-b">
                      <td className="whitespace-nowrap px-4 py-2 font-medium">
                        LEFT
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">-1.50</td>
                      <td className="whitespace-nowrap px-4 py-2">0.00</td>
                      <td className="whitespace-nowrap px-4 py-2">29.5</td>
                      <td className="whitespace-nowrap px-4 py-2">10.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <DeleteCartItemModal />
      <div className="relative border rounded-md">
        <div className="absolute top-2 right-2 flex text-xs tracking-wide">
          <Button
            type="button"
            variant="ghost"
            onClick={() =>
              dispatch(
                setItemToDelete({
                  id: item.id,
                  label: item.product_color.product.model_name,
                }),
              )
            }
            className="font-medium !bg-transparent text-orange-600 hover:text-indigo-500 h-6 py-0"
          >
            Remove
          </Button>
        </div>
        <div className="p-2">
          <div className="flex gap-5 py-5">
            <Image
              src={item.product_color?.images?.[0]?.url}
              width={500}
              height={350}
              alt="Cart Item image"
              className="w-56 h-24"
            />
            <div className="text-sm tracking-wide space-y-2">
              <div>
                <p>{item.product_color.product.model_name}</p>
                <p className="text-xs text-gray-500 flex gap-1 items-center">
                  <span>
                    {item.lens_detail.hydrophobic
                      ? "Hydrophobic"
                      : "Non-Hydrophobic"}
                  </span>
                  <span>
                    {item.lens_detail.anti_reflection
                      ? "Anti-Reflection"
                      : "Non-Anti-Reflection"}
                  </span>
                  <span>
                    {item.lens_detail.blue_light_blocker
                      ? "Blue Light Blocker"
                      : "Non-Blue Light Blocker"}
                  </span>
                </p>
                <p className="text-[10px] text-gray-400">Sold By Store</p>
              </div>
              <p className="font-semibold">Rs {item.price}</p>
            </div>
          </div>
          <hr />
          <div className="space-y-2">
            <div className="text-sm">
              <div className="flex items-center gap-6 p-2">
                <p className="inline-flex items-center gap-1 tracking-wide">
                  <span className="font-semibold inline-flex items-center gap-1">
                    <PencilRuler className="size-4" /> Size:
                  </span>
                  {item.product_color.product.frame_width || 0} mm
                </p>
                {!item.frame_only && (
                  <p className="inline-flex items-center gap-1 font-semibold tracking-wide">
                    <Cable className="size-4" />
                    Power Submitter
                  </p>
                )}
              </div>
            </div>
            {!item.frame_only && (
              <div className="overflow-hidden border rounded-md">
                <PrescriptionDetails data={item.prescription} />
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default CartItem;
