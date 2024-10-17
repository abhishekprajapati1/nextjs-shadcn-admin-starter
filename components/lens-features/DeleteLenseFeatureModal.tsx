"use client";
import { Button, ProcessIndicator } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Modal from "@/components/ui/modal";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { capitalizeFirstLetter } from "@/lib/utils";
import { setLensFeatureToDelete } from "@/store/lense-feature/data.slice";
import useDeleteLensFeature from "@/lib/mutations/admin/lens-feature/useDeletePowerType";

const DeleteLensFeatureModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mutate: deleteLensFeature, isPending } = useDeleteLensFeature();

  // Accessing delete_modal from store
  const LensFeatureToDelete = useAppSelector(
    (store) => store.lensFeatureStore.dataStore.LensFeatureToDelete,
  );

  return (
    <Modal
      showCloseIcon
      open={Boolean(LensFeatureToDelete)}
      onOpenChange={(val) =>
        dispatch(setLensFeatureToDelete(val ? LensFeatureToDelete : null))
      }
    >
      <DialogHeader>
        <DialogTitle>Delete Power Type</DialogTitle>
        {/* Changed title to match delete purpose */}
        <DialogDescription>
          Are you sure you want to delete &nbsp;
          <strong className="text-primary">
            {capitalizeFirstLetter(LensFeatureToDelete?.label)}
          </strong>
          ? This action cannot be undone.
        </DialogDescription>
        {/* Updated description to reflect delete action */}
      </DialogHeader>
      <DialogFooter>
        <Button variant="destructive" onClick={() => deleteLensFeature()}>
          <ProcessIndicator isProcessing={isPending} btnText="Confirm Delete" />
        </Button>
        <Button onClick={() => dispatch(setLensFeatureToDelete(null))}>
          Cancel
        </Button>
      </DialogFooter>
    </Modal>
  );
};

export default DeleteLensFeatureModal;
