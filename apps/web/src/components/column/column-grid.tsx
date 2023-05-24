"use client";
import { FC, useContext } from "react";
import { ColumnComponent } from "./column";
import { WsObserverContext } from "@/providers/ws";
import { useSelector } from "react-redux";
import { columnsSelector } from "@/store/selectors/card.selector";
import { ColumnName } from "../../../../../packages/types/card";

export const ColumnGridComponent: FC = () => {
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
    <div className="mx-auto max-w-[85rem] px-4 py-2 sm:px-6 lg:px-8 lg:py-6">
      <div className="mt-12 grid h-[70vh] gap-6 lg:grid-cols-3 lg:items-center">
        <ColumnComponent
          onColumnSubmit={onColumnSubmit}
          title="Start"
          cards={columns["Start"] ?? []}></ColumnComponent>
        <ColumnComponent
          onColumnSubmit={onColumnSubmit}
          title="Adopt"
          cards={columns["Adopt"] ?? []}></ColumnComponent>
        <ColumnComponent
          onColumnSubmit={onColumnSubmit}
          title="Dont know"
          cards={columns["Dont know"] ?? []}></ColumnComponent>
      </div>
    </div>
  );
};
