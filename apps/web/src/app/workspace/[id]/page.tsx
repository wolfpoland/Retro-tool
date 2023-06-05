import { WsProvider } from "@/providers/ws";
import { ColumnGridComponent } from "@/components/column/column-grid";
import { StatusNavbarComponent } from "@/components/status/status-navbar";
import { ServerCalls } from "@/server-calls";

export default async function WorkspaceDetail({
  params,
}: {
  params: { id: string };
}) {
  const workspace = await ServerCalls.getWorkspaceColumnHash(params.id);

  return (
    <>
      <WsProvider>
        <ColumnGridComponent columnHash={workspace} />
        <StatusNavbarComponent position="LEFT" titles={[]} />

        <StatusNavbarComponent position="RIGHT" titles={[]} />
      </WsProvider>
    </>
  );
}
