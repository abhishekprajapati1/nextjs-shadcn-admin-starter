import { prescriptionSchema } from "@/lib/validations/admin/product.validation";
import { z } from "zod";

interface PrescriptionDetailsProps {
  data: z.infer<typeof prescriptionSchema>;
}
const PrescriptionDetails: React.FC<PrescriptionDetailsProps> = ({ data }) => {
  if (data.type === "photo") {
    return <div className="w-full h-full">image will go here</div>;
  }

  return (
    <table className="w-full text-left text-xs font-light tracking-wide">
      <thead className="border-b font-medium">
        <tr>
          <th scope="col" className="px-4 py-2">
            #
          </th>
          <th scope="col" className="px-4 py-2">
            Spherical (SPH)
          </th>
          <th scope="col" className="px-4 py-2">
            Cylindrical (CYL)
          </th>
          <th scope="col" className="px-4 py-2">
            Pupil Distance (PD)
          </th>
          <th scope="col" className="px-4 py-2">
            Add
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="whitespace-nowrap px-4 py-2 font-medium">RIGHT</td>
          <td className="whitespace-nowrap px-4 py-2">{data.right_sph}</td>
          <td className="whitespace-nowrap px-4 py-2">{data.right_cyl}</td>
          <td className="whitespace-nowrap px-4 py-2">{data.right_axis}</td>
          <td className="whitespace-nowrap px-4 py-2">{data.right_add}</td>
        </tr>
        <tr className="border-b">
          <td className="whitespace-nowrap px-4 py-2 font-medium">LEFT</td>
          <td className="whitespace-nowrap px-4 py-2">{data.left_sph}</td>
          <td className="whitespace-nowrap px-4 py-2">{data.left_cyl}</td>
          <td className="whitespace-nowrap px-4 py-2">{data.left_axis}</td>
          <td className="whitespace-nowrap px-4 py-2">{data.left_add}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default PrescriptionDetails;
