import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { EditWorkspaceDialog } from "@/app/main/workspace/(components)/dialog/edit/edit-workspace-dialog";
import { RemoveWorkspaceAlert } from "@/app/main/workspace/(components)/dialog/remove-workspace-alert";
import {
  createWorkspace,
  Workspace,
} from "../../../../../../../packages/types/workspace";
import { ClientCalls } from "@/client-calls";
import { store } from "@/store/store";
import {
  optimisticAddWorkspace,
  optimisticEditWorkspace,
  optimisticRemoveWorkspace,
} from "@/store/actions/workspace.action";
import { MoreVertical } from "lucide-react";

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

  const onEdit = (id: number, name: string) => {
    ClientCalls.editWorkspace(id, name).then(async (response: Response) => {
      const rawWorkspace = await response.json();
      const workspace = createWorkspace(rawWorkspace as Workspace);

      store.dispatch(optimisticEditWorkspace(workspace));
    });
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
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <EditWorkspaceDialog
            workspace={workspace}
            onsSubmitEditDialog={onEdit}
            onDialogClose={onDialogClose}
          />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <RemoveWorkspaceAlert workspace={workspace} onDelete={onDelete} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
