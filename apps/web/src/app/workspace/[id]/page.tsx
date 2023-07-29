import { WsProvider } from "@/providers/ws";
import { StatusNavbarComponent } from "@/components/status/status-navbar";
import { ServerCalls } from "@/server-calls";
import { GetWorkspace } from "@/server-calls/workspace/get";
import { WorkspaceDetailColumnGridWrapper } from "@/app/workspace/[id]/(components)/workspace-detail-column-grid-wrapper";

export default async function WorkspaceDetail({
  params,
}: {
  params: { id: string };
}) {
  const { workspace, columnMap }: GetWorkspace =
    (await ServerCalls.getWorkspaceColumnHash(params.id)) as GetWorkspace;

  return (
    <WsProvider>
      <WorkspaceDetailColumnGridWrapper columnMap={columnMap} />
      {/*<StatusNavbarComponent*/}
      {/*  position="LEFT"*/}
      {/*  titles={["Time 5:00", `Current phase ${workspace.status}`]}*/}
      {/*/>*/}

      {/*<StatusNavbarComponent*/}
      {/*  position="RIGHT"*/}
      {/*  titles={["Next phase GROUPING"]}*/}
      {/*/>*/}
    </WsProvider>
  );
}
