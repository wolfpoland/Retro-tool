import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
const selectWorkspace = (state: RootState) => state.workspaceState.workspace;
export const workspacesSelector = createSelector(
  selectWorkspace,
  (state) => state
);
