"use client";
import { FC, useContext } from "react";
import { Column } from "./column";
import { WsObserverContext } from "@/providers/ws";
import { observer } from "@legendapp/state/react";
import { useSelector } from "react-redux";
import { columnsSelector } from "@/store/selectors/card.selector";
import { ColumnName } from "../../../../packages/types/card";

export const ColumnGrid: FC = observer(() => {
  const wsObserver = useContext(WsObserverContext);

  const columns = useSelector(columnsSelector);

  const onColumnSubmit = (
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

  return (
    <div className="max-w-[85rem] px-4 py-2 sm:px-6 lg:px-8 lg:py-6 mx-auto">
      <div className="mt-12 h-[70vh] grid lg:grid-cols-3 gap-6 lg:items-center">
        <Column
          onColumnSubmit={onColumnSubmit}
          title="Start"
          cards={columns["Start"] ?? []}></Column>
        <Column
          onColumnSubmit={onColumnSubmit}
          title="Adopt"
          cards={columns["Adopt"] ?? []}></Column>
        <Column
          onColumnSubmit={onColumnSubmit}
          title="Dont know"
          cards={columns["Dont know"] ?? []}></Column>
      </div>
    </div>
  );
});
