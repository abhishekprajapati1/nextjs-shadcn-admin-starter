import Image from "next/image";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { showDeleteModal, showEditModal } from "@/store/lense-feature/modal.slice";
import { useAppDispatch } from "@/store";

const LenseFeature = () => {
  const dispatch = useAppDispatch();
  
  return (
    <Card>
      <CardContent className="pt-6 h-full flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Image
            src="/chasma.png"
            alt="Single Vision Lens"
            width={200}
            height={200}
          />
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800">
              Hard Coat Lens
            </h3>
            <p className="text-sm text-gray-500">
              This lens comes with hard-coat technology that gives you
              protection from scratches only.
            </p>
          </div>
        </div>
        <div className="flex items-baseline flex-grow">
          <div className="flex items-end justify-end gap-2 flex-grow h-full">
            <Button
              // disabled={isDeleting}
              onClick={() => dispatch(showEditModal(true))}
              variant="secondary"
              size="icon"
            >
              <EditIcon />
            </Button>
            <Button
              // disabled={isDeleting}
              variant="ghost"
              size="icon"
              onClick={() => dispatch(showDeleteModal(true))}
              className="bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white ease-linear duration-300"
            >
              <DeleteIcon />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LenseFeature;
