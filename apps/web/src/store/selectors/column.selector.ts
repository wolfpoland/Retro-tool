import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
const selectColumns = (state: RootState) => state.columnState.columnMap;

const selectColumnToUpdate = (state: RootState) =>
  state.columnState.columnToUpdate;
const selectPreview = (state: RootState) => {
  return {
    previewCard: state.columnState.previewCard,
    previewColumnId: state.columnState.previewColumnId,
  };
};
export const columnsSelector = createSelector(selectColumns, (state) => state);

export const previewSelector = createSelector(selectPreview, (state) => state);
export const columnToUpdateSelector = createSelector(
  selectColumnToUpdate,
  (state) => state
);
