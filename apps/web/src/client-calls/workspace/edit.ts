export async function editWorkspace(
  id: number,
  name: string
): Promise<Response> {
  return await fetch(`/api/workspace/edit-workspace`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
    }),
  });
}
