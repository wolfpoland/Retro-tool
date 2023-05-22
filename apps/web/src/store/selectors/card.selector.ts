import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

const selectCards = (state: RootState) => state.cardState.cards;
const selectColumns = (state: RootState) => state.cardState.columns;

export const cardsSelector = createSelector(selectCards, (state) => state);
export const columnsSelector = createSelector(selectColumns, (state) => state);
