"use client";
import ListItem from "./ListItem";
import { Button, ProcessIndicator } from "../ui/button";
import useItems from "@/lib/queries/admin/products/useItems";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";

const List = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useItems();
  const elementRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  });

  if (isLoading) {
    return (
      <table
        className="ak-table"
        style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
      >
        <thead>
          <tr>
            <th>Model Name</th>
            <th className="text-center min-w-[100px]">Gender</th>
            <th className="text-center min-w-[135px]">In Stock</th>
            <th className="text-center min-w-[135px]">Listing Price</th>
            <th className="text-center min-w-[160px]">Selling Price</th>
            <th className="text-center min-w-[160px]">Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array(4)
            .fill("")
            ?.map((d, index) => {
              return <ListItem key={index} />;
            })}
        </tbody>
      </table>
    );
  }

  return (
    <table
      className="ak-table"
      style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
    >
      <thead>
        <tr>
          <th>Model Name</th>
          <th className="text-center min-w-[100px]">Gender</th>
          <th className="text-center min-w-[135px]">In Stock</th>
          <th className="text-center min-w-[135px]">Listing Price</th>
          <th className="text-center min-w-[160px]">Selling Price</th>
          <th className="text-center min-w-[160px]">Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((d) => {
          return <ListItem ref={elementRef} key={d.id} data={d} />;
        })}
      </tbody>
    </table>
  );
};

export default List;
