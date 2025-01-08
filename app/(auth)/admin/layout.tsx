import { checkToken } from '@/lib/server';
import { IWrapper } from '@/lib/types';
import { redirect } from 'next/navigation';
import React from 'react';

const AuthLayout: React.FC<IWrapper> = ({ children }) => {
    const isLoggedIn = checkToken();
    if (isLoggedIn) redirect("/");

    return (
        <div className='fixed inset-0 bg-primary text-primary-foreground h-screen'>
            {children}
        </div>
    )
}

export default AuthLayout;