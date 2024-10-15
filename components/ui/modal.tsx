import { Dialog, DialogContent } from "./dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  showCloseIcon?: boolean;
  className?: string;
  fullScreen?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  children,
  showCloseIcon = false,
  fullScreen = false,
  className = "",
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        fullScreen={fullScreen}
        className={className}
        showCloseIcon={showCloseIcon}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;