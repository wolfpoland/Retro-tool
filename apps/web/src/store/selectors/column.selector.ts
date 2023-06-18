import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
const selectColumns = (state: RootState) => state.columnState.columnMap;
export const columnsSelector = createSelector(selectColumns, (state) => state);
