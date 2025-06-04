"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLoggedInUser from "@/lib/queries/useLoggedInUser";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logout } from "@/services/auth.service";

const UserDropdown = () => {
  const { data, isLoading } = useLoggedInUser();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="rounded-full w-10 h-10" />
        <Skeleton className="w-10 h-4 ps-0" />
      </div>
    );
  }

  if (!data) {
    return (
      <Link href="/login" className="flex items-center gap-2">
        <div className="rounded-full w-10 h-10 bg-gray-300 grid place-content-center">
          <User className="w-4 h-4" />
        </div>
        <div>Login</div>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full overflow-hidden"
        >
          <Avatar className="rounded-none w-full h-full flex-shrink-0">
            <AvatarImage src={data?.avatar?.url} alt={"Image for power type"} />
            <AvatarFallback>
              {data?.name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">User</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropdown;
