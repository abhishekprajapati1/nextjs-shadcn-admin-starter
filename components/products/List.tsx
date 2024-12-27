"use client";
import ListItem from "./ListItem";
import { Button, ProcessIndicator } from "../ui/button";
import useItems from "@/lib/queries/admin/products/useItems";

const List = () => {
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useItems();
  if (isLoading) {
    return (
      <table style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
        <thead>
          <tr>
            <th>Model Name</th>
            <th className="text-center min-w-[135px]">Model Number</th>
            <th className="text-center min-w-[100px]">Gender</th>
            <th className="text-center min-w-[135px]">In Stock</th>
            <th className="text-center min-w-[135px]">Listing Price</th>
            <th className="min-w-[160px]">Selling Price</th>
            <th className="min-w-[160px]">Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array(4)
            .fill("")
            ?.map((d) => {
              return <ListItem key={d.id} />;
            })}
        </tbody>
      </table>
    );
  }

  return (
    <table style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
      <thead>
        <tr>
          <th>Model Name</th>
          <th className="text-center min-w-[135px]">Model Number</th>
          <th className="text-center min-w-[100px]">Gender</th>
          <th className="text-center min-w-[135px]">In Stock</th>
          <th className="text-center min-w-[135px]">Listing Price</th>
          <th className="min-w-[160px]">Selling Price</th>
          <th className="min-w-[160px]">Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((d) => {
          return <ListItem key={d.id} data={d} />;
        })}
      </tbody>

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
    </table>
  );
};

export default List;
