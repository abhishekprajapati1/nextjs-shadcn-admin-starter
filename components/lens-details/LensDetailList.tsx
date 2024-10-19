"use client";
import LensDetail from "./LensDetail";
import { Button, ProcessIndicator } from "../ui/button";
import useLensDetails from "@/lib/queries/admin/lens-details/useLensDetails";

const LensDetailList = () => {
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useLensDetails();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <LensDetail />
        <LensDetail />
        <LensDetail />
        <LensDetail />
        <LensDetail />
        <LensDetail />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {data?.map((d) => {
        return <LensDetail key={d.id} data={d} />;
      })}

      {hasNextPage && (
        <div className="min-h-24 grid place-content-center">
          <Button
            type="button"
            disabled={isFetching}
            variant="ghost"
            onClick={() => (isFetching ? null : fetchNextPage())}
          >
            <ProcessIndicator isProcessing={isFetching} btnText="Load more" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default LensDetailList;
