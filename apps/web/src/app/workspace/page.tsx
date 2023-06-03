import { Workspace as WorkspaceModel } from "../../../../../packages/types/workspace";
import { WorkspaceTable } from "@/app/workspace/(components)/workspace-table";
import prisma from "@/utils/prisma";

const getWorkspaces = async (): Promise<Array<WorkspaceModel>> => {
  const workspaces = await prisma.workspace.findMany({
    include: {
      column: true,
    },
  });

  return workspaces.map((data) => {
    return {
      id: data.id.toString(),
      name: data.name,
      columns: [],
      updatedAt: "",
      createdAt: "",
    } as WorkspaceModel;
  });
};

export default async function Workspace() {
  const workspaces = await getWorkspaces();

  return (
    <div>
      <WorkspaceTable workspaces={workspaces} />
    </div>
  );
}
