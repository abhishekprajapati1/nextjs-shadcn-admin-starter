"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import LocationIcon from "@/components/icons/LocationIcon";
import SelectAddressModal from "./select-address-modal";
import { Address } from "./address-selector";

const SelectAddress = () => {
  const [selectedAddress, setSelectedAddress] = React.useState<Address>();
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-4">
      <SelectAddressModal
        address={selectedAddress}
        setAddress={setSelectedAddress}
        open={open}
        onOpenChange={setOpen}
      />
      <div className="flex items-center justify-between font-bold text-lg">
        <span>Shipping Address</span>
        {selectedAddress && (
          <Button
            onClick={() => setOpen(true)}
            variant="secondary"
            size="xs"
            className="rounded-2xl"
          >
            Change
          </Button>
        )}
      </div>
      {selectedAddress && (
        <div className="flex flex-col text-xs border rounded-xl p-4">
          <div className="flex items-center justify-between font-medium">
            <span>{selectedAddress.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{selectedAddress.street}</span>
            <span>{selectedAddress.city}</span>
            <span>{selectedAddress.zip}</span>
          </div>
        </div>
      )}
      {!selectedAddress && (
        <div className="flex flex-col items-center justify-center text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
          <div className="text-gray-500 mb-2">
            <LocationIcon />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No shipping address selected
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Add a shipping address to continue with your order
          </p>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            size="sm"
            className="rounded-2xl"
          >
            Add Address
          </Button>
        </div>
      )}
    </div>
  );
};
export default SelectAddress;
