import prisma from "@/utils/prisma";
import { redisConnector } from "@/redis-connector";
import {
  createWorkspace,
  Workspace,
} from "../../../../../packages/types/workspace";
import { ColumnMap } from "@/components/column/column-grid/column-grid";
import { Card, createCard } from "../../../../../packages/types/card";
import { createColumn } from "../../../../../packages/types/column";

function getWorkspaceRedisKey(workspaceId: string): string {
  return `workspace:${workspaceId}`;
}

async function retrieveWorkspace(
  workspaceId: string
): Promise<Workspace | null> {
  // const redisWorkspace: any = await redisConnector.hgetall(
  //   getWorkspaceRedisKey(workspaceId)
  // );
  //
  // if (redisWorkspace) {
  //   return createWorkspace(redisWorkspace);
  // }

  const workspace: any = await prisma.workspace.findFirst({
    where: {
      id: parseInt(workspaceId),
    },
    include: {
      column: {
        include: {
          card: true,
        },
      },
    },
  });

  redisConnector.hset(getWorkspaceRedisKey(workspaceId), workspace || {});

  return createWorkspace(workspace);
}

export type GetWorkspace = {
  columnMap: ColumnMap;
  workspace: Workspace;
};

export async function getWorkspaceWithColumMap(workspaceId: string) {
  const workspace: Workspace | null = await retrieveWorkspace(workspaceId);

  if (!workspace) {
    return new Promise((resolve) => resolve(null));
  }

  const columnMap = workspace.column.reduce((acc, column) => {
    const createdColumn = createColumn({
      ...column,
      card: sortCards(column.card),
    });

    return {
      ...acc,
      [column.id]: createdColumn,
    };
  }, {});

  return {
    columnMap,
    workspace,
  };
}

function sortCards(cards: Array<Card>) {
  const isNotPositioned = cards.some((card) => card.position === -1);

  return isNotPositioned
    ? cards
        .sort((a, b) => a.position - b.position)
        .map((card: Card, index: number) => {
          return card.position === -1
            ? createCard({ ...card, position: index })
            : card;
        })
    : cards;
}
