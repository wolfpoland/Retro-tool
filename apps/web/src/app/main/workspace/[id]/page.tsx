import { WsProvider } from "@/providers/ws";
import { ServerCalls } from "@/server-calls";
import { GetWorkspace } from "@/server-calls/workspace/get";
import { WorkspaceDetailColumnGridWrapper } from "@/app/main/workspace/[id]/(components)/workspace-detail-column-grid-wrapper";

export default async function WorkspaceDetail({
  params,
}: {
  params: { id: string };
}) {
  const { workspace, columnMap }: GetWorkspace =
    (await ServerCalls.getWorkspaceColumnHash(params.id)) as GetWorkspace;

  return (
    <WsProvider channelId={workspace.id}>
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
