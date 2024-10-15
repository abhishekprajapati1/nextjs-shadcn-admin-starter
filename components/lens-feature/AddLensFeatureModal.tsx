"use client";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Modal from "@/components/ui/modal";
import { showAddModal } from "@/store/lense-feature/modal.slice";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";

const AddLensFeatureModal: React.FC = () =>
   {
  const dispatch = useAppDispatch();
  const add_modal = useAppSelector((store) => store.lenseFeatureStore.modalStore.add_modal);

  return (
    <Modal
      open={add_modal} onOpenChange={(val) => dispatch(showAddModal(val))} // Toggle modal visibility
    >
      <DialogHeader>
        <DialogTitle>Add Lens Feature</DialogTitle>
        <DialogDescription>
          Fill in the details to add a new lens feature.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          {/* Add your input fields here for adding lens details */}
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => dispatch(showAddModal(false))}>
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={() => {
            // Logic for adding the lens feature
            console.log("Feature added");
            dispatch(showAddModal(false)); // Close modal after adding
          }}
        >
          Add Lens
        </Button>
      </DialogFooter>
    </Modal>
  );
};

export default AddLensFeatureModal;
