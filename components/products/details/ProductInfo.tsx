import Image from "next/image";

const ProductInfo = () => {
  return (
    <div className="flex flex-row gap-6">
      <Image
        src="/aviator.jpg"
        width={500}
        height={500}
        alt="glass"
        className="object-contain rounded-lg size-40 shadow-md"
      />
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-lg">Product A</h2>
        <h4 className="text-gray-500 text-sm">Model Number</h4>
      </div>
    </div>
  );
};

export default ProductInfo;
