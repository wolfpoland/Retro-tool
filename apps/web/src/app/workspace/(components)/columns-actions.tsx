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

export const ColumnsActions: FC = () => {
  const [open, setOpen] = useState(false);
  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const onDialogClose = () => {
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
          <RemoveWorkspaceAlert />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
