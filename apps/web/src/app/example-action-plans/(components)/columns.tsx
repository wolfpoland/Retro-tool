"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ActionPlan } from "../../../../../../packages/types/action-plan";
import { Edit, Edit2 } from "lucide-react";

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
      return <Edit />;
    },
  },
];
