"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import PlusIcon from "@/components/icons/PlusIcon";
import { useAppSelector } from "@/store";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Header = () => {
  return (
    <PageHeader title="Create New Article" className="flex-shrink-0">
      <div className={cn("flex items-center gap-1")}>
        <Button className="gap-2" asChild>
          <Link href="/articles/preview">
            <PlusIcon />
            Preview
          </Link>
        </Button>
      </div>
    </PageHeader>
  );
};

export default Header;
