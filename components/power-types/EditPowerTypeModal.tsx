"use client";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Modal from "@/components/ui/modal";
import { useAppDispatch, useAppSelector } from "@/store";
import React from "react";
import PowerTypeForm from "./PowerTypeForm";
import { setPowerTypeId } from "@/store/power-types/form.slice";

const EditPowerTypeModel: React.FC = () => {
  const dispatch = useAppDispatch();
  const powerTypeId = useAppSelector(
    (store) => store.powerTypeStore.formStore.power_type_id,
  );

  return (
    <Modal
      open={Boolean(powerTypeId)}
      onOpenChange={(val) => dispatch(setPowerTypeId(val ? powerTypeId : ""))}
      showCloseIcon
    >
      <DialogHeader>
        <DialogTitle>Update Power Type</DialogTitle>
        <DialogDescription>
          Make changes to power type here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <PowerTypeForm />
    </Modal>
  );
};
export default EditPowerTypeModel;
