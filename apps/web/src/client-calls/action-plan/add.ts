import { ActionPlanRaw } from "../../../../../packages/types/action-plan";

export async function addActionPlan(
  actionPlanRaw: ActionPlanRaw
): Promise<Response> {
  const { text, percentage, assignee } = actionPlanRaw;

  return await fetch(`/api/action-plan/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      percentage,
      assignee,
    }),
  });
}
