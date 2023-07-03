import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
const selectActionPlans = (state: RootState) =>
  state.actionPlanState.actionPlans;
export const actionPlanSelector = createSelector(
  selectActionPlans,
  (state) => state
);
