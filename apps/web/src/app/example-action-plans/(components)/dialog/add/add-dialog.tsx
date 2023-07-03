"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC, MouseEventHandler, useState } from "react";
import { Button } from "@/components/ui/button";
import { AddActionPlanForm } from "@/app/example-action-plans/(components)/dialog/add/add-form";
import {
  ActionPlan,
  ActionPlanRaw,
} from "../../../../../../../../packages/types/action-plan";

export type AddActionPlanDialogProps = {
  onAddActionPlan: (actionPlan: ActionPlanRaw) => void;
  onDialogClose?: () => void;
};

export const AddActionPlanDialog: FC<AddActionPlanDialogProps> = ({
  onDialogClose,
  onAddActionPlan,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const onClick: MouseEventHandler<unknown> = (event) => {
    event.preventDefault();
    setDialogOpen(true);
  };

  const onSubmitActionPlan = (actionPlan: ActionPlanRaw) => {
    setDialogOpen(false);
    onAddActionPlan(actionPlan);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      onDialogClose && onDialogClose();
    }

    setDialogOpen(open);
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={dialogOpen}>
      <Button onClick={onClick}>Add Action Plan</Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Action plan</DialogTitle>
        </DialogHeader>
        <div className="!mt-12">
          <AddActionPlanForm onSubmitAddingActionPlan={onSubmitActionPlan} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
