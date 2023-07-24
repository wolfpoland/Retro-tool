"use client";
import {
  ActionPlan,
  ActionPlanStatus,
} from "../../../../../../packages/types/action-plan";
import { FC, useEffect, useState } from "react";
import { WsProvider } from "@/providers/ws";
import {
  ColumnGridComponent,
  ColumnMap,
} from "@/components/column/column-grid";
import { createColumn } from "../../../../../../packages/types/column";
import { Card, createCard } from "../../../../../../packages/types/card";

export type ActionPlansColumnGridWrapper = {
  actionPlans: ActionPlan[];
};

export const ActionPlansColumnGridWrapper: FC<ActionPlansColumnGridWrapper> = ({
  actionPlans,
}) => {
  const [columnMap, setColumnMap] = useState<ColumnMap>({});

  const onCardAdd = async (
    text: string,
    columnName: string,
    columnId: number
  ) => {
    return 0;
  };

  const onCardRemove = (id: number) => {};

  const onCardUpdate = (card: Card) => {};

  useEffect(() => {
    const convertedActionPlans = convertActionPlansToColumnMap(actionPlans);
    setColumnMap(convertedActionPlans);
  }, [actionPlans]);

  return (
    <WsProvider>
      <ColumnGridComponent
        onCardAdd={onCardAdd}
        onCardUpdate={onCardUpdate}
        onCardRemove={onCardRemove}
        columnHash={columnMap}
      />
    </WsProvider>
  );
};

const createActionPlansColumnMap = (): ColumnMap => {
  return {
    [ActionPlanStatus.TODO]: createColumn({
      id: 0,
      name: "To Do",
      card: [],
    }),
    [ActionPlanStatus.IN_PROGRESS]: createColumn({
      id: 1,
      name: "In Progress",
      card: [],
    }),
    [ActionPlanStatus.DONE]: createColumn({
      id: 2,
      name: "Done",
      card: [],
    }),
  };
};

const convertActionPlansToColumnMap = (
  actionPlans: ActionPlan[]
): ColumnMap => {
  const columnMap: ColumnMap = createActionPlansColumnMap();

  actionPlans.map((actionPlan) => {
    if (actionPlan.status === "TODO") {
      const todoColumn = columnMap[ActionPlanStatus.TODO];
      const inProgressColumn = columnMap[ActionPlanStatus.IN_PROGRESS];
      const doneColumn = columnMap[ActionPlanStatus.DONE];

      todoColumn.card = [
        ...todoColumn.card,
        createCard({
          id: actionPlan.id,
          text: actionPlan.text,
          columnId: todoColumn.id,
        }),
      ];

      inProgressColumn.card = [
        ...inProgressColumn.card,
        createCard({
          id: actionPlan.id,
          text: actionPlan.text,
          columnId: inProgressColumn.id,
        }),
      ];

      doneColumn.card = [
        ...doneColumn.card,
        createCard({
          id: actionPlan.id,
          text: actionPlan.text,
          columnId: doneColumn.id,
        }),
      ];
    }
  });

  return columnMap;
};
