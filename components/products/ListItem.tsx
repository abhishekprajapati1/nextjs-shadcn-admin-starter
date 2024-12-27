"use client";
import React from "react";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/store";
import { IRecordMeta } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import { capitalizeFirstLetter } from "@/lib/utils";
import { setData } from "@/store/coupon-manager/form.slice";
import { setItemId } from "@/store/coupon-manager/form.slice";
import { setItemToDelete } from "@/store/coupon-manager/data.slice";
import { z } from "zod";
import { formSchema } from "@/lib/validations/admin/product.validation";
import dayjs from "@/lib/dayjs";

export interface IProduct extends IRecordMeta, z.infer<typeof formSchema> {}

interface ListItemProps {
  data?: IProduct;
}

const ListItem: React.FC<ListItemProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  const handleEditClick = () => {
    dispatch(setItemId(data?.id || ""));
    dispatch(setData({}));
  };
  console.log("see this", data);
  if (!data) {
    return <ListItemSkeleton />;
  }

  return (
    <tr>
      <td className="uppercase">
        <div>{data?.model_name}</div>
      </td>
      <td>
        <div className="justify-center">{data?.model_number}</div>
      </td>
      <td>
        <div className="justify-center">{data?.gender}</div>
      </td>
      <td>
        <div className="justify-center">{data?.stock_quantity}</div>
      </td>
      <td>
        <div className="justify-center">₹{data?.listing_price}</div>
      </td>
      <td>
        <div className="justify-center">₹{data?.price}</div>
      </td>
      <td>
        <div>{dayjs(data?.created_at).format("MMM DD, YYYY")}</div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleEditClick()}
            variant="secondary"
            size="icon"
          >
            <EditIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              dispatch(
                setItemToDelete({
                  id: data?.id || "",
                  label: data.model_name || "",
                }),
              )
            }
            className="bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white ease-linear duration-300"
          >
            <DeleteIcon />
          </Button>
        </div>
      </td>
    </tr>
  );
};

const ListItemSkeleton = () => {
  return (
    <tr>
      <td className="uppercase">
        <div>
          <Skeleton className="w-[150px]" />
        </div>
      </td>
      <td>
        <div className="justify-center">
          <Skeleton className="w-20" />
        </div>
      </td>
      <td>
        <div className="justify-center">
          <Skeleton className="w-12" />
        </div>
      </td>
      <td>
        <div className="justify-center">
          <Skeleton className="w-12" />
        </div>
      </td>
      <td>
        <div className="justify-center">
          <Skeleton className="w-12" />
        </div>
      </td>
      <td>
        <div>
          <Skeleton className="w-[130px]" />
        </div>
      </td>
      <td>
        <div>
          <Skeleton className="w-[130px]" />
        </div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <Skeleton className="size-9" />
          <Skeleton className="size-9 bg-destructive/50" />
        </div>
      </td>
    </tr>
  );
};
export default ListItem;
