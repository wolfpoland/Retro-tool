"use client";
import { Workspace } from "../../../../../../packages/types/workspace";
import { FC, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { WorkspaceTable } from "@/app/workspace/(components)/workspace-table";
import { setWorkspaces } from "@/store/actions/workspace.action";

export type WorkspaceTableWrapperProps = {
  workspaces: Workspace[];
};
export const WorkspaceTableWrapper: FC<WorkspaceTableWrapperProps> = ({
  workspaces,
}) => {
  useEffect(() => {
    store.dispatch(setWorkspaces(workspaces));
  }, [workspaces]);

  return (
    <Provider store={store}>
      <WorkspaceTable workspaces={workspaces} />
    </Provider>
  );
};
