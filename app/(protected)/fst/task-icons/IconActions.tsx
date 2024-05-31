'use client';
import DeleteIcon from '@/components/icons/DeleteIcon';
import EditIcon from '@/components/icons/EditIcon';
import SpinnerIcon from '@/components/icons/SpinnerIcon';
import { Button } from '@/components/ui/button';
import useDeleteIcon from '@/lib/mutations/fst/useDeleteIcon';
import React from 'react';

interface IconActionsProps {
    icon_id: string;
}

const IconActions: React.FC<IconActionsProps> = ({ icon_id }) => {

    const { mutate: deleteIcon, isPending: deleting } = useDeleteIcon(icon_id);

    return (
        <React.Fragment>
            <div className={`h-full w-full flex items-center gap-2 ${deleting && "pointer-events-none"}`}>
                <Button variant='secondary' size="icon" className='hover:bg-primary hover:text-primary-foreground'>
                    <EditIcon />
                </Button>
                <Button onClick={() => deleting ? null : deleteIcon()} disabled={deleting} variant='destructive' size="icon" className='bg-destructive/10 text-destructive hover:text-destructive-foreground'>
                    {deleting && <SpinnerIcon />}
                    {!deleting && <DeleteIcon />}
                </Button>
            </div>
        </React.Fragment>
    )
}

export default IconActions