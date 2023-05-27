import { createReducer } from "@reduxjs/toolkit";
import {
  createCardAction,
  editCardAction,
  removeCardAction,
  setCardsAction,
} from "@/store/actions/card.action";
import { Card } from "../../../../../packages/types/card";

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

  builder.addCase(removeCardAction, (state, action) => {
    const card = action.payload;

    state.cards = state.cards.filter((stateCard) => {
      return stateCard.id !== card.id;
    });

    const column = state.columns[card.columnName];

    state.columns[card.columnName] = column.filter((stateCard) => {
      return stateCard.id !== card.id;
    });
  });

  builder.addCase(editCardAction, (state, action) => {
    const card = action.payload;

    state.cards = state.cards.map((stateCard) => {
      if (stateCard.id === card.id) {
        return card;
      } else {
        return stateCard;
      }
    });

    const column = state.columns[card.columnName];

    state.columns[card.columnName] = column.map((stateCard) => {
      if (stateCard.id === card.id) {
        return card;
      } else {
        return stateCard;
      }
    });
  });
});
