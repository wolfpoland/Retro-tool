"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ActionPlan } from "../../../../../../packages/types/action-plan";
import { ColumnsActions } from "@/app/example-action-plans/(components)/column-actions";

export const columns: ColumnDef<ActionPlan>[] = [
  {
    accessorKey: "percentage",
    header: "Percentage",
  },
  {
    accessorKey: "text",
    header: "Text",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <ColumnsActions actionPlan={row.original} />
        </div>
      );
    },
  },
];
