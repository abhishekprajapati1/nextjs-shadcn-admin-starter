"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import PlusIcon from "@/components/icons/PlusIcon";
import { showModal } from "@/store/shapes/form.slice";
import { useAppSelector } from "@/store";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Header = () => {
  const total = useAppSelector((store) => store.articleStore.dataStore.total);

  return (
    <PageHeader
      title="Articles"
      tagline={`${total} items`}
      className="flex-shrink-0"
    >
      <div className={cn("flex items-center gap-1")}>
        <Button className="gap-2" asChild>
          <Link href="/articles/new">
            <PlusIcon />
            Add New
          </Link>
        </Button>
      </div>
    </PageHeader>
  );
};

export default Header;
