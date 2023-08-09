"use client";
import {
  ColumnGridComponent,
  ColumnMap,
} from "@/components/column/column-grid/column-grid";
import { ClientCalls } from "@/client-calls";
import { Card } from "../../../../../../../packages/types/card";
import { FC } from "react";

export type WorkspaceDetailColumnGridWrapperProps = {
  columnMap: ColumnMap;
};

export const WorkspaceDetailColumnGridWrapper: FC<
  WorkspaceDetailColumnGridWrapperProps
> = ({ columnMap }) => {
  const onCardAdd = async (
    text: string,
    columnName: string,
    columnId: number
  ) => {
    return await ClientCalls.addCard(text, columnId);
  };

  const onCardRemove = (id: number) => {
    ClientCalls.deleteCard(id);
  };

  const onCardUpdate = (card: Card) => {
    ClientCalls.updateCard(card);
  };

  return (
    <ColumnGridComponent
      onCardAdd={onCardAdd}
      onCardRemove={onCardRemove}
      onCardUpdate={onCardUpdate}
      columnHash={columnMap}
    />
  );
};
