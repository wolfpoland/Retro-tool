"use client";
import { Workspace } from "../../../../../../packages/types/workspace";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ColumnsActions } from "@/app/workspace/(components)/columns-actions";

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
      return <ColumnsActions workspace={row.original} />;
    },
  },
];
