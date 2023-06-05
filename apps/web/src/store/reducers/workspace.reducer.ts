"use client";
import { createReducer, current } from "@reduxjs/toolkit";
import {
  createCardAction,
  editCardAction,
  removeCardAction,
  setColumns,
} from "@/store/actions/workspace.action";
import { Card } from "../../../../../packages/types/card";
import { ColumnMap } from "@/components/column/column-grid";

type CardState = {
  cards: Array<Card>;
  columnMap: ColumnMap;
};

const initialState: CardState = {
  cards: [],
  columnMap: {},
};

export const workspaceReducer = createReducer(initialState, (builder) => {
  builder.addCase(createCardAction, (state, action) => {
    const card: Card = action.payload;
    state.cards.push(action.payload);

    const prevColumns = state.columnMap[card.columnId];

    prevColumns.card.push(card);

    state.columnMap[card.columnId] = prevColumns;
  });

  builder.addCase(setColumns, (state, action) => {
    state.columnMap = action.payload;
  });

  builder.addCase(removeCardAction, (state, action) => {
    const card = action.payload;

    state.cards = state.cards.filter((stateCard) => {
      return stateCard.id !== card.id;
    });

    const column = state.columnMap[card.columnId];

    state.columnMap[card.columnId].card = column.card.filter((stateCard) => {
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

    const column = state.columnMap[card.columnId];

    state.columnMap[card.columnId].card = column.card.map((stateCard) => {
      if (stateCard.id === card.id) {
        return card;
      } else {
        return stateCard;
      }
    });
  });
});
