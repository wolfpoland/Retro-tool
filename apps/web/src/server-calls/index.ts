import { getWorkspaceWithColumMap } from "@/server-calls/workspace/get";
import { getActionPlans } from "@/server-calls/action-plan/getAll";

export const ServerCalls = {
  getWorkspaceColumnHash: getWorkspaceWithColumMap,
  getAllActionPlans: getActionPlans,
};
