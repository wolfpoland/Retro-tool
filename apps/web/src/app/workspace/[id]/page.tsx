import { WsProvider } from "@/providers/ws";
import { ColumnGridComponent } from "@/components/column/column-grid";
import { StatusNavbarComponent } from "@/components/status/status-navbar";
import { ServerCalls } from "@/server-calls";
import { GetWorkspace } from "@/server-calls/workspace/get";
import { ClientCalls } from "@/client-calls";
import { Card } from "../../../../../../packages/types/card";

export default async function WorkspaceDetail({
  params,
}: {
  params: { id: string };
}) {
  const { workspace, columnMap }: GetWorkspace =
    (await ServerCalls.getWorkspaceColumnHash(params.id)) as GetWorkspace;

  const onCardAdd = async (
    text: string,
    columnName: string,
    columnId: number
  ) => {
    // change to server call
    return await ClientCalls.addCard(text, columnId);
  };

  const onCardRemove = (id: number) => {
    ClientCalls.deleteCard(id);
  };

  const onCardUpdate = (card: Card) => {
    ClientCalls.updateCard(card);
  };

  return (
    <>
      <WsProvider>
        <ColumnGridComponent
          onCardAdd={onCardAdd}
          onCardRemove={onCardRemove}
          onCardUpdate={onCardUpdate}
          columnHash={columnMap}
        />
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
