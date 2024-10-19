// <<<<<<< HEAD
import DeletePlaceOrderFeature from "@/components/placed-order/deletePlaceOrderFeature";
import EditPlaceOrderModel from "@/components/placed-order/EditPlaceOrderFeature";
import Header from "@/components/placed-order/header";
import HeaderNav from "@/components/placed-order/header-nav";
import TableData from "@/components/placed-order/table_data";

const page=()=>
    {
return(
    <>
   <Header />
   <HeaderNav />
   <TableData />
        <EditPlaceOrderModel/>
        <DeletePlaceOrderFeature />
    </>
)
}
export default page;
// const Page = () => {
//   return <div></div>;
// };
// export default Page;
// >>>>>>> ba83f601a81a3d09f3990d5ad02edfeaa50fed5a
