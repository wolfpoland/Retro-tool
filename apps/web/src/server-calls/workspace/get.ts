import prisma from "@/utils/prisma";
import { redisConnector } from "@/redis-connector";
import { Workspace } from "../../../../../packages/types/workspace";

function getWorkspaceRedisKey(workspaceId: string): string {
  return `workspace:${workspaceId}`;
}

async function retrieveWorkspace(workspaceId: string) {
  const redisWorkspace: string | null = await redisConnector.hget(
    "workspace",
    workspaceId
  );
  console.log("redisWorkspace", redisWorkspace);

  if (redisWorkspace) {
    return JSON.parse(redisWorkspace);
  }

  const workspace = await prisma.workspace.findFirst({
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

  return workspace;
}

export async function getWorkspaceColumnHash(workspaceId: string) {
  const workspace: Workspace | null = await retrieveWorkspace(workspaceId);

  if (!workspace) {
    return {};
  }

  return workspace.column.reduce((acc, column) => {
    return {
      ...acc,
      [column.id]: column,
    };
  }, {});
}
