import { ServerCalls } from "@/server-calls";
import { ActionPlansTableWrapper } from "@/app/main/example-action-plans/(components)/action-plans-wrapper";

export default async function ExampleActionPlans() {
  const actionPlans = await ServerCalls.getAllActionPlans();

  return <ActionPlansTableWrapper actionPlans={actionPlans} />;
}
