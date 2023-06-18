import {
  createWorkspace,
  Workspace,
} from "../../../../../packages/types/workspace";
import prisma from "@/utils/prisma";
import { WorkspaceTableWrapper } from "@/app/workspace/(components)/workspace-table-wrapper";

const getWorkspaces = async (): Promise<Array<Workspace>> => {
  const workspaces = await prisma.workspace.findMany({});

  return workspaces.map((data) => {
    return createWorkspace({
      id: data.id,
      name: data.name,
      column: [],
      updatedAt: "",
      createdAt: "",
      status: "CREATING_CARDS",
    });
  });
};

export default async function Workspace() {
  const workspaces = await getWorkspaces();

  return <WorkspaceTableWrapper workspaces={workspaces} />;
}
