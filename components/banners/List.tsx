"use client";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import ListItem from "./ListItem";
import useItems from "@/lib/queries/admin/banners/useItems";

const List = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useItems();

  const elementRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  });

  if (isLoading) {
    return (
      <table
        className="ak-table"
        style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
      >
        <thead>
          <tr>
            <th>Image</th>
            <th className="!text-center min-w-[135px]">Visible on home page</th>
            <th className="!text-center min-w-[100px]">Visibility</th>
            <th className="!text-center min-w-[135px]">Uploaded at</th>
            <th className="!text-center min-w-[135px]">Updated at</th>
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

  if (!Array.isArray(data) || !data.length) return <div>Nothing here</div>;

  return (
    <table
      className="ak-table"
      style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
    >
      <thead>
        <tr>
          <th>Image</th>
          <th className="!text-center min-w-[135px]">Visible on home page</th>
          <th className="!text-center min-w-[100px]">Visibility</th>
          <th className="!text-center min-w-[135px]">Uploaded at</th>
          <th className="!text-center min-w-[135px]">Updated at</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, index) => {
          return <ListItem ref={elementRef} key={index} data={d} />;
        })}
      </tbody>
    </table>
  );
};

export default List;
