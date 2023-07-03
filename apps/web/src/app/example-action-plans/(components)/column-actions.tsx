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
import {
  createWorkspace,
  Workspace,
} from "../../../../../../packages/types/workspace";
import { ClientCalls } from "@/client-calls";
import { store } from "@/store/store";
import {
  optimisticAddWorkspace,
  optimisticEditWorkspace,
  optimisticRemoveWorkspace,
} from "@/store/actions/workspace.action";
import { MoreVertical } from "lucide-react";
import {
  ActionPlan,
  ActionPlanRaw,
  createActionPlan,
} from "../../../../../../packages/types/action-plan";
import { EditActionPlanDialog } from "@/app/example-action-plans/(components)/dialog/edit/edit-dialog";
import {
  createActionPlanAction,
  deleteActionPlanAction,
  editActionPlanAction,
} from "@/store/actions/action-plan.action";
import { deleteActionPlan } from "@/client-calls/action-plan/delete";
import { RemoveActionPlanAlert } from "@/app/example-action-plans/(components)/dialog/remove-action-plan-alert";

export type ColumnsActionsProps = {
  actionPlan: ActionPlan;
};

export const ColumnsActions: FC<ColumnsActionsProps> = ({ actionPlan }) => {
  const [open, setOpen] = useState(false);
  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const onDialogClose = () => {
    setOpen(false);
  };

  const onEdit = (actionPlanRaw: ActionPlanRaw) => {
    ClientCalls.editActionPlan(actionPlanRaw).then(
      async (response: Response) => {
        const rawActionPlan = await response.json();
        const actionPlan = createActionPlan(rawActionPlan as ActionPlanRaw);

        store.dispatch(editActionPlanAction(actionPlan));
      }
    );
    setOpen(false);
  };

  const onDelete = (id: number) => {
    ClientCalls.deleteActionPlan(id).then(() => {
      store.dispatch(deleteActionPlanAction(id));
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
          <EditActionPlanDialog
            actionPlan={actionPlan}
            onDialogClose={onDialogClose}
            onsSubmitEditDialog={onEdit}
          />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <RemoveActionPlanAlert actionPlan={actionPlan} onDelete={onDelete} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
