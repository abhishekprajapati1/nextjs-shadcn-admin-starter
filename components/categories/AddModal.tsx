"use client";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Modal from "@/components/ui/modal";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { showModal } from "@/store/categories/form.slice";
import CategoriesForm from "./CategoriesForm";


const AddModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((store) => store.categorieStore.formStore.modal);

  return (
    <Modal
      showCloseIcon
      open={modal}
      onOpenChange={(val) => dispatch(showModal(val))}
    >
      <DialogHeader>
        <DialogTitle>Add Categories</DialogTitle>
        <DialogDescription>
          Fill in the details to add a new Categories.
        </DialogDescription>
      </DialogHeader>
      <CategoriesForm />
    </Modal>
  );
};
export default AddModal;
