import { Card, createCard } from "../../../../../../../../packages/types/card";

export function updateCardsPositionsToMatchIndexes(cards: Array<Card>) {
  return cards.map((card, index) => {
    return createCard({
      ...card,
      position: index,
    });
  });
}

export const ColumnUtilService = {
  updateCardsPositionsToMatchIndexes,
};
