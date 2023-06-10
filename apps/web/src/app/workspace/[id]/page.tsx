import { WsProvider } from "@/providers/ws";
import { ColumnGridComponent } from "@/components/column/column-grid";
import { StatusNavbarComponent } from "@/components/status/status-navbar";
import { ServerCalls } from "@/server-calls";
import { GetWorkspace } from "@/server-calls/workspace/get";

export default async function WorkspaceDetail({
  params,
}: {
  params: { id: string };
}) {
  const { workspace, columnMap }: GetWorkspace =
    (await ServerCalls.getWorkspaceColumnHash(params.id)) as GetWorkspace;

  return (
    <>
      <WsProvider>
        <ColumnGridComponent columnHash={columnMap} />
        <StatusNavbarComponent
          position="LEFT"
          titles={["Time 5:00", `Current phase ${workspace.status}`]}
        />

        <StatusNavbarComponent
          position="RIGHT"
          titles={["Next phase GROUPING"]}
        />
      </WsProvider>
    </>
  );
}
