import { beforeEach, describe, expect, test } from "vitest";
import { Card, createCard } from "../../../../../../../../packages/types/card";
import { ColumnUtilService } from "./column-util.service";

let mockedCards: Array<Card>;

beforeEach(() => {
  mockedCards = Array(10)
    .fill(0)
    .map((_, index) => {
      return createCard({
        id: index,
        position: index,
        columnId: 1,
        text: "test",
      });
    });
});

describe("ColumnUtilService", () => {
  test("updating position on sorted data", () => {
    const updatedCards =
      ColumnUtilService.updateCardsPositionsToMatchIndexes(mockedCards);

    expect(updatedCards).toEqual(mockedCards);
  });

  test("updating position on revered cards", () => {
    const updatedCards = ColumnUtilService.updateCardsPositionsToMatchIndexes(
      [...mockedCards].reverse()
    );
    let updatedCardsLength = updatedCards.length - 1;

    updatedCards.forEach((card, index) => {
      expect(card.id).toEqual(mockedCards[updatedCardsLength].id);
      expect(card.position).toEqual(index);
      updatedCardsLength--;
    });
  });
});
