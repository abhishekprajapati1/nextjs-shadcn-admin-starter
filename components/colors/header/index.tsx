"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import PageHeader from "@/components/PageHeader";
import PlusIcon from "@/components/icons/PlusIcon";
import { showModal } from "@/store/colors/form.slice";
import { useAppSelector } from "@/store";
import { cn } from "@/lib/utils";

const Header = () => {
  const dispatch = useDispatch();
  const total = useAppSelector((store) => store.colorStore.dataStore.total);

  return (
    <PageHeader
      title="Colors"
      tagline={`${total} items`}
      className="flex-shrink-0"
    >
      <div className={cn("flex items-center gap-1")}>
        <Button onClick={() => dispatch(showModal(true))} className="gap-2">
          <PlusIcon />
          Add New
        </Button>
      </div>
    </PageHeader>
  );
};

export default Header;
