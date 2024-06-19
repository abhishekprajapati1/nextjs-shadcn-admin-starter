"use client";
import OptionCard from "@/components/OptionCard";
import OptionForm from "@/components/OptionForm";
import PageHeader from "@/components/PageHeader";
import PlusIcon from "@/components/icons/PlusIcon";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { Button } from "@/components/ui/button";
import ENDPOINTS from "@/lib/endpoints";
import useFetch from "@/lib/hooks/useFetch";
import useCreateInjuryType from "@/lib/mutations/whs/useCreateInjuryType";
import { IFormOption } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { setDataToEdit, setShowForm } from "@/store/slices/injury-type.slice";
import React from "react";

const InjuryTypesPage = () => {
  const { data, isLoading } = useFetch<IFormOption[]>({
    endpoint: ENDPOINTS.WHS.INJURY_TYPES,
  });
  const dispatch = useAppDispatch();
  const { showForm, dataToEdit } = useAppSelector(
    (store) => store.injuryTypeStore
  );
  const { mutate: createType, isPending: creating } = useCreateInjuryType({
    onSuccess: () => {
      dispatch(setDataToEdit(null));
      dispatch(setShowForm(false));
    },
  });

  return (
    <div className="flex flex-col h-full overflow-auto">
      <PageHeader
        title="Injury Types"
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
        mutationFn={dataToEdit ? () => null : createType}
        onOpenChange={(bool) => {
          dispatch(setDataToEdit(null));
          dispatch(setShowForm(bool));
        }}
        isMutating={dataToEdit ? false : creating}
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
                onDelete={() => null}
                onEdit={() => null}
              />
            );
          })}
      </div>
    </div>
  );
};

export default InjuryTypesPage;
