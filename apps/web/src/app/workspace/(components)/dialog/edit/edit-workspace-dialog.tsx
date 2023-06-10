import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC, forwardRef, MouseEventHandler, useState } from "react";
import { EditWorkspaceForm } from "@/app/workspace/(components)/dialog/edit/edit-workspace-form";
import {
  DropdownMenuItem,
  DropdownMenuItemStyles,
} from "@/components/dropdown-menu";

export const EditWorkspaceDialog: FC = forwardRef(
  function EditWorkspaceDialog() {
    const [dialogOpen, setDialogOpen] = useState(false);

    const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
      // event.preventDefault();
      console.log("klik");
      setDialogOpen(true);
    };

    const onSubmitWorkingDialog = () => {
      console.log("onSubmitWorkingDialog");
      setDialogOpen(false);
    };

    return (
      <Dialog open={dialogOpen}>
        <DialogTrigger onClick={onClick}>
          <div className={DropdownMenuItemStyles}>Edit workspace</div>
        </DialogTrigger>
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
