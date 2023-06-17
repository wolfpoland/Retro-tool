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

export type EditWorkspaceDialogProps = {
  onDialogClose: () => void;
};

export const EditWorkspaceDialog: FC<EditWorkspaceDialogProps> = forwardRef(
  function EditWorkspaceDialog({ onDialogClose }, ref) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const onClick: MouseEventHandler<unknown> = (event) => {
      event.preventDefault();
      setDialogOpen(true);
    };

    const onSubmitWorkingDialog = () => {
      setDialogOpen(false);
    };

    const onOpenChange = (open: boolean) => {
      if (!open) {
        onDialogClose();
      }
    };

    return (
      <Dialog onOpenChange={onOpenChange} open={dialogOpen}>
        <DropdownMenuItem onClick={onClick}>Edit workspace</DropdownMenuItem>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit workspace</DialogTitle>
          </DialogHeader>
          <div className="!mt-12">
            <EditWorkspaceForm onSubmitWorkingDialog={onSubmitWorkingDialog} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);
