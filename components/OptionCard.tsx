"use client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";
import SpinnerIcon from "./icons/SpinnerIcon";

interface OptionCardProps {
  label: string;
  id: string;
  onEdit: () => void;
  totalLinkedRecords?: number;
  useDelete: () => any;
}

const OptionCard: React.FC<OptionCardProps> = ({
  label,
  id,
  useDelete,
  onEdit,
  totalLinkedRecords,
}) => {

  const {mutate: remove, isPending: isDeleting} = useDelete();


  return (
    <Card>
      <CardContent className="pt-6 h-full flex flex-col">
        <h3 className="text-base capitalize text-gray-600 flex-shrink-0 mb-4">
          {label}
        </h3>
        <div className="flex items-baseline">
          <span className="text-xs text-gray-400 flex-shrink-0">
            {totalLinkedRecords} injured
          </span>
          <div className="flex items-end justify-end gap-2 flex-grow">
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

export default OptionCard;
