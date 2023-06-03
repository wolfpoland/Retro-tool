export async function handleAddCards(text: string, columnId: string) {
  await fetch(`/api/add-card`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      columnId,
    }),
  });
}
