import { Card } from "../../../../../../../../packages/types/card";

export function sort(cards: Array<Card>) {
  return cards.sort((a, b) => a.position - b.position);
}

export const ColumnSortService = {
  sort,
};
