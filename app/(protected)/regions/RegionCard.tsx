"use client";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface RegionCardProps {
  label: string;
  xero_key: string;
  id: string;
  onEdit: () => void;
  totalLinkedRecords?: number;
  useDelete: () => any;
}

const RegionCard: React.FC<RegionCardProps> = ({
  label,
  xero_key,
  id,
  useDelete,
  onEdit,
  totalLinkedRecords,
}) => {
  const { mutate: remove, isPending: isDeleting } = useDelete();

  return (
    <Card>
      <CardContent className="pt-6 h-full flex flex-col h-full">
        <h3 className="text-base capitalize text-gray-600 flex-shrink-0 mb-4">
          <span className="mr-2 text-xs py-1 px-2 rounded-md bg-gray-100 border-gray-400">
            {xero_key}
          </span>
          {label}
        </h3>
        <div className="flex flex-grow items-baseline">
          <span className="text-xs text-gray-400 flex-shrink-0 h-full">
            {totalLinkedRecords} addresses
          </span>
          <div className="flex items-end justify-end gap-2 flex-grow h-full">
            <Button
              disabled={isDeleting}
              onClick={() => (isDeleting ? null : onEdit())}
              variant="secondary"
              size="icon"
            >
              <EditIcon />
            </Button>
            <Button
              disabled={isDeleting}
              variant="ghost"
              size="icon"
              onClick={() => (isDeleting ? null : remove(id))}
              className="bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white ease-linear duration-300"
            >
              {isDeleting && <SpinnerIcon />}
              {!isDeleting && <DeleteIcon />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionCard;
