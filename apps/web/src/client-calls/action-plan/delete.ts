export async function deleteActionPlan(id: number): Promise<Response> {
  return await fetch(`/api/action-plan/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });
}
