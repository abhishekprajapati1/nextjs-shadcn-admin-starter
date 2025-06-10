"use client";
import React from "react";
import Modal, { ModalProps } from "@/components/ui/modal";
import { DialogTitle } from "@/components/ui/dialog";
import AddressSelector, { Address } from "./address-selector";
interface SelectAddressModalProps extends Omit<ModalProps, "children"> {
  address?: Address;
  setAddress?: (address: Address) => void;
}

const mockAddresses: Address[] = [
  {
    id: "addr-1",
    name: "Home",
    street: "123 MG Road",
    city: "Bangalore",
    zip: "560001",
  },
  {
    id: "addr-2",
    name: "Office",
    street: "456 Brigade Road",
    city: "Bangalore",
    zip: "560002",
  },
];

const SelectAddressModal: React.FC<SelectAddressModalProps> = ({
  open,
  onOpenChange,
  address,
  setAddress,
}) => {
  const [selectedId, setSelectedId] = React.useState<string>("");

  const handleIdChange = (id: string) => {
    setSelectedId(id);
    if (setAddress) {
      const selectedAddress = mockAddresses.find((addr) => addr.id === id);
      if (selectedAddress) {
        setAddress(selectedAddress);
      }
    }
    onOpenChange(false);
  };

  React.useEffect(() => {
    if (address) {
      setSelectedId(address.id);
    }
  }, [address]);

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <DialogTitle>Select Address</DialogTitle>
      <AddressSelector
        addresses={mockAddresses}
        selectedId={selectedId}
        onChange={(id) => handleIdChange(id)}
      />
    </Modal>
  );
};
export default SelectAddressModal;
