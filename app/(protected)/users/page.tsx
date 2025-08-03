"use client";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { UserHeader, UserList } from "@/features/users";

export default function Page() {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <UserHeader />
      <PageWrapper>
        <UserList />
      </PageWrapper>
    </div>
  );
}
