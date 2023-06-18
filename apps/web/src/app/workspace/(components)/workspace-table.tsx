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
import { Workspace } from "../../../../../../packages/types/workspace";
import { TableEmptyInfo } from "@/components/table/ui/table-empty-info";
import { useSelector } from "react-redux";
import { workspacesSelector } from "@/store/selectors/workspace.selector";

export type WorkspaceTableProps = {
  workspaces: Array<Workspace>;
};

export const WorkspaceTable: FC<WorkspaceTableProps> = ({ workspaces }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const selectedWorkspaces = useSelector(workspacesSelector);

  const onSubmitAddWorkspace = (name: string) => {
    setDialogOpen(!dialogOpen);
  };

  const onClick = () => {
    setDialogOpen(true);
  };

  return (
    <TableWrapper
      buttons={
        <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
          <DialogTrigger asChild onClick={onClick}>
            <Button>Create Workspace</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create workspace</DialogTitle>
              <div className="!mt-12">
                <AddWorkspaceDialog
                  onSubmitWorkingDialog={onSubmitAddWorkspace}
                />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      }>
      {selectedWorkspaces?.length ? (
        <DataTable columns={columns} data={selectedWorkspaces ?? []} />
      ) : (
        <TableEmptyInfo />
      )}
    </TableWrapper>
  );
};
