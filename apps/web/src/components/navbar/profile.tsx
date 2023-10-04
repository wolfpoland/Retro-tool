"use client";
import React, { FC } from "react";
import { Session } from "next-auth/src";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { signOut } from "next-auth/react";

type ProfileProps = {
  session: Session;
};

export const ProfileComponent: FC<ProfileProps> = ({
  session,
}): JSX.Element => {
  const onLogoutClick = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className=" mr-3 w-[165px] select-none flex-nowrap overflow-hidden whitespace-nowrap">
          <div className="flex items-center justify-center gap-3">
            {session.user?.image && session.user.name && (
              <Image
                height={25}
                width={25}
                alt={session.user.name}
                src={session.user.image}
                className="rounded-full"
              />
            )}
            {session?.user?.name}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[165px] select-none">
        <DropdownMenuItem onClick={onLogoutClick}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
