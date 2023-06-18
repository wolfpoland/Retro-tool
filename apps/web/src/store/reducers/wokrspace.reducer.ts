"use client";
import { createReducer, current } from "@reduxjs/toolkit";
import {
  createCardAction,
  editCardAction,
  removeCardAction,
  setColumns,
} from "@/store/actions/column.action";
import { Card } from "../../../../../packages/types/card";
import { ColumnMap } from "@/components/column/column-grid";
import { Workspace } from "../../../../../packages/types/workspace";
import {
  optimisticRemoveWorkspace,
  setWorkspaces,
} from "@/store/actions/workspace.action";

type ColumnState = {
  workspace: Array<Workspace>;
};

const initialState: ColumnState = {
  workspace: [],
};

export const workspaceReducer = createReducer(initialState, (builder) => {
  builder.addCase(setWorkspaces, (state, action) => {
    state.workspace = action.payload;
  });

  builder.addCase(optimisticRemoveWorkspace, (state, action) => {
    const workspaceId = action.payload;

    state.workspace = state.workspace.filter((workspace) => {
      return workspace.id !== workspaceId;
    });
  });
});
