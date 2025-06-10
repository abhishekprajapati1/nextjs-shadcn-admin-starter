"use client";
import React from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { DialogTitle } from "../ui/dialog";
import OfferList from "../offer-list";

const OfferListModal = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button
        variant="link"
        size="sm"
        className="px-1"
        onClick={() => setOpen(true)}
      >
        See Offers
      </Button>
      <Modal open={open} onOpenChange={setOpen}>
        <DialogTitle>Offers</DialogTitle>
        <OfferList />
      </Modal>
    </React.Fragment>
  );
};

export default OfferListModal;
