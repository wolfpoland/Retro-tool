"use client";
import {
  ActionPlan,
  ActionPlanRaw,
  ActionPlanStatus,
  createActionPlan,
} from "../../../../../../../packages/types/action-plan";
import { FC, useEffect, useState } from "react";
import { WsProvider } from "@/providers/ws";
import {
  ColumnGridComponent,
  ColumnMap,
} from "@/components/column/column-grid/column-grid";
import { createColumn } from "../../../../../../../packages/types/column";
import { Card, createCard } from "../../../../../../../packages/types/card";
import { ClientCalls } from "@/client-calls";

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
  ): Promise<number | undefined> => {
    const actionPlan = await ClientCalls.addActionPlan(
      createActionPlan({
        text,
        status: columnId,
      })
    );

    return actionPlan.id;
  };

  const onCardRemove = (id: number) => {
    ClientCalls.deleteActionPlan(id);
  };

  const onCardUpdate = (card: Card) => {
    const actionPlan = actionPlans.find(
      (actionPlan) => actionPlan.id === card.id
    );

    ClientCalls.editActionPlan({
      ...actionPlan,
      id: card.id,
      text: card.text,
      status: card.columnId,
    });
  };

  useEffect(() => {
    const convertedActionPlans = convertActionPlansToColumnMap(actionPlans);

    setColumnMap(convertedActionPlans);
  }, [actionPlans]);

  return (
    <WsProvider channelId={0}>
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
    const todoColumn = columnMap[ActionPlanStatus.TODO];
    const inProgressColumn = columnMap[ActionPlanStatus.IN_PROGRESS];
    const doneColumn = columnMap[ActionPlanStatus.DONE];

    if (actionPlan.status === ActionPlanStatus.TODO) {
      todoColumn.card = [
        ...todoColumn.card,
        createCard({
          id: actionPlan.id,
          text: actionPlan.text,
          columnId: todoColumn.id,
          position: -1,
        }),
      ];
    }

    if (actionPlan.status === ActionPlanStatus.IN_PROGRESS) {
      inProgressColumn.card = [
        ...inProgressColumn.card,
        createCard({
          id: actionPlan.id,
          text: actionPlan.text,
          columnId: inProgressColumn.id,
          position: -1,
        }),
      ];
    }

    if (actionPlan.status === ActionPlanStatus.DONE) {
      doneColumn.card = [
        ...doneColumn.card,
        createCard({
          id: actionPlan.id,
          text: actionPlan.text,
          columnId: doneColumn.id,
          position: -1,
        }),
      ];
    }
  });

  return columnMap;
};
