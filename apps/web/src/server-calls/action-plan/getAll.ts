import prisma from "@/utils/prisma";
import {
  ActionPlanStatus,
  createActionPlan,
} from "../../../../../packages/types/action-plan";

// TODO
function getActionPlanRedisKey(id: number): string {
  return `action-plan:${id}`;
}

export async function getActionPlans() {
  // const redisActionPlan: any = await redisConnector.hgetall("action-plan");
  //
  // console.log("redisActionPlan", redisActionPlan);

  // if (redisActionPlan) {
  //   return createActionPlan(redisActionPlan);
  // }

  const actionPlan = await prisma.actionPlan.findMany({});

  // actionPlan.forEach((actionPlan) => {
  //   redisConnector.hset(getActionPlanRedisKey(actionPlan.id), actionPlan);
  // });

  return actionPlan.map((actionPlan) => {
    return createActionPlan({
      id: actionPlan.id,
      createdAt: actionPlan.createdAt.toString(),
      updatedAt: actionPlan.updatedAt.toString(),
      percentage: actionPlan.percentage,
      text: actionPlan.text,
      status: actionPlan.status as ActionPlanStatus,
      assignee: actionPlan.assignee,
    });
  });
}
