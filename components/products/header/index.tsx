"use client";
import PlusIcon from "@/components/icons/PlusIcon";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store";
import { showModal } from "@/store/products/form.slice";
import HeaderWrapper from "@/components/navigation/admin/HeaderWrapper";

const HeaderButton = () => {
  const dispatch = useAppDispatch();
  return (
    <HeaderWrapper title="Products" tagline="Manage your products">
      <Button onClick={() => dispatch(showModal(true))} className="gap-2">
        <PlusIcon />
        Add New
      </Button>
    </HeaderWrapper>
  );
};

export default HeaderButton;
