"use client";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Modal from "@/components/ui/modal";
import { showDeleteModal } from "@/store/lense-feature/modal.slice";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";

const DeleteLensFeatureModal: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Accessing delete_modal from store
  const delete_modal = useAppSelector((store) => store.lenseFeatureStore.modalStore.delete_modal
  );

  return (
    <Modal
      open={delete_modal}
      onOpenChange={(val) => dispatch(showDeleteModal(val))} // Toggle modal visibility
    >
      <DialogHeader>
        <DialogTitle>Delete Feature</DialogTitle> {/* Changed title to match delete purpose */}
        <DialogDescription>
          Are you sure you want to delete this feature? This action cannot be undone.
        </DialogDescription> {/* Updated description to reflect delete action */}
      </DialogHeader>
      <DialogFooter>
        <Button 
          variant="destructive" 
          onClick={() => {
            // Handle the delete action here
            console.log("Feature deleted");
            dispatch(showDeleteModal(false)); // Close modal after deletion
          }}
        >
          Confirm Delete
        </Button>
        <Button onClick={() => dispatch(showDeleteModal(false))}>
          Cancel
        </Button>
      </DialogFooter>
    </Modal>
  );
};

export default DeleteLensFeatureModal;
