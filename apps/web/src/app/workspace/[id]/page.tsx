import prisma from "@/utils/prisma";
import { WsProvider } from "@/providers/ws";
import { ColumnGridComponent } from "@/components/column/column-grid";
import { StatusNavbarComponent } from "@/components/status/status-navbar";

async function getWorkspaceColumnHash(workspaceId: string) {
  const workspace = await prisma.workspace.findFirst({
    where: {
      id: parseInt(workspaceId),
    },
    include: {
      column: {
        include: {
          card: true,
        },
      },
    },
  });

  if (!workspace) {
    return {};
  }

  return workspace.column.reduce((acc, column) => {
    return {
      ...acc,
      [column.id]: column,
    };
  }, {});
}

export default async function WorkspaceDetail({
  params,
}: {
  params: { id: string };
}) {
  const workspace = await getWorkspaceColumnHash(params.id);

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
