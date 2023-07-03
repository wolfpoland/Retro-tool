"use client";
import { createReducer } from "@reduxjs/toolkit";
import { ActionPlan } from "../../../../../packages/types/action-plan";
import {
  createActionPlanAction,
  deleteActionPlanAction,
  editActionPlanAction,
  setActionPlansAction,
} from "@/store/actions/action-plan.action";

type ColumnState = {
  actionPlans: Array<ActionPlan>;
};

const initialState: ColumnState = {
  actionPlans: [],
};

export const actionPlanReducer = createReducer(initialState, (builder) => {
  builder.addCase(setActionPlansAction, (state, action) => {
    state.actionPlans = action.payload;
  });

  builder.addCase(createActionPlanAction, (state, action) => {
    state.actionPlans.push(action.payload);
  });

  builder.addCase(editActionPlanAction, (state, action) => {
    const index = state.actionPlans.findIndex(
      (actionPlan) => actionPlan.id === action.payload.id
    );

    state.actionPlans[index] = action.payload;
  });

  builder.addCase(deleteActionPlanAction, (state, action) => {
    state.actionPlans = state.actionPlans.filter(
      (actionPlan) => actionPlan.id !== action.payload
    );
  });
});
