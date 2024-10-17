"use client";
import LenseFeature from "./LenseFeature";
import { Button, ProcessIndicator } from "../ui/button";
import useLensFeature from "@/lib/queries/admin/lens-feature/useLensFeature";

const LenseFeatureList = () => {
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useLensFeature();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        <LenseFeature />
        <LenseFeature />
        <LenseFeature />
        <LenseFeature />
        <LenseFeature />
        <LenseFeature />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {data?.map((d) => {
        return <LenseFeature key={d.id} data={d} />;
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

export default LenseFeatureList;
