import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FC,
  forwardRef,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { EditWorkspaceForm } from "@/app/workspace/(components)/dialog/edit/edit-workspace-form";
import { DropdownMenuItem } from "@/components/dropdown-menu";
import { Workspace } from "../../../../../../../../packages/types/workspace";
import {
  ActionPlan,
  ActionPlanRaw,
} from "../../../../../../../../packages/types/action-plan";
import { EditActionPlanForm } from "@/app/example-action-plans/(components)/dialog/edit/edit-dialog-form";

export type EditWorkspaceDialogProps = {
  actionPlan: ActionPlan;
  onsSubmitEditDialog: (actionPlanRaw: ActionPlanRaw) => void;
  onDialogClose: () => void;
};

export const EditActionPlanDialog: FC<EditWorkspaceDialogProps> = forwardRef(
  function EditWorkspaceDialog(
    { onDialogClose, onsSubmitEditDialog, actionPlan },
    ref
  ) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const onClick: MouseEventHandler<unknown> = (event) => {
      event.preventDefault();
      setDialogOpen(true);
    };

    const onSubmitDialog = (actionPlanRaw: ActionPlanRaw) => {
      onsSubmitEditDialog(actionPlanRaw);
      setDialogOpen(false);
    };

    const onOpenChange = (open: boolean) => {
      if (!open) {
        onDialogClose();
      }
    };

    return (
      <Dialog onOpenChange={onOpenChange} open={dialogOpen}>
        <DropdownMenuItem onClick={onClick}>Edit</DropdownMenuItem>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Action Plan</DialogTitle>
          </DialogHeader>
          <div className="!mt-12">
            <EditActionPlanForm
              onSubmitDialog={onSubmitDialog}
              actionPlan={actionPlan}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);
