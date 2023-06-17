import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { forwardRef, MouseEventHandler, useState } from "react";
import { DropdownMenuItem } from "@/components/dropdown-menu";

export const RemoveWorkspaceAlert = forwardRef(function RemoveWorkspaceAlert() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const onClick: MouseEventHandler<unknown> = (event) => {
    event.preventDefault();
    setDialogOpen(true);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
    }
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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});
