import { Card } from "../../../../packages/types/card";

export async function addCard(text: string, columnId: string): Promise<number> {
  const response = await fetch(`/api/add-card`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      columnId,
    }),
  });

  const body = await response.json();

  return parseInt(body.id) as number;
}

// TODO: Refactor to DELETE when Next.js fix it
export async function deleteCard(id: number): Promise<void> {
  await fetch(`/api/delete-card`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });
}

export async function updateCard(card: Card): Promise<void> {
  await fetch(`/api/update-card`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });
}
