"use client";
import { createReducer } from "@reduxjs/toolkit";
import {
  addingPreviewAction,
  addingPreviewSuccessAction,
  changeCardOrderAction,
  changeColumnAction,
  createCardAction,
  editCardAction,
  removeCardAction,
  setColumnsAction,
} from "@/store/actions/column.action";
import { Card, createCard } from "../../../../../packages/types/card";
import { ColumnMap } from "@/components/column/column-grid";
import { arrayMove } from "@dnd-kit/sortable";

type ColumnState = {
  columnMap: ColumnMap;
  previewCard: null | Card;
  previewColumnId: null | number;
};

const initialState: ColumnState = {
  columnMap: {},
  previewCard: null,
  previewColumnId: null,
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
    const newCard = createCard({
      ...card,
      columnId: action.payload.dropColumnId,
    });

    column.card = column.card.filter((stateCard) => {
      return stateCard.id !== card.id;
    });

    state.columnMap[action.payload.dropColumnId].card.push(newCard);
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

  builder.addCase(addingPreviewAction, (state, action) => {
    const previewCard: Card = action.payload.card;
    const overCard: Card = action.payload.overCard;
    const overCardColumn = state.columnMap[overCard.columnId];
    const overCardIndex = overCardColumn.card.findIndex((stateCard) => {
      return stateCard.id === overCard.id;
    });

    state.previewCard = previewCard;
    state.previewColumnId = overCard.columnId;

    overCardColumn.card = [
      ...overCardColumn.card.slice(0, overCardIndex),
      previewCard,
      overCard,
      ...overCardColumn.card.slice(overCardIndex + 1),
    ];
  });

  builder.addCase(addingPreviewSuccessAction, (state, action) => {
    if (!state.previewCard || !state.previewColumnId) {
      return;
    }

    const card = state.previewCard;
    const originalColumn = state.columnMap[card.columnId];

    originalColumn.card = originalColumn.card.filter((stateCard) => {
      return stateCard.id !== card.id;
    });

    state.previewColumnId = null;
    state.previewCard = null;
  });
});
