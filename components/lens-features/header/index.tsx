'use client'
import { Button } from "@/components/ui/button";
import { showAddModal } from "@/store/lense-feature/modal.slice";
import { useDispatch } from "react-redux";
import PageHeader from "@/components/PageHeader";
import PlusIcon from "@/components/icons/PlusIcon";

const HeaderButton=() => {
  const dispatch = useDispatch();
  return (
    <PageHeader
      title="Lense Features"
      className="flex-shrink-0"
    >
      <Button onClick={() => dispatch(showAddModal(true))} className="gap-2">
        <PlusIcon />
        Add New
      </Button>
    </PageHeader>
  )
};

export default HeaderButton;
