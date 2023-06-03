export async function handleAddWorkspace(name: string) {
  await fetch(`/api/add-workspace`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });
}
