"use client";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Modal from "@/components/ui/modal";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import LensTypeForm from "./LensTypeForm";
import { showModal } from "@/store/lense-feature/form.slice";

const AddLensFeatureModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((store) => store.lensFeatureStore.formStore.modal);

  return (
    <Modal
      showCloseIcon
      open={modal}
      onOpenChange={(val) => dispatch(showModal(val))}
    >
      <DialogHeader>
        <DialogTitle>Add Feature</DialogTitle>
        <DialogDescription>
          Fill in the details to add a new Feature.
        </DialogDescription>
      </DialogHeader>
      <LensTypeForm />
    </Modal>
  );
};

export default AddLensFeatureModal;
