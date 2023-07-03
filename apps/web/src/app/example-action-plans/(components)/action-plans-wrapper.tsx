"use client";
import { ActionPlan } from "../../../../../../packages/types/action-plan";
import { FC } from "react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { ActionPlansTable } from "@/app/example-action-plans/(components)/action-plans-table";

export type ActionPlansTableProps = {
  actionPlans: ActionPlan[];
};

export const ActionPlansTableWrapper: FC<ActionPlansTableProps> = ({
  actionPlans,
}) => {
  return (
    <Provider store={store}>
      <ActionPlansTable actionPlans={actionPlans} />
    </Provider>
  );
};
