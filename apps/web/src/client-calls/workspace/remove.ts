export async function deleteWorkspace(id: number) {
  await fetch(`/api/workspace/delete-workspace`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });
}
