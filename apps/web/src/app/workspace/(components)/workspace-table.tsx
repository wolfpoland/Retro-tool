"use client";

import { TableWrapper } from "@/components/table/ui/table-wrapper";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddWorkspaceDialog } from "@/app/workspace/(components)/dialog/add-workspace-dialog";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/app/workspace/(components)/columns";
import { FC, useState } from "react";
import { TableEmptyInfo } from "@/components/table/ui/table-empty-info";
import { useSelector } from "react-redux";
import { workspacesSelector } from "@/store/selectors/workspace.selector";
import { ClientCalls } from "@/client-calls";
import {
  createWorkspace,
  Workspace,
} from "../../../../../../packages/types/workspace";
import { store } from "@/store/store";
import { optimisticAddWorkspace } from "@/store/actions/workspace.action";

export const WorkspaceTable: FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const selectedWorkspaces = useSelector(workspacesSelector);

  const onSubmitAddWorkspace = (name: string) => {
    ClientCalls.addWorkspace(name).then(async (response: Response) => {
      const rawWorkspace = await response.json();
      const workspace = createWorkspace(rawWorkspace as Workspace);

      store.dispatch(optimisticAddWorkspace(workspace));
    });

    setDialogOpen(!dialogOpen);
  };

  const onClick = () => {
    setDialogOpen(true);
  };

  const dialog = (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild onClick={onClick}>
        <Button>Create Workspace</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create workspace</DialogTitle>
          <div className="!mt-12">
            <AddWorkspaceDialog onSubmitWorkingDialog={onSubmitAddWorkspace} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );

  return (
    <TableWrapper
      title="Manage Workspaces"
      description="Create, update and delete workspaces."
      buttons={dialog}>
      {selectedWorkspaces?.length ? (
        <DataTable columns={columns} data={selectedWorkspaces ?? []} />
      ) : (
        <TableEmptyInfo />
      )}
    </TableWrapper>
  );
};
