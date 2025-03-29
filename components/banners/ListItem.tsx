"use client";
import React from "react";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/store";
import { IFile, IRecordMeta } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import { setData } from "@/store/banners/form.slice";
import { setItemToDelete } from "@/store/banners/data.slice";
import { Avatar, AvatarImage } from "../ui/avatar";
import { formSchema } from "@/lib/validations/admin/banners.validation";
import { z } from "zod";
import dayjs from "@/lib/dayjs";

export interface IBanner extends IRecordMeta, z.infer<typeof formSchema> {
  image: IFile;
  categories: string[];
  shapes: string[];
}

interface ListItemProps {
  data?: IBanner;
}

const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ data }, ref) => {
    const dispatch = useAppDispatch();

    const handleEditClick = () => {
      dispatch(setData(data ?? null));
    };

    if (!data) {
      return <ListItemSkeleton />;
    }

    return (
      <tr>
        <td>
          <div>
            <Avatar className=" rounded-lg">
              <AvatarImage
                src={data?.image?.url}
                alt={`Banner image ${data?.id}`}
              />
            </Avatar>
          </div>
        </td>
        <td>
          <div className="justify-center">
            {data?.show_on_home ? "Yes" : "No"}
          </div>
        </td>
        <td>
          <div className="justify-center">{data?.is_active ? "on" : "off"}</div>
        </td>
        <td>
          <div className="justify-center">
            {dayjs(data?.created_at).format("MMM DD, YYYY")}
          </div>
        </td>
        <td>
          <div className="justify-center">
            {dayjs(data?.updated_at).format("MMM DD, YYYY")}
          </div>
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
                    label: data.image?.url || "",
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
  },
);

const ListItemSkeleton = () => {
  return (
    <tr>
      <td>
        <div>
          <Skeleton className="w-10 h-10 rounded-lg" />
        </div>
      </td>
      <td>
        <div className="justify-center">
          <Skeleton className="w-6" />
        </div>
      </td>
      <td>
        <div className="justify-center">
          <Skeleton className="w-5" />
        </div>
      </td>
      <td>
        <div className="justify-center">
          <Skeleton className="w-24" />
        </div>
      </td>
      <td>
        <div className="justify-center">
          <Skeleton className="w-24" />
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

ListItem.displayName = "ListItem";

export default ListItem;
