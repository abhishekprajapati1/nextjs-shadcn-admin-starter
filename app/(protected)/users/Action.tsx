import ActionIcon from "@/components/icons/ActionIcon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useVerifyAccount from "@/lib/mutations/users/useVerifyAccount";
import React from "react";

interface ActionProps {
  id: string;
  verified: boolean;
}

const Action: React.FC<ActionProps> = ({ id, verified }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { mutate: verifyAccount, isPending: verifying } = useVerifyAccount({
    owner_id: id,
  });

  const isRequesting = verifying;

  const handleAction = (action: "approve" | "reject" | "remove") => {
    if (action === "approve") verifyAccount();
    if (!isRequesting) setIsOpen(false);
  };

  return (
    <Button
      type="button"
      variant="outline"
      disabled={verified}
      className={
        verified
          ? "bg-green-600/10 hover:bg-green-600/10 border-green-600 text-green-600 hover:text-green-600"
          : ""
      }
      onClick={() => (verified ? null : handleAction("approve"))}
    >
      {verifying ? (
        "Verifying..."
      ) : (
        <React.Fragment>{verified ? "Verified" : "Verify"}</React.Fragment>
      )}
    </Button>
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button onClick={() => setIsOpen(!isOpen)} variant="ghost" size="icon">
          <ActionIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" asChild>
        <ul className={isRequesting ? "pointer-events-none" : ""}>
          <li>
            <Button
              onClick={() => handleAction("approve")}
              variant="ghost"
              className="w-full flex justify-start"
              disabled={isRequesting}
            >
              Approve
            </Button>
          </li>
          <li>
            <Button
              onClick={() => handleAction("reject")}
              variant="ghost"
              className="w-full flex justify-start"
              disabled={isRequesting}
            >
              Reject
            </Button>
          </li>
          <li>
            <Button
              onClick={() => handleAction("remove")}
              variant="ghost"
              className="w-full flex justify-start"
              disabled={isRequesting}
            >
              Remove
            </Button>
          </li>
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Action;
