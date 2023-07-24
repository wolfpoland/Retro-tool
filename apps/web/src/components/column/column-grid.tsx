"use client";
import { FC, useContext, useEffect } from "react";
import { ColumnComponent } from "./column";
import { WsObserverContext } from "@/providers/ws";
import { useSelector } from "react-redux";
import { columnsSelector } from "@/store/selectors/column.selector";
import { Card, createCard } from "../../../../../packages/types/card";
import { store } from "@/store/store";
import { setColumns } from "@/store/actions/column.action";
import { cn } from "@/utils/util";
import { Column } from "../../../../../packages/types/column";
import { ClientCalls } from "../../client-calls";

export type ColumnMap = {
  [key: string]: Column;
};

export type ColumnGridComponentProps = {
  columnHash: ColumnMap;
  onCardAdd: (
    text: string,
    columnName: string,
    columnId: number
  ) => Promise<number>;
  onCardRemove: (id: number) => void;
  onCardUpdate: (card: Card) => void;
};

export const ColumnGridComponent: FC<ColumnGridComponentProps> = ({
  columnHash,
  onCardAdd,
  onCardRemove,
  onCardUpdate,
}) => {
  const wsObserver = useContext(WsObserverContext);
  const columns = useSelector(columnsSelector);

  useEffect(() => {
    store.dispatch(setColumns(columnHash));
  }, [columnHash]);

  const handleCardAdd = async (
    text: string,
    columnName: string,
    columnId: number
  ) => {
    const id = await onCardAdd(text, columnName, columnId);

    const card = createCard({
      id,
      text,
      columnId: columnId,
    });

    wsObserver?.emitMessage({
      id: crypto.randomUUID(),
      userId: "To implement",
      type: "NEW_CARD",
      cargo: card,
    });
  };

  const handleCardRemove = (card: Card) => {
    onCardRemove(card.id);

    wsObserver?.emitMessage({
      id: crypto.randomUUID(),
      userId: "To implement",
      type: "CARD_REMOVE",
      cargo: {
        ...card,
      },
    });
  };

  const handleCardEdit = (card: Card) => {
    onCardUpdate(card);

    wsObserver?.emitMessage({
      id: crypto.randomUUID(),
      userId: "To implement",
      type: "CARD_EDIT",
      cargo: {
        ...card,
      },
    });
  };

  const generatedColumns = Object.keys(columns).map((key) => {
    const column = columns[key];

    return (
      <ColumnComponent
        key={key}
        columnId={column.id}
        onCardAdd={handleCardAdd}
        onCardRemove={handleCardRemove}
        onCardEdit={handleCardEdit}
        title={column.name}
        cards={column.card ?? []}
      />
    );
  });

  return (
    <div
      className={cn(
        "mx-auto h-[110vh] max-w-[85rem] px-4 py-2 sm:px-6 lg:px-8 lg:py-6"
      )}>
      <div
        className={cn(
          "mt-12 grid h-[80vh] max-h-[80vh] gap-6 lg:grid-cols-3 lg:items-center"
        )}>
        {generatedColumns}
      </div>
    </div>
  );
};
