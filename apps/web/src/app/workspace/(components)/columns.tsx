"use client";
import { Workspace } from "../../../../../../packages/types/workspace";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import Link from "next/link";
import { EditWorkspaceDialog } from "@/app/workspace/(components)/dialog/edit/edit-workspace-dialog";

// const onDropdownMenuClick = (event: React.MouseEvent) => {
//   event.preventDefault();
//   console.log("onOpenMenuClikck", event);
// };

export const columns: ColumnDef<Workspace>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <Link href={`/workspace/${row.original.id}`}>{row.original.name}</Link>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>Open menu</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <EditWorkspaceDialog />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
