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
import { Workspace } from "../../../../../../../../packages/types/workspace";

export type RemoveWorkspaceAlertProps = {
  workspace: Workspace;
  onDelete: (workspace: Workspace) => void;
};

export const RemoveWorkspaceAlert = forwardRef(function RemoveWorkspaceAlert(
  { workspace, onDelete }: RemoveWorkspaceAlertProps,
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
    onDelete(workspace);
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
            workspace.
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
