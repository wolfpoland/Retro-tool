export async function addWorkspace(name: string) {
  await fetch(`/api/workspace/add-workspace`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });
}
