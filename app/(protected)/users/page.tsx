"use client";
import React from "react";
import PageHeader from "@/components/PageHeader";
import useFetch from "@/lib/hooks/useFetch";
import ENDPOINTS from "@/lib/endpoints";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { IOwner } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import Action from "./Action";
import BusinessIcon from "@/components/icons/BusinessIcon";
import Filters from "./Filters";
import { useAppSelector } from "@/store";
import VerifiedIcon from "@/components/icons/VerifiedIcon";

const UsersPage = () => {
  const filter = useAppSelector((store) => store.userStore.filter);

  const { data, isLoading } = useFetch<IOwner[]>({
    endpoint: ENDPOINTS.OWNERS.GET_ALL(filter),
  });

  return (
    <div className="flex flex-col h-full overflow-auto">
      <PageHeader title="Owners" className="flex-shrink-0">
        {data?.length || 0} Accounts
      </PageHeader>
      <div className="p-4 lg:p-10 w-full flex-grow overflow-auto flex flex-col gap-6">
        <Filters />
        {isLoading && (
          <div className="h-full grid place-content-center">
            <SpinnerIcon />
          </div>
        )}
        {!isLoading &&
          Array.isArray(data) &&
          data.length > 0 &&
          data.map((user) => {
            return (
              <Card key={user.id}>
                <CardContent className="flex mt-6">
                  <div className="flex w-full justify-between">
                    <div className="flex gap-4">
                      <BusinessIcon className="size-12 text-gray-600" />
                      <div>
                        <h3 className="font-medium text-xl capitalize">
                          {user.company_name}{" "}
                        </h3>
                        <p
                          title={`${
                            Boolean(user.email_verified)
                              ? "Email is verifed."
                              : "Pending email verification."
                          }`}
                          className={`text-sm flex items-center gap-1 text-gray-500`}
                        >
                          {user.email}{" "}
                          <span
                            className={`text-base ${
                              Boolean(user.email_verified)
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          >
                            <VerifiedIcon />
                          </span>
                        </p>
                      </div>
                    </div>
                    <Action
                      verified={Boolean(user.account_verified)}
                      id={user.id}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default UsersPage;
