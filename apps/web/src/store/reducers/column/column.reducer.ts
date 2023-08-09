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
import { Card, createCard } from "../../../../../../packages/types/card";
import { ColumnMap } from "@/components/column/column-grid/column-grid";
import { arrayMove } from "@dnd-kit/sortable";
import { ColumnSortService } from "@/store/reducers/column/services/column-sort/column-sort.service";
import { ColumnUtilService } from "@/store/reducers/column/services/util/column-util.service";
import { UpdateColumCardsPositions } from "@/client-calls/column/update-colum-cards-positions";

type ColumnState = {
  columnMap: ColumnMap;
  previewCard: null | Card;
  previewColumnId: null | number;
  columnToUpdate: null | UpdateColumCardsPositions;
};

const initialState: ColumnState = {
  columnMap: {},
  previewCard: null,
  previewColumnId: null,
  columnToUpdate: null,
};

export const columnReducer = createReducer(initialState, (builder) => {
  builder.addCase(createCardAction, (state, action) => {
    const card: Card = action.payload;

    const prevColumns = state.columnMap[card.columnId];

    prevColumns.card.push(card);

    state.columnMap[card.columnId] = prevColumns;
  });

  builder.addCase(setColumnsAction, (state, action) => {
    const columnMap: ColumnMap = action.payload;

    Object.keys(columnMap).forEach((columnId) => {
      const column = columnMap[columnId];
      column.card = ColumnSortService.sort(column.card);
    });

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
    const collisionCard = cards[collisionCardIndex];

    column.card[collisionCardIndex] = createCard({
      ...collisionCard,
      position: card.position + 1,
    });

    column.card[cardIndex] = createCard({
      ...card,
      position: collisionCard.position,
    });

    column.card = ColumnSortService.sort(
      arrayMove(cards, cardIndex, collisionCardIndex)
    );

    state.columnToUpdate = {
      columnId: card.columnId,
      cards: column.card.map((stateCard) => {
        return {
          id: stateCard.id,
          newPosition: stateCard.position,
        };
      }),
    };
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

    overCardColumn.card.push(previewCard);

    overCardColumn.card = arrayMove(
      overCardColumn.card,
      overCardColumn.card.length - 1,
      overCardIndex
    );
  });

  builder.addCase(addingPreviewSuccessAction, (state, action) => {
    if (!state.previewCard || !state.previewColumnId) {
      return;
    }

    const card = state.previewCard;
    const originalColumn = state.columnMap[card.columnId];
    const previewColumn = state.columnMap[state.previewColumnId];

    originalColumn.card = originalColumn.card.filter((stateCard) => {
      return stateCard.id !== card.id;
    });

    previewColumn.card = ColumnUtilService.updateCardsPositionsToMatchIndexes(
      previewColumn.card
    );

    state.columnToUpdate = {
      columnId: state.previewColumnId,
      cards: previewColumn.card.map((stateCard) => {
        return {
          id: stateCard.id,
          newPosition: stateCard.position,
        };
      }),
    };
    state.previewColumnId = null;
    state.previewCard = null;
  });
});
