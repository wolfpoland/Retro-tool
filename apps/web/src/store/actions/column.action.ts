import { createAction } from "@reduxjs/toolkit";
import { Card } from "../../../../../packages/types/card";
import { ColumnMap } from "@/components/column/column-grid";

export const createCardAction = createAction<Card>("column/createCard");

export const removeCardAction = createAction<Card>("column/removeCard");
export const editCardAction = createAction<Card>("column/editCard");

export const setColumns = createAction<ColumnMap>("column/setColumn");
