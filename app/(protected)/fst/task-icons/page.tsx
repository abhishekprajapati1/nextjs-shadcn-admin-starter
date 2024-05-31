'use client'
import React from 'react';
import ENDPOINTS from '@/lib/endpoints';
import AddNewIcon from './AddNewIcon';
import dayjs from '@/lib/dayjs';
import IconActions from './IconActions';
import SpinnerIcon from '@/components/icons/SpinnerIcon';
import Image from '@/components/ui/Image';
import PageHeader from '@/components/PageHeader';
import useFetch from '@/lib/hooks/useFetch';
import { bytesToMB } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const TaskIconsPage = () => {
    const { data, isLoading } = useFetch<any>({ endpoint: ENDPOINTS.FST.TASK_ICONS.GET_ALL });

    if (isLoading) {
        return (
            <div className="h-full grid place-content-center">
                <SpinnerIcon />
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full overflow-auto">
            <PageHeader title='FST Task Icons' className="flex-shrink-0">
                <AddNewIcon />
            </PageHeader>
            <Separator />
            <div className='p-4 lg:p-10 w-full flex-grow overflow-auto'>
                <table className='table-auto w-full text-start overflow-auto border-spacing-2'>
                    <thead className='w-full h-10'>
                        <tr className='w-full'>
                            <th className='text-start px-4'>#</th>
                            <th className='text-start px-4'>Icon</th>
                            <th className='text-start px-4'>Used in</th>
                            <th className='text-start px-4'>Size</th>
                            <th className='text-start px-4'>Date uploaded</th>
                            <th className='text-start px-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(data) && data.length > 0 && data.map((icon, index) => {
                                return (
                                    <React.Fragment key={icon.id}>
                                        <tr className='h-30'>
                                            <td className='bg-white rounded-tl-xl rounded-bl-xl text-start px-4'>#{icon.id?.slice(20)}</td>
                                            <td className='bg-white text-start px-4'>
                                                <Image
                                                    src={icon.url}
                                                    width={100}
                                                    height={100}
                                                    alt="icon image for fst"
                                                />
                                            </td>
                                            <td className='bg-white text-start px-4'>{icon._count.tasks} Tasks</td>
                                            <td className='bg-white text-start px-4'>{bytesToMB(icon.size)} MB</td>
                                            <td className='bg-white text-start px-4'>{dayjs(icon.upload_date).format("MMM DD, YYYY")}</td>
                                            <td className='bg-white rounded-tr-xl rounded-br-xl text-start align-middle px-4'>
                                                <IconActions icon_id={icon.id} />
                                            </td>
                                        </tr>
                                        <tr className='h-4'></tr>
                                    </React.Fragment>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TaskIconsPage