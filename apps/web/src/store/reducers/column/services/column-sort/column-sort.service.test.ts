import { expect, test, beforeEach, describe } from "vitest";
import { Card, createCard } from "../../../../../../../../packages/types/card";
import { ColumnSortService } from "./column-sort.service";

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

describe("ColumnSortService", () => {
  test("sorting of sorted cards", () => {
    const sortedMockedCards = ColumnSortService.sort(mockedCards);

    expect(sortedMockedCards).toEqual(mockedCards);
  });

  test("sorting of revered cards", () => {
    mockedCards = mockedCards.reverse();
    const sortedMockedCards = ColumnSortService.sort(mockedCards);

    expect(sortedMockedCards).toEqual(mockedCards);
  });

  test("sorting card in different order", () => {
    const differentOrderCards = [
      mockedCards[9],
      mockedCards[5],
      mockedCards[1],
      mockedCards[3],
      mockedCards[7],
      mockedCards[2],
      mockedCards[4],
      mockedCards[8],
      mockedCards[0],
      mockedCards[6],
    ];

    const sortedDifferentOrderCards =
      ColumnSortService.sort(differentOrderCards);

    expect(sortedDifferentOrderCards).toEqual(mockedCards);
  });
});
