import { Button } from "@/components/ui/button";
import { MdAddShoppingCart } from "react-icons/md";
const ProductAdd=()=>
{
    return(
        <>
       
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-2xl flex items-center space-x-2 shadow-lg">
        <MdAddShoppingCart  className="w-5 h-5 " />
    <span>Add Product</span>
</Button>


        </>
    )
}
export default ProductAdd