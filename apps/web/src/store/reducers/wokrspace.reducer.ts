"use client";
import { createReducer } from "@reduxjs/toolkit";
import { Workspace } from "../../../../../packages/types/workspace";
import {
  optimisticAddWorkspace,
  optimisticEditWorkspace,
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

  builder.addCase(optimisticAddWorkspace, (state, action) => {
    const workspace = action.payload;

    state.workspace.push(workspace);
  });

  builder.addCase(optimisticEditWorkspace, (state, action) => {
    const workspace: Workspace = action.payload;

    const index = state.workspace.findIndex(
      (_workspace) => _workspace.id === workspace.id
    );

    state.workspace[index] = workspace;
  });
});
