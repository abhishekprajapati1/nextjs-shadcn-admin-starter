import { checkToken, protect } from '@/lib/server'
import { IWrapper } from '@/lib/types'
import React from 'react'
import ResizableLayout from './ResizableLayout';
import { parse } from '@/lib/utils';

const ProtectedLayout: React.FC<IWrapper> = ({ children }) => {
    // protect();
    let defaultCollapsed = checkToken("react-resizable-panels:collapsed");


    return (
        <ResizableLayout
            defaultCollapsed={defaultCollapsed ? parse(defaultCollapsed) : false}
            sidebarDefaultSize={265}
        >
            {children}
        </ResizableLayout>
    )
}

export default ProtectedLayout