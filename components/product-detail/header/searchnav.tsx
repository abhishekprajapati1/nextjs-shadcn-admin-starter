import { Input } from "@/components/ui/input";


const NavSearch=()=>
{
    return(
        <>
         <div className="container mx-auto px-1 pt-2">
        <div className="flex justify-between items-center">
         
          <h1 className="text-1x2 font-black">All Product Details</h1>
  
        
          <div className=" flex items-center relative">
            
            <Input
              type="text"
              placeholder="Search..."
            />
  
            {/* <span dangerouslySetInnerHTML={{__html:ICONS.serach_icon}} className="w-5 h-5 text-gray-400 bottom-2 right-4 absolute" /> */}
          </div>
        </div>
      </div>
        </>
    )
}

export default NavSearch