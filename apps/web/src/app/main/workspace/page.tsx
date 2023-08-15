import {
  createWorkspace,
  Workspace,
} from "../../../../../../packages/types/workspace";
import prisma from "@/utils/prisma";
import { WorkspaceTableWrapper } from "@/app/main/workspace/(components)/workspace-table-wrapper";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const getWorkspaces = async (): Promise<Array<Workspace>> => {
  const workspaces = await prisma.workspace.findMany({});

  return workspaces.map((rawWorkspace) => {
    return createWorkspace({
      id: rawWorkspace.id,
      name: rawWorkspace.name,
      column: [],
      updatedAt: rawWorkspace.updatedAt.toString(),
      createdAt: rawWorkspace.createdAt.toString(),
      status: "CREATING_CARDS",
    });
  });
};

export default async function Workspace() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/sign-in");
  }

  const workspaces = await getWorkspaces();

  return <WorkspaceTableWrapper workspaces={workspaces} />;
}
