"use client";
import OptionCard from "@/components/OptionCard";
import OptionForm from "@/components/OptionForm";
import PageHeader from "@/components/PageHeader";
import PlusIcon from "@/components/icons/PlusIcon";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { Button } from "@/components/ui/button";
import ENDPOINTS from "@/lib/endpoints";
import useFetch from "@/lib/hooks/useFetch";
import useCreateWitnessType from "@/lib/mutations/whs/useCreateWitnessType";
import useDeleteWitnessType from "@/lib/mutations/whs/useDeleteWitnessType";
import useUpdateWitnessType from "@/lib/mutations/whs/useUpdateWitnessType";
import { IFormOption } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { setDataToEdit, setShowForm } from "@/store/slices/types.slice";
import React from "react";

const WitnessTypesPage = () => {
  const { data, isLoading } = useFetch<IFormOption[]>({
    endpoint: ENDPOINTS.WHS.WITNESS_TYPES,
  });
  const dispatch = useAppDispatch();
  const { showForm, dataToEdit } = useAppSelector((store) => store.typeStore);
  const { mutate: createType, isPending: creating } = useCreateWitnessType({
    onSuccess: () => {
      dispatch(setDataToEdit(null));
      dispatch(setShowForm(false));
    },
  });

  const { mutate: updateType, isPending: updating } = useUpdateWitnessType({
    id: dataToEdit?.id || "",
    onSuccess: () => {
      dispatch(setDataToEdit(null));
      dispatch(setShowForm(false));
    },
  });

  const handleEdit = (data: IFormOption) => {
    dispatch(setDataToEdit(data));
    dispatch(setShowForm(true));
  };

  return (
    <div className="flex flex-col h-full overflow-auto">
      <PageHeader
        title="Witness Types"
        tagline={`${data?.length || 0} items`}
        className="flex-shrink-0"
      >
        <Button onClick={() => dispatch(setShowForm(true))} className="gap-2">
          <PlusIcon />
          Add New
        </Button>
      </PageHeader>

      <OptionForm
        open={showForm}
        data={dataToEdit || null}
        mutationFn={dataToEdit ? updateType : createType}
        onOpenChange={(bool) => {
          dispatch(setDataToEdit(null));
          dispatch(setShowForm(bool));
        }}
        isMutating={dataToEdit ? updating : creating}
      />

      <div className="p-4 lg:p-10 w-full overflow-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {isLoading && (
          <div className="h-full grid place-content-center">
            <SpinnerIcon />
          </div>
        )}
        {!isLoading &&
          Array.isArray(data) &&
          data.length > 0 &&
          data.map((data) => {
            return (
              <OptionCard
                key={data.id}
                label={data.label}
                totalLinkedRecords={data._count.witness_types}
                id={data.id}
                useDelete={useDeleteWitnessType}
                onEdit={() => handleEdit(data)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default WitnessTypesPage;
