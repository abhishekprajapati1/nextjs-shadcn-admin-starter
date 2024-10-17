'use client'
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import PageHeader from "@/components/PageHeader";
import PlusIcon from "@/components/icons/PlusIcon";
import { showModal } from "@/store/lense-feature/form.slice";

const HeaderButton=() => {
  const dispatch = useDispatch();
  return (
    <PageHeader
      title="Lense Features"
      className="flex-shrink-0"
    >
      <Button onClick={() => dispatch(showModal(true))} className="gap-2">
        <PlusIcon />
        Add New
      </Button>
    </PageHeader>
  )
};

export default HeaderButton;
