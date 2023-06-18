import { createAction } from "@reduxjs/toolkit";
import { Workspace } from "../../../../../packages/types/workspace";

export const setWorkspaces = createAction<Array<Workspace>>(
  "workspace/setWorkspaces"
);

export const optimisticRemoveWorkspace = createAction<number>(
  "workspace/optimisticRemoveWorkspace"
);
