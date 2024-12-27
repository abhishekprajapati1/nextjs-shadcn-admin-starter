"use client";
import PlusIcon from "@/components/icons/PlusIcon";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store";
import { showModal } from "@/store/products/form.slice";

const HeaderButton = () => {
  const dispatch = useAppDispatch();
  return (
    <PageHeader title="Products" className="flex-shrink-0">
      <Button onClick={() => dispatch(showModal(true))} className="gap-2">
        <PlusIcon />
        Add New
      </Button>
    </PageHeader>
  );
};

export default HeaderButton;
