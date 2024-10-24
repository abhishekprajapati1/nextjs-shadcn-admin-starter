"use client";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Modal from "@/components/ui/modal";
import { useAppDispatch, useAppSelector } from "@/store";
import React from "react";

import { resetStore } from "@/store/categories/form.slice";
import CategoriesForm from "./CategoriesForm";
import { setItemId } from "@/store/categories/form.slice";

const EditModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const item_id = useAppSelector((store) => store.categorieStore.formStore.item_id);

  return (
    <Modal
      open={Boolean(item_id)}
      onOpenChange={(val) => {
        if (!val) {
          dispatch(resetStore());
        }
        dispatch(setItemId(val ? item_id : ""));
      }}
      showCloseIcon
    >
      <DialogHeader>
        <DialogTitle>Update Categorie</DialogTitle>
        <DialogDescription>
          Make changes to Categorie here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <CategoriesForm />
    </Modal>
  );
};
export default EditModal;
