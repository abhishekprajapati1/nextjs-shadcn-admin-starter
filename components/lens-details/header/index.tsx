"use client";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import PageHeader from "@/components/PageHeader";
import PlusIcon from "@/components/icons/PlusIcon";
import { showModal } from "@/store/lens-details/form.slice";
import { useAppSelector } from "@/store";

const Header = () => {
  const dispatch = useDispatch();
  const total = useAppSelector(
    (store) => store.lensDetailStore.dataStore.total,
  );
  return (
    <PageHeader
      title="Lens Details"
      tagline={`${total} items`}
      className="flex-shrink-0"
    >
      <Button onClick={() => dispatch(showModal(true))} className="gap-2">
        <PlusIcon />
        Add New
      </Button>
    </PageHeader>
  );
};

export default Header;
