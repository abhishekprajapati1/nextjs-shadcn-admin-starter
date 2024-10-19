"use client";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Modal from "@/components/ui/modal";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { showModal } from "@/store/lens-features/form.slice";
import LensDetailForm from "./LensDetailForm";
import LensFeatureForm from "../lens-features/LensFeatureForm";

const AddLensDeatailModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(
    (store) => store.lensDetailStore.formStore.modal,
  );

  return (
    <Modal
      showCloseIcon
      open={modal}
      onOpenChange={(val) => dispatch(showModal(val))}
    >
      <DialogHeader>
        <DialogTitle>Add Lens Feature</DialogTitle>
        <DialogDescription>
          Fill in the details to add a new lens feature.
        </DialogDescription>
      </DialogHeader>
      <LensDetailForm /><tbody></tbody>
    </Modal>
  );
};

export default AddLensDeatailModal;