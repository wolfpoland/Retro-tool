import { createAction } from "@reduxjs/toolkit";
import { Card } from "../../../../../packages/types/card";

export const createCardAction = createAction<Card>("card/create");

export const removeCardAction = createAction<Card>("card/remove");

export const setCardsAction = createAction<Array<Card>>("card/set");
