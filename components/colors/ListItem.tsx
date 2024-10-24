"use client";
import React from "react";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useAppDispatch } from "@/store";
import { IRecordMeta } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import { setData } from "@/store/colors/form.slice";
import { setItemId } from "@/store/colors/form.slice";
import { setItemToDelete } from "@/store/colors/data.slice";

export interface IColor extends IRecordMeta {
  color?: string;
}

interface ListItemProps {
  data?: IColor;
}

const ListItem: React.FC<ListItemProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  if (!data) {
    return <ListItemSkeleton />;
  }

  return (
    <Card>
      <CardContent className="pt-6 flex items-center gap-4">
        {data?.color && (
          <div
            className="flex-grow h-9 rounded-md"
            style={{ background: data?.color }}
          />
        )}

        {!data?.color && (
          <div className="flex-grow h-9 rounded-md bg-gray-50 grid place-content-center text-gray-300">
            Invalid color
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              dispatch(setItemId(data?.id || ""));
              dispatch(
                setData({
                  color: data?.color,
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
                  label: data.color || "",
                })
              )
            }
            className="bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white ease-linear duration-300"
          >
            <DeleteIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ListItemSkeleton = () => {
  return (
    <Card>
      <CardContent className="pt-6 flex items-center gap-4">
        <Skeleton className="flex-grow h-9 rounded-md" />
        <div className="flex items-center gap-4">
          <Skeleton className="size-[40px] bg-secondary" />
          <Skeleton className="size-[40px] bg-destructive/10" />
        </div>
      </CardContent>
    </Card>
  );
};
export default ListItem;
