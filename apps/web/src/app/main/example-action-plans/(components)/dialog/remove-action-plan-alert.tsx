import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { forwardRef, MouseEventHandler, useState } from "react";
import { DropdownMenuItem } from "@/components/dropdown-menu";
import { ActionPlan } from "../../../../../../../../packages/types/action-plan";

export type RemoveActionPlanAlertProps = {
  actionPlan: ActionPlan;
  onDelete: (id: number) => void;
};

export const RemoveActionPlanAlert = forwardRef(function RemoveWorkspaceAlert(
  { actionPlan, onDelete }: RemoveActionPlanAlertProps,
  ref
) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const onClick: MouseEventHandler<unknown> = (event) => {
    event.preventDefault();
    setDialogOpen(true);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
    }
  };

  const onSubmitWorkingDialog = () => {
    onDelete(actionPlan.id);
    setDialogOpen(false);
  };

  const onCancel = () => {
    setDialogOpen(false);
  };

  return (
    <AlertDialog open={dialogOpen} onOpenChange={onOpenChange}>
      <DropdownMenuItem onClick={onClick}>Remove</DropdownMenuItem>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            action plan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmitWorkingDialog}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});
