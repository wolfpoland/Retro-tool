import { createReducer } from "@reduxjs/toolkit";
import { createCardAction } from "@/store/actions/card.action";
import { Card, ColumnName } from "../../../../../packages/types/card";

type CardState = {
  cards: Array<Card>;
  columns: { [columnName: string]: Array<Card> };
};

const initialState: CardState = {
  cards: [],
  columns: {},
};

export const cardReducer = createReducer(initialState, (builder) => {
  builder.addCase(createCardAction, (state, action) => {
    state.cards.push(action.payload);
    const card: Card = action.payload;

    const prevColumns = state.columns[card.columnName] || [];

    prevColumns.push(card);

    state.columns[card.columnName] = prevColumns;
  });
});
