import { createAction } from "@reduxjs/toolkit";
import { Card } from "../../../../../packages/types/card";
import { ColumnMap } from "@/components/column/column-grid";

export const createCardAction = createAction<Card>("workspace/createCard");

export const removeCardAction = createAction<Card>("workspace/removeCard");
export const editCardAction = createAction<Card>("workspace/editCard");

export const setColumns = createAction<ColumnMap>("workspace/setColumn");
