"use client";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Modal from "@/components/ui/modal";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { showModal } from "@/store/coupon-manager/form.slice";
import CouponManagerForm from "./CouponManagerForm";



const AddModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((store) => store.couponManagerStore.formStore.modal);

  return (
    <Modal
      showCloseIcon
      open={modal}
      onOpenChange={(val) => dispatch(showModal(val))}
    >
      <DialogHeader>
        <DialogTitle>Add Coupon-Manager</DialogTitle>
        <DialogDescription>
          Fill in the details to add a new CouponManager.
          
        </DialogDescription>
      </DialogHeader>
      <CouponManagerForm />
    </Modal>
  );
};
export default AddModal;
