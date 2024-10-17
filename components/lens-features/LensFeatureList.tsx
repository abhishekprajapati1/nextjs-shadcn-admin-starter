"use client";
import LensFeature from "./LensFeature";
import { Button, ProcessIndicator } from "../ui/button";
import useLensFeatures from "@/lib/queries/admin/lens-feature/useLensFeatures";

const LensFeatureList = () => {
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useLensFeatures();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        <LensFeature />
        <LensFeature />
        <LensFeature />
        <LensFeature />
        <LensFeature />
        <LensFeature />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {data?.map((d) => {
        return <LensFeature key={d.id} data={d} />;
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

export default LensFeatureList;
