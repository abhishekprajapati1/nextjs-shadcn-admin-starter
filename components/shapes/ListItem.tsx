"use client";
import React from "react";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useAppDispatch } from "@/store";
import { FileType, IRecordMeta } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import { setData, setItemId } from "@/store/shapes/form.slice";
import { setItemToDelete } from "@/store/shapes/data.slice";
import { capitalizeFirstLetter } from "@/lib/utils";
import Avatar from "../ui/avatar";

export interface IShape extends IRecordMeta {
  title: string;
  seo_title: string;
  description: string;
  image: FileType | null;
}

interface ListItemProps {
  data?: IShape;
}

const ListItem: React.FC<ListItemProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  if (!data) {
    return <ListItemSkeleton />;
  }

  return (
    <Card>
      <CardContent className="pt-6 h-full flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Avatar
            size="6xl"
            className="rounded-md"
            src={data?.image?.url}
            alt="Image for power type"
            fallback={data?.title?.charAt(0)?.toUpperCase()}
          />
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 capitalize">
              {data?.title}
            </h3>
            <p className="text-sm text-gray-500">
              {capitalizeFirstLetter(data?.seo_title)}
            </p>
          </div>
        </div>
        <div className="flex items-baseline flex-grow">
          <div className="flex items-end justify-end gap-2 flex-grow h-full">
            <Button
              onClick={() => {
                dispatch(setItemId(data?.id || ""));
                dispatch(
                  setData({
                    title: data?.title,
                    seo_title: data?.seo_title,
                    description: data?.description,
                    image: data?.image,
                  })
                );
              }}
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
                    label: data.title || "",
                  })
                )
              }
              className="bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white ease-linear duration-300"
            >
              <DeleteIcon />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ListItemSkeleton = () => {
  return (
    <Card>
      <CardContent className="pt-6 h-full flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <Skeleton className="size-[100px]" />
          <div className="flex-grow flex flex-col gap-2">
            <Skeleton className="w-2/3" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-2" />
              <Skeleton className="h-2 w-4/5" />
              <Skeleton className="h-2 w-1/3" />
            </div>
          </div>
        </div>
        <div className="flex items-baseline flex-grow">
          <div className="flex items-end justify-end gap-2 flex-grow h-full">
            <Skeleton className="size-[40px] bg-secondary" />
            <Skeleton className="size-[40px] bg-destructive/10" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default ListItem;
