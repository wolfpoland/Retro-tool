"use client";
import { FC, FormEventHandler } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ActionPlanRaw } from "../../../../../../../packages/types/action-plan";
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
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export type AddActionPlanFormProps = {
  onSubmitAddingActionPlan: (actionPlan: ActionPlanRaw) => void;
};

const formSchema = z.object({
  text: z.string().min(2).max(255),
  assignee: z.string().min(2).max(15),
  percentage: z.array(z.number().min(0).max(100)),
});

export const AddActionPlanForm: FC<AddActionPlanFormProps> = ({
  onSubmitAddingActionPlan,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      assignee: "",
      percentage: [0],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSubmitAddingActionPlan({
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
