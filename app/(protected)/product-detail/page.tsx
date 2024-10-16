import ProductAdd from "@/components/product-detail/addproduct"
import Header from "@/components/product-detail/header"
import NavSearch from "@/components/product-detail/header/searchnav"
import Formdata from "@/components/product-detail/form"
import EditPlaceOrderModel from "@/components/placed-order/EditPlaceOrderFeature"

const page=()=>
{
    return(
        <>
    <Header />
    <NavSearch />
    <ProductAdd />
    <Formdata />
    
        </>
    )
}
export default page