"use client";
import {
  ActionPlan,
  ActionPlanRaw,
  createActionPlan,
} from "../../../../../../../packages/types/action-plan";
import { ClientCalls } from "@/client-calls";
import { TableWrapper } from "@/components/table/ui/table-wrapper";
import { AddActionPlanDialog } from "@/app/main/example-action-plans/(components)/dialog/add/add-dialog";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/app/main/example-action-plans/(components)/columns";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { actionPlanSelector } from "@/store/selectors/action-plan.selector";
import { store } from "@/store/store";
import {
  createActionPlanAction,
  setActionPlansAction,
} from "@/store/actions/action-plan.action";

export type ActionPlansTableProps = {
  actionPlans: ActionPlan[];
};

export const ActionPlansTable: FC<ActionPlansTableProps> = ({
  actionPlans,
}) => {
  const selectedActionPlans = useSelector(actionPlanSelector);

  useEffect(() => {
    store.dispatch(setActionPlansAction(actionPlans));
  }, [actionPlans]);

  const onAddActionPlan = async (actionPlan: ActionPlanRaw) => {
    const actionPlanRaw = await ClientCalls.addActionPlan(actionPlan);

    store.dispatch(createActionPlanAction(createActionPlan(actionPlanRaw)));
  };

  return (
    <TableWrapper
      title="Action Plans"
      description="Menage yours Action Plans"
      buttons={<AddActionPlanDialog onAddActionPlan={onAddActionPlan} />}>
      <DataTable columns={columns} data={selectedActionPlans} />
    </TableWrapper>
  );
};
