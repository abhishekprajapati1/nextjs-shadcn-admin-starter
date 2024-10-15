"use client";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Modal from "@/components/ui/modal";
import { showAddModal } from "@/store/power-types/modal.slice";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const AddPowerTypeModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const add_modal = useAppSelector(
    (store) => store.powerTypeStore.modalStore.add_modal
  );

  return (
    <Modal showCloseIcon
      open={add_modal}
      onOpenChange={(val) => dispatch(showAddModal(val))} // Toggle modal visibility
    >
      <DialogHeader>
        <DialogTitle>Add Lens Feature</DialogTitle>
        <DialogDescription>
          Fill in the details to add a new lens feature.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4 ">
        <div className="flex flex-col  gap-4">
  

          {/* Image Upload */}
          <Input
            type="file"
            id="lensImage"
            name="lensImage"
            accept="image/*"
            className="col-span-3"
            onChange={(e) => {
              console.log("Selected image:");
            }}
          />

          {/* Title */}
          <label htmlFor="lensTitle" className="">
            Title
          </label>
          <Input
            type="text"
            id="lensTitle"
            name="lensTitle"
            placeholder="Enter title"
            className="col-span-3 p-2 border rounded"
            onChange={(e) => {
              console.log("Title:", e.target.value);
            }}
          />

          {/* Description */}
          <label htmlFor="lensDescription">
            Description
          </label>
          <Textarea
            id="lensDescription"
            name="lensDescription"
            placeholder="Enter description"
            className="p-2 border rounded"
            onChange={(e) => {
              console.log("Description:", e.target.value);
            }}
          />
        </div>
      </div>

      <DialogFooter>
        <Button onClick={() => dispatch(showAddModal(false))}>Cancel</Button>
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

export default AddPowerTypeModal;
