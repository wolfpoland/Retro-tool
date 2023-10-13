import { ActionPlanRaw } from "../../../../../packages/types/action-plan";

export async function editActionPlan(
  actionPlanRaw: ActionPlanRaw
): Promise<Response> {
  const { id, text, percentage, assignee, status } = actionPlanRaw;

  return await fetch(`/api/action-plan/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      text,
      percentage,
      status,
      assignee,
    }),
  });
}
