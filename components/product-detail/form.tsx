import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Button } from '../ui/button';
import { showEditProductDeatail } from '@/store/product-detail/modal.slice';
import { useAppDispatch } from '@/store';

const Formdata=()=>
{
  const dispatch = useAppDispatch();
    return(
        <>
 <div className="overflow-x-auto ">
  <table className="min-w-full bg-white border border-gray-200 rounded-lg ">
    <thead className="bg-gray-50 ">
      <tr>
       
        <th className="px-4 py-2 text-left text-gray-600 font-extrabold">Model No.</th>
        <th className="px-4 py-2 text-left text-gray-600 font-extrabold">Quantity</th>
        <th className="px-4 py-2 text-left text-gray-600 font-extrabold">Model Name</th>
        <th className="px-4 py-2 text-left text-gray-600 font-extrabold">Price</th>
        <th className="px-4 py-2 text-left text-gray-600 font-extrabold">Shape</th>
        <th className="px-4 py-2 text-left text-gray-600 font-extrabold">F Material</th>
        <th className="px-4 py-2 text-left text-gray-600 font-extrabold">F Width</th>
        <th className="px-4 py-2 text-left text-gray-600 font-extrabold">L Width</th>
        <th className="px-4 py-2 text-left text-gray-600 font-extrabold">L Height</th>
        <th className="px-4 py-2 text-left text-gray-600 font-extrabold">Color</th>
        <th className="px-4 py-2 text-left text-gray-600 font-extrabold">Edit</th>
        <th className="px-4 py-2 text-left text-gray-600 font-extrabold">Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-t border-gray-200">
       
        <td className="px-4 py-2">b2</td>
        <td className="px-4 py-2">2</td>
        <td className="px-4 py-2">sunglass-lens</td>
        <td className="px-4 py-2">$100</td>
        <td className="px-4 py-2">Geometric Eyeglass</td>
        <td className="px-4 py-2">Metal</td>
        <td className="px-4 py-2">143</td>
        <td className="px-4 py-2">58</td>
        <td className="px-4 py-2">38</td>
        <td className="px-4 py-2">Black</td>
        <td className="px-4 py-2">
          <Button className="text-blue-500 hover:text-blue-700 
           "onClick={() => dispatch(showEditProductDeatail(true))}>
          <FaEdit className="w-5 h-5" />
          </Button>
        </td>
        <td className="px-4 py-2">
          <Button className="text-red-500 hover:text-red-700">
          <MdDelete className="w-5 h-5" />
          </Button>
        </td>
      </tr>
     
    </tbody>
  </table>
</div>

        </>
    )
}
export default Formdata