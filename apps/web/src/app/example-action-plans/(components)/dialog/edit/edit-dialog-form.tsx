"use client";
import { FC } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ActionPlan,
  ActionPlanRaw,
} from "../../../../../../../../packages/types/action-plan";
import { ActionPlanForm } from "@/app/example-action-plans/(components)/dialog/form";
import { actionPlanFormSchema } from "@/app/example-action-plans/(components)/dialog/util";

export type EditActionPlanFormProps = {
  actionPlan: ActionPlan;
  onSubmitDialog: (actionPlanRaw: ActionPlanRaw) => void;
};

export const EditActionPlanForm: FC<EditActionPlanFormProps> = ({
  onSubmitDialog,
  actionPlan,
}) => {
  const form = useForm<z.infer<typeof actionPlanFormSchema>>({
    resolver: zodResolver(actionPlanFormSchema),
    defaultValues: {
      text: actionPlan.text,
      assignee: actionPlan.assignee,
      percentage: [actionPlan.percentage],
    },
  });

  function onSubmit(values: ActionPlanRaw) {
    onSubmitDialog(values);
  }

  return (
    <ActionPlanForm
      actionPlan={actionPlan}
      form={form}
      onSubmitForm={onSubmit}
    />
  );
};
