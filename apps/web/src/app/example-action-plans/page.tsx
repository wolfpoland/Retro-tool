import { ActionPlansTable } from "@/app/example-action-plans/(components)/action-plans-table";
import { ServerCalls } from "@/server-calls";

const getActionPlans = async () => {};

export default async function ExampleActionPlans() {
  const actionPlans = await ServerCalls.getAllActionPlans();

  return <ActionPlansTable actionPlans={actionPlans} />;
}
