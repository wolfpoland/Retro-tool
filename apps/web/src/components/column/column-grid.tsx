"use client";
import { FC, useContext, useEffect } from "react";
import { ColumnComponent } from "./column";
import { WsObserverContext } from "@/providers/ws";
import { useSelector } from "react-redux";
import { columnsSelector } from "@/store/selectors/card.selector";
import { Card, ColumnName } from "../../../../../packages/types/card";
import { store } from "@/store/store";
import { setCardsAction } from "@/store/actions/card.action";

export type ColumnGridComponentProps = {
  cards: Array<Card>;
};

export const ColumnGridComponent: FC<ColumnGridComponentProps> = ({
  cards,
}) => {
  const wsObserver = useContext(WsObserverContext);
  const columns = useSelector(columnsSelector);

  useEffect(() => {
    store.dispatch(setCardsAction(cards));
  }, [cards]);

  const onCardAdd = (
    text: string,
    columnName: ColumnName,
    columnId: string
  ) => {
    // these should be only cargo
    wsObserver?.emitMessage({
      id: crypto.randomUUID(),
      userId: "To implement",
      type: "NEW_CARD",
      cargo: {
        id: crypto.randomUUID(),
        text,
        columnName,
        columnId,
      },
    });
  };

  const handleCardRemove = (card: Card) => {
    wsObserver?.emitMessage({
      id: crypto.randomUUID(),
      userId: "To implement",
      type: "CARD_REMOVE",
      cargo: {
        ...card,
      },
    });
  };

  return (
    <div className="mx-auto max-w-[85rem] px-4 py-2 sm:px-6 lg:px-8 lg:py-6">
      <div className="mt-12 grid h-[70vh] gap-6 lg:grid-cols-3 lg:items-center">
        <ColumnComponent
          onCardAdd={onCardAdd}
          onCardRemove={handleCardRemove}
          title="Start"
          cards={columns["Start"] ?? []}></ColumnComponent>
        <ColumnComponent
          onCardAdd={onCardAdd}
          onCardRemove={handleCardRemove}
          title="Adopt"
          cards={columns["Adopt"] ?? []}></ColumnComponent>
        <ColumnComponent
          onCardAdd={onCardAdd}
          onCardRemove={handleCardRemove}
          title="Dont know"
          cards={columns["Dont know"] ?? []}></ColumnComponent>
      </div>
    </div>
  );
};
