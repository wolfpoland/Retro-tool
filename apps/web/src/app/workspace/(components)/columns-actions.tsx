import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { EditWorkspaceDialog } from "@/app/workspace/(components)/dialog/edit/edit-workspace-dialog";
import { RemoveWorkspaceAlert } from "@/app/workspace/(components)/dialog/remove-workspace-alert";
import { Workspace } from "../../../../../../packages/types/workspace";
import {
  useDeleteWorkspaceMutation,
  workspaceApi,
} from "@/store/api/workspace.api";
import { ClientCalls } from "@/client-calls";
import { store } from "@/store/store";
import { optimisticRemoveWorkspace } from "@/store/actions/workspace.action";

export type ColumnsActionsProps = {
  workspace: Workspace;
};

export const ColumnsActions: FC<ColumnsActionsProps> = ({ workspace }) => {
  const [open, setOpen] = useState(false);
  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const onDialogClose = () => {
    setOpen(false);
  };

  const onDelete = (workspace: Workspace) => {
    ClientCalls.deleteWorkspace(workspace.id).then(() => {
      store.dispatch(optimisticRemoveWorkspace(workspace.id));
    });
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <button>Open menu</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <EditWorkspaceDialog onDialogClose={onDialogClose} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <RemoveWorkspaceAlert workspace={workspace} onDelete={onDelete} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
