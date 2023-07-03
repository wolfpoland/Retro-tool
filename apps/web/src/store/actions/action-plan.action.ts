import { createAction } from "@reduxjs/toolkit";
import { ActionPlan } from "../../../../../packages/types/action-plan";

export const createActionPlanAction =
  createAction<ActionPlan>("action-plan/create");

export const setActionPlansAction =
  createAction<Array<ActionPlan>>("action-plan/set");

export const editActionPlanAction =
  createAction<ActionPlan>("action-plan/edit");

export const deleteActionPlanAction =
  createAction<number>("action-plan/delete");
