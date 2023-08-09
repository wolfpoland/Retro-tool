import { createAction } from "@reduxjs/toolkit";
import { Card } from "../../../../../packages/types/card";
import { ColumnMap } from "@/components/column/column-grid/column-grid";

export type ChangeColumnActionType = {
  dropColumnId: number;
  card: Card;
};

export type ChangeCardOrderActionType = {
  collisionCard: Card;
  card: Card;
};

export type PreviewChangeCardOrderActionType = {
  overCard: Card;
  card: Card;
};

export const createCardAction = createAction<Card>("column/createCard");

export const removeCardAction = createAction<Card>("column/removeCard");
export const editCardAction = createAction<Card>("column/editCard");

export const setColumnsAction = createAction<ColumnMap>("column/setColumn");
export const changeColumnAction = createAction<ChangeColumnActionType>(
  "column/changeColumn"
);
export const changeCardOrderAction = createAction<ChangeCardOrderActionType>(
  "column/changeCardOrder"
);
export const addingPreviewAction =
  createAction<PreviewChangeCardOrderActionType>("column/addingPreviewCard");

export const addingPreviewSuccessAction = createAction<void>(
  "column/addingPreviewSuccess"
);
