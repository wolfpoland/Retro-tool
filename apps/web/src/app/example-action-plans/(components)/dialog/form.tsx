import { FC } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TextareaShadcn } from "@/components/ui/textarea-shadcn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { actionPlanFormSchema } from "@/app/example-action-plans/(components)/dialog/util";
import { z } from "zod";
import {
  ActionPlan,
  ActionPlanRaw,
} from "../../../../../../../packages/types/action-plan";

export type ActionPlanFormProps = {
  actionPlan: ActionPlan;
  form: UseFormReturn<
    { text: string; assignee: string; percentage: number[] },
    any,
    undefined
  >;
  onSubmitForm(values: ActionPlanRaw): void;
};

export const ActionPlanForm: FC<ActionPlanFormProps> = ({
  form,
  onSubmitForm,
  actionPlan,
}) => {
  function onSubmit(values: z.infer<typeof actionPlanFormSchema>) {
    onSubmitForm({
      ...actionPlan,
      text: values.text,
      assignee: values.assignee,
      percentage: values.percentage[0],
    });
  }

  return (
    <Form {...(form as any)}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <TextareaShadcn {...field} />
              </FormControl>
              <FormDescription>
                This is the written action plan.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assignee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignee</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Who is responsible for this action plan?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="percentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Percentage</FormLabel>
              <FormControl>
                <div className="flex items-center justify-center">
                  <Label className="mr-4 w-5">
                    {form.getValues("percentage")}
                  </Label>
                  <Slider
                    draggable={true}
                    step={1}
                    min={0}
                    max={100}
                    ref={field.ref}
                    defaultValue={field.value}
                    name={field.name}
                    onBlur={field.onBlur}
                    onValueChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Who is responsible for this action plan?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
