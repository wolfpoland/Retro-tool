export type UpdateColumCardsPositions = {
  columnId: number;
  cards: Array<{ id: number; newPosition: number }>;
} | null;

export async function updateColumCardsPositions(
  updateColumCardsPositions: UpdateColumCardsPositions
): Promise<Response> {
  return await fetch(`/api/column/update-positions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...updateColumCardsPositions,
    }),
  });
}
