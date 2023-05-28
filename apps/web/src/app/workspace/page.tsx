"use client";
import { TableFooter } from "@/components/table/table";
import { TableWrapper } from "@/components/table/ui/table-wrapper";

import { Workspace } from "../../../../../packages/types/workspace";
import { columns } from "@/app/workspace/columns";
import { DataTable } from "@/components/table/data-table";

const mockData: Array<Workspace> = [
  {
    id: "1",
    name: "test",
    createdAt: "25-10-1994",
    updatedAt: "25-10-1994",
    columns: [],
  },
  {
    id: "12",
    name: "test2",
    createdAt: "25-10-1994",
    updatedAt: "25-10-1994",
    columns: [],
  },
  {
    id: "13",
    name: "test3",
    createdAt: "25-10-1994",
    updatedAt: "25-10-1994",
    columns: [],
  },
];

export default async function Workspace() {
  return (
    <TableWrapper>
      {/*<TableEmptyInfo />*/}
      <DataTable columns={columns} data={mockData} />
      {/*<TableFooter />*/}
    </TableWrapper>
  );
}
