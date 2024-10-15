import { IWrapper } from '@/lib/types';
import React from 'react';

const PageWrapper: React.FC<IWrapper> = ({children}) => {
  return (
    <div className="p-4 lg:px-10 w-full overflow-auto">
      {children}
    </div>
  )
}


export default PageWrapper;