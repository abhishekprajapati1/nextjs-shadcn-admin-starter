"use client";
import OptionForm from "@/components/OptionForm";
import PageHeader from "@/components/PageHeader";
import PlusIcon from "@/components/icons/PlusIcon";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { Button } from "@/components/ui/button";
import ENDPOINTS from "@/lib/endpoints";
import useFetch from "@/lib/hooks/useFetch";
import useCreateRegion from "@/lib/mutations/whs/useCreateRegion";
import useDeleteRegion from "@/lib/mutations/whs/useDeleteRegion";
import useUpdateRegion from "@/lib/mutations/whs/useUpdateRegion";
import { IFormOption } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { setDataToEdit, setShowForm } from "@/store/slices/types.slice";
import React from "react";
import RegionCard from "./RegionCard";
import RegionForm from "./RegionForm";

const RegionsPage = () => {
  const { data, isLoading } = useFetch<IFormOption[]>({
    endpoint: ENDPOINTS.WHS.REGIONS,
  });
  const dispatch = useAppDispatch();
  const { showForm, dataToEdit } = useAppSelector((store) => store.typeStore);
  const { mutate: createType, isPending: creating } = useCreateRegion({
    onSuccess: () => {
      dispatch(setDataToEdit(null));
      dispatch(setShowForm(false));
    },
  });

  const { mutate: updateType, isPending: updating } = useUpdateRegion({
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
        title="Regions"
        tagline={`${data?.length || 0} items`}
        className="flex-shrink-0"
      >
        <Button onClick={() => dispatch(setShowForm(true))} className="gap-2">
          <PlusIcon />
          Add New
        </Button>
      </PageHeader>

      <RegionForm
        open={showForm}
        data={dataToEdit || null}
        mutationFn={dataToEdit ? updateType : createType}
        onOpenChange={(bool) => {
          dispatch(setDataToEdit(null));
          dispatch(setShowForm(bool));
        }}
        isMutating={dataToEdit ? updating : creating}
      />

      <div className="p-4 lg:p-10 w-full overflow-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              <RegionCard
                key={data.id}
                label={data.label}
                xero_key={data.xero_key || ""}
                totalLinkedRecords={data._count.address_regions}
                id={data.id}
                useDelete={useDeleteRegion}
                onEdit={() => handleEdit(data)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default RegionsPage;
