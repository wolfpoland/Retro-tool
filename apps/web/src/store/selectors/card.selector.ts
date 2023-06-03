import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

const selectCards = (state: RootState) => state.workspaceState.cards;
const selectColumns = (state: RootState) => state.workspaceState.columnMap;

export const cardsSelector = createSelector(selectCards, (state) => state);
export const columnsSelector = createSelector(selectColumns, (state) => state);
