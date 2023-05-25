import { createReducer } from "@reduxjs/toolkit";
import { createCardAction, setCardsAction } from "@/store/actions/card.action";
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

  builder.addCase(setCardsAction, (state, action) => {
    state.cards = action.payload;

    state.columns = {};

    state.cards.forEach((card) => {
      const prevColumn = state.columns[card.columnName] || [];

      state.columns[card.columnName] = [...prevColumn, card];
    });
  });
});
