'use client';
import Image from '@/components/ui/Image'
import React from 'react'
import dayjs from '@/lib/dayjs';
import PageHeader from '@/components/PageHeader';
import { Separator } from '@/components/ui/separator';
import useFetch from '@/lib/hooks/useFetch';
import ENDPOINTS from '@/lib/endpoints';
import SpinnerIcon from '@/components/icons/SpinnerIcon';
import { IOwner } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const UsersPage = () => {

    const { data, isLoading } = useFetch<IOwner[]>({ endpoint: ENDPOINTS.OWNERS.GET_ALL });

    if (isLoading) {
        return (
            <div className="h-full grid place-content-center">
                <SpinnerIcon />
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full overflow-auto">
            <PageHeader title='Owners' className="flex-shrink-0">{data?.length || 0} Accounts</PageHeader>
            <Separator />
            <div className='p-4 lg:p-10 w-full flex-grow overflow-auto'>
                <table className='table-auto w-full text-start overflow-auto border-spacing-2'>
                    <tbody>
                        {
                            Array.isArray(data) && data.length > 0 && data.map((user) => {
                                return (
                                    <Card key={user.id}>
                                        <CardHeader>
                                            {user.avatar?.url && (
                                                <Image
                                                    src={user.avatar.url}
                                                    width={100}
                                                    height={100}
                                                    alt="icon image for fst"
                                                    className='size-20'
                                                />
                                            )}
                                        </CardHeader>
                                        <CardContent className='flex'>

                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UsersPage