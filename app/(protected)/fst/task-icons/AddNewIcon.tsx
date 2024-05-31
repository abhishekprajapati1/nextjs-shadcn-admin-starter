'use client';
import React from 'react';
import FileInput from '@/components/ui/file-input';
import FilePreview from '@/components/ui/file-input/FilePreview';
import { Button } from '@/components/ui/button';
import PlusIcon from '@/components/icons/PlusIcon';
import UploadIcon from '@/components/icons/UploadIcon';
import SpinnerIcon from '@/components/icons/SpinnerIcon';
import useCreateIcon from '@/lib/mutations/fst/useCreateIcon';
import Modal from '@/components/Modal';

const AddNewIcon = () => {
    const [showUploader, setShowUploader] = React.useState(false);
    const [error, setError] = React.useState("");
    const [file, setFile] = React.useState<File | null>(null);
    const { mutate, isPending: creatingIcon } = useCreateIcon({
        onSuccess: () => {
            setShowUploader(false);
            setFile(null);
        }
    });


    const handleMutation = () => {
        if (!file) {
            setError("Please select a file to upload.");
            return;
        }
        const formdata = new FormData();
        formdata.append("icon_file", file);
        mutate(formdata);
    }

    React.useEffect(() => {
        if (file) setError("");
    }, [file]);

    return (
        <React.Fragment>
            <Button onClick={() => setShowUploader(true)} size='lg' className='flex items-center gap-2'>
                <PlusIcon />
                Add New
            </Button>
            <Modal
                open={showUploader}
                closeHandler={() => {
                    setShowUploader(false);
                    setFile(null);
                }}
                className={`w-80 ${creatingIcon && "pointer-events-none"}`}
            >
                <div className={`flex flex-col gap-4 ${creatingIcon && "pointer-events-none"}`}>
                    <FileInput
                        accept='image'
                        onChange={files => setFile(files[0])}
                        className='h-40'
                        error={error}
                    >
                        <FilePreview
                            file={file}
                            className='flex flex-col gap-4 items-center'
                            error={error}
                        >
                            <UploadIcon />
                            <p className='text-xs text-center'>Click to <strong>Browse</strong>
                                <br />
                                or <br />
                                Drag & Drop
                            </p>
                        </FilePreview>
                    </FileInput>

                    <Button disabled={creatingIcon} onClick={() => creatingIcon ? null : handleMutation()}>
                        {creatingIcon && <><SpinnerIcon /> Uploading...</>}
                        {!creatingIcon && "Upload"}
                    </Button>
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default AddNewIcon