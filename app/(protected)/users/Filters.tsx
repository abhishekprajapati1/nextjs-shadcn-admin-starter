"use client";
import TemplateRadioGroup, {
  TemplateProps,
} from "@/components/ui/TemplateRadioGroup";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { setFilter } from "@/store/slices/users.slice";
import React from "react";

interface FiltersProps {}

const Filters: React.FC<FiltersProps> = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((store) => store.userStore.filter);

  return (
    <TemplateRadioGroup
      name="owner_filters"
      value={filter}
      onChange={(val) => dispatch(setFilter(val))}
      template={FilterTemplate}
      className="flex items-center gap-2"
      options={[
        { label: "All", value: "all" },
        {
          label: "Verified",
          value: "verified",
        },
        {
          label: "Pending verification",
          value: "pending_account_verification",
        },
        { label: "Pending account setup", value: "pending_account_setup" },
        {
          label: "Pending email verification",
          value: "pending_email_verification",
        },
        {
          label: "Active",
          value: "active",
        },
      ]}
    />
  );
};

export const FilterTemplate: React.FC<TemplateProps> = ({
  data,
  isChecked,
  onClick,
}) => {
  return (
    <Button
      type="button"
      onClick={(e) => onClick(e)}
      variant={isChecked ? "default" : "outline"}
      className="rounded-lg"
    >
      {data.label}
    </Button>
  );
};

export default Filters;
