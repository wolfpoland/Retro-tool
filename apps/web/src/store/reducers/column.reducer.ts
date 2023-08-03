"use client";
import { createReducer, current } from "@reduxjs/toolkit";
import {
  changeCardOrderAction,
  changeColumnAction,
  createCardAction,
  editCardAction,
  removeCardAction,
  setColumnsAction,
} from "@/store/actions/column.action";
import { Card } from "../../../../../packages/types/card";
import { ColumnMap } from "@/components/column/column-grid";
import { arrayMove } from "@dnd-kit/sortable";

type ColumnState = {
  columnMap: ColumnMap;
};

const initialState: ColumnState = {
  columnMap: {},
};

export const columnReducer = createReducer(initialState, (builder) => {
  builder.addCase(createCardAction, (state, action) => {
    const card: Card = action.payload;

    const prevColumns = state.columnMap[card.columnId];

    prevColumns.card.push(card);

    state.columnMap[card.columnId] = prevColumns;
  });

  builder.addCase(setColumnsAction, (state, action) => {
    state.columnMap = action.payload;
  });

  builder.addCase(removeCardAction, (state, action) => {
    const card = action.payload;

    const column = state.columnMap[card.columnId];

    state.columnMap[card.columnId].card = column.card.filter((stateCard) => {
      return stateCard.id !== card.id;
    });
  });

  builder.addCase(editCardAction, (state, action) => {
    const card = action.payload;

    const column = state.columnMap[card.columnId];

    state.columnMap[card.columnId].card = column.card.map((stateCard) => {
      if (stateCard.id === card.id) {
        return card;
      } else {
        return stateCard;
      }
    });
  });

  builder.addCase(changeColumnAction, (state, action) => {
    const card: Card = action.payload.card;
    const column = state.columnMap[card.columnId];

    column.card = column.card.filter((stateCard) => {
      return stateCard.id !== card.id;
    });

    state.columnMap[action.payload.dropColumnId].card.push(card);
  });

  builder.addCase(changeCardOrderAction, (state, action) => {
    const card: Card = action.payload.card;
    const column = state.columnMap[card.columnId];
    const cards = column.card;

    const collisionCardIndex = cards.findIndex((stateCard) => {
      return stateCard.id === action.payload.collisionCard.id;
    });
    const cardIndex = cards.findIndex((stateCard) => {
      return stateCard.id === card.id;
    });

    column.card = arrayMove(cards, cardIndex, collisionCardIndex);
  });
});
