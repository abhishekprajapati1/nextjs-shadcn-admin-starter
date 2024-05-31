import React from 'react'
import { Dialog, DialogContent } from './ui/dialog';
import { cn } from '@/lib/utils';
import { IWrapper } from '@/lib/types';

interface ModalProps extends IWrapper {
    open: boolean;
    closeHandler: () => void;
    className?: string;
    backdrop?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, open, closeHandler, className = "", backdrop = true }) => {
    return (
        <Dialog open={open} onOpenChange={() => closeHandler()}>
            <DialogContent className={cn("", className)}>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Modal