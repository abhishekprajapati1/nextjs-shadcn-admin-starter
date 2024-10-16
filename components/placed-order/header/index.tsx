'use client'
import PageHeader from "@/components/PageHeader";
import { useAppDispatch } from "@/store";


const HeaderButton=() => {
  const dispatch = useAppDispatch();
  return (
    <PageHeader
          title="Placed-Order"
          className="flex-shrink-0" children={undefined}    >
      
       
    </PageHeader>
  )
};

export default HeaderButton;
