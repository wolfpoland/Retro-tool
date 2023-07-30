import { createAction } from "@reduxjs/toolkit";
import { Card } from "../../../../../packages/types/card";
import { ColumnMap } from "@/components/column/column-grid";

export type ChangeColumnActionType = {
  dropColumnId: number;
  card: Card;
};

export const createCardAction = createAction<Card>("column/createCard");

export const removeCardAction = createAction<Card>("column/removeCard");
export const editCardAction = createAction<Card>("column/editCard");

export const setColumnsAction = createAction<ColumnMap>("column/setColumn");
export const changeColumnAction = createAction<ChangeColumnActionType>(
  "column/changeColumn"
);
