"use client";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Modal from "@/components/ui/modal";
import { useAppDispatch, useAppSelector } from "@/store";
import React from "react";

import LensTypeForm from "./LensTypeForm";
import { setLensFeatureId } from "@/store/lense-feature/form.slice";

const EditLensFeatureModel: React.FC = () => {
  const dispatch = useAppDispatch();
  const LensFeatureId = useAppSelector(
    (store) => store.lensFeatureStore.formStore.lens_feature_id,
  );

  return (
    <Modal
      open={Boolean(LensFeatureId)}
      onOpenChange={(val) => dispatch(setLensFeatureId(val ? LensFeatureId : ""))}
      showCloseIcon
    >
      <DialogHeader>
        <DialogTitle>Update LensFeature</DialogTitle>
        <DialogDescription>
          Make changes to LensFeature here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <LensTypeForm />
    </Modal>
  );
};
export default EditLensFeatureModel;
