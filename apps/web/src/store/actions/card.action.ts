import { createAction } from "@reduxjs/toolkit";
import { Card } from "../../../../../packages/types/card";

export const createCardAction = createAction<Card>("card/create");
