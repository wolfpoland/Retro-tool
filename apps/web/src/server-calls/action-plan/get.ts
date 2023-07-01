import prisma from "@/utils/prisma";
import { redisConnector } from "@/redis-connector";
// TODO
function getActionPlanRedisKey(id: string): string {
  return `action-plan:${id}`;
}

async function getActionPlans(id: string) {
  const redisActionPlan: string | null = await redisConnector.hget(
    "action-plan",
    id
  );

  if (redisActionPlan) {
    return JSON.parse(redisActionPlan);
  }

  const workspace = await prisma.workspace.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      column: {
        include: {
          card: true,
        },
      },
    },
  });

  redisConnector.hset(getActionPlanRedisKey(id), workspace || {});

  return workspace;
}
