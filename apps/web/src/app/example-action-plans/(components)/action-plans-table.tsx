"use client";
import {
  ActionPlan,
  ActionPlanRaw,
} from "../../../../../../packages/types/action-plan";
import { ClientCalls } from "@/client-calls";
import { TableWrapper } from "@/components/table/ui/table-wrapper";
import { AddActionPlanDialog } from "@/app/example-action-plans/(components)/dialog/add-action-plan-dialog";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/app/example-action-plans/(components)/columns";
import { FC } from "react";

export type ActionPlansTableProps = {
  actionPlans: ActionPlan[];
};

export const ActionPlansTable: FC<ActionPlansTableProps> = ({
  actionPlans,
}) => {
  const onAddActionPlan = (actionPlan: ActionPlanRaw) => {
    ClientCalls.addActionPlan(actionPlan).then(async (response: Response) => {
      const rawActionPlan = await response.json();
      console.log(rawActionPlan);
    });
  };

  return (
    <TableWrapper
      title="Action Plans"
      description="Menage yours Action Plans"
      buttons={<AddActionPlanDialog onAddActionPlan={onAddActionPlan} />}>
      <DataTable columns={columns} data={actionPlans} />
    </TableWrapper>
  );
};
