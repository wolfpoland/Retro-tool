import { createAction } from "@reduxjs/toolkit";
import { Workspace } from "../../../../../packages/types/workspace";

export const setWorkspaces = createAction<Array<Workspace>>(
  "workspace/setWorkspaces"
);

export const optimisticRemoveWorkspace = createAction<number>(
  "workspace/optimisticRemoveWorkspace"
);

export const optimisticAddWorkspace = createAction<Workspace>(
  "workspace/optimisticAddWorkspace"
);

export const optimisticEditWorkspace = createAction<Workspace>(
  "workspace/optimisticEditWorkspace"
);
